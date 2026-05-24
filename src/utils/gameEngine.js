import {
  APPRENTICE_MAX_SECONDS,
  APPRENTICE_MIN_SECONDS,
  APPRENTICE_REQUIRED_MISSIONS,
  AUTO_INCOMING_MS,
  defaultInfluences,
  INCOMING_MAX_SECONDS,
  INCOMING_MIN_SECONDS,
  missionFields,
  REGULAR_MAX_SECONDS,
  REGULAR_MIN_SECONDS,
  TRAINEE_PASS_SKILL
} from '../data/gameDefaults'

import {
  apprenticeMissions,
  incomingFieldMissions,
  incomingMissions,
  specializationMissionPools
} from '../data/missions'

import {
  getSpecializationName,
  jobSpecializations
} from '../data/jobs'

import { auth, db } from '../firebase'

import {
  ref as dbRef,
  get,
  set,
  onValue
} from 'firebase/database'

const FIREBASE_GAME_PATH = 'teranove/game'
const TRAINEE_PASS_RATE = 1

function getCurrentUid() {
  return auth.currentUser?.uid || null
}

function getGameRef() {
  const uid = getCurrentUid()

  if (!uid) {
    throw new Error('로그인이 필요합니다.')
  }

  return dbRef(db, `users/${uid}/${FIREBASE_GAME_PATH}`)
}

function createId(prefix = 'id') {
  const randomText = Math.random()
    .toString(36)
    .slice(2, 11)

  return `${prefix}_${Date.now()}_${randomText}`
}

export async function loadGame() {
  if (!getCurrentUid()) return null

  const snapshot = await get(getGameRef())

  if (!snapshot.exists()) return null

  const game = snapshot.val()

  normalizeGame(game)

  return game
}

export async function saveGame(game) {
  if (!game) return
  if (!getCurrentUid()) return

  game.updatedAt = Date.now()

  await set(getGameRef(), game)
}

export function watchGame(callback) {
  if (!getCurrentUid()) {
    callback(null)
    return () => {}
  }

  return onValue(getGameRef(), (snapshot) => {
    if (!snapshot.exists()) {
      callback(null)
      return
    }

    const game = snapshot.val()

    normalizeGame(game)

    callback(game)
  })
}

export async function createNewGame(playerName, cityName) {
  const now = Date.now()

  const game = {
    player: {
      name: playerName || '플레이어'
    },

    city: {
      name: cityName || '테라노브 시티',
      stage: 'small',
      missionCompleted: 0,
      npcLimit: 5,
      influences: { ...defaultInfluences }
    },

    incomingNpcs: [],
    candidates: [],
    apprentices: [],
    regularReady: [],
    regularNpcs: [],

    leaderNpc: null,
    spouseNpc: null,
    children: [],

    recruitment: {
      stopped: false,
      nextIncomingAt: now + AUTO_INCOMING_MS
    },

    createdAt: now,
    updatedAt: now
  }

  game.incomingNpcs = createInitialIncomingNpcs(game, 5)

  await saveGame(game)

  return game
}

export async function updateGameTick(game) {
  if (!game) return

  normalizeGame(game)

  processIncomingTimer(game)
  updateIncomingNpcs(game)
  updateApprentices(game)
  updateRegularNpcs(game)
  updateRecruitmentStopped(game)

  await saveGame(game)
}

function normalizeGame(game) {
  if (!game.player) {
    game.player = {
      name: '플레이어'
    }
  }

  if (!game.city) {
    game.city = {
      name: '테라노브 시티',
      stage: 'small',
      missionCompleted: 0,
      npcLimit: 5,
      influences: { ...defaultInfluences }
    }
  }

  if (!game.city.influences) {
    game.city.influences = { ...defaultInfluences }
  }

  missionFields.forEach((field) => {
    if (!Object.prototype.hasOwnProperty.call(game.city.influences, field)) {
      game.city.influences[field] = 0
    }
  })

  if (!game.recruitment) {
    game.recruitment = {
      stopped: false,
      nextIncomingAt: Date.now() + AUTO_INCOMING_MS
    }
  }

  if (!Object.prototype.hasOwnProperty.call(game.recruitment, 'stopped')) {
    game.recruitment.stopped = false
  }

  if (!game.recruitment.nextIncomingAt) {
    game.recruitment.nextIncomingAt = Date.now() + AUTO_INCOMING_MS
  }

  if (!Array.isArray(game.incomingNpcs)) game.incomingNpcs = []
  if (!Array.isArray(game.candidates)) game.candidates = []
  if (!Array.isArray(game.apprentices)) game.apprentices = []
  if (!Array.isArray(game.regularReady)) game.regularReady = []
  if (!Array.isArray(game.regularNpcs)) game.regularNpcs = []
  if (!Array.isArray(game.children)) game.children = []

  if (!Object.prototype.hasOwnProperty.call(game, 'leaderNpc')) {
    game.leaderNpc = null
  }

  if (!Object.prototype.hasOwnProperty.call(game, 'spouseNpc')) {
    game.spouseNpc = null
  }

  game.incomingNpcs.forEach(normalizeNpc)
  game.candidates.forEach(normalizeNpc)
  game.apprentices.forEach(normalizeNpc)
  game.regularReady.forEach(normalizeNpc)
  game.regularNpcs.forEach(normalizeNpc)

  if (game.leaderNpc) normalizeNpc(game.leaderNpc)
  if (game.spouseNpc) normalizeNpc(game.spouseNpc)

  updateRecruitmentStopped(game)

  if (!game.createdAt) game.createdAt = Date.now()
  if (!game.updatedAt) game.updatedAt = Date.now()
}

function normalizeNpc(npc) {
  if (!npc.id) npc.id = createId('npc')
  if (!npc.skills) npc.skills = createEmptySkills()
  if (!npc.specialSkills) npc.specialSkills = {}

  if (Object.prototype.hasOwnProperty.call(npc, 'gender')) {
    delete npc.gender
  }

  missionFields.forEach((field) => {
    if (!Object.prototype.hasOwnProperty.call(npc.skills, field)) {
      npc.skills[field] = 0
    }
  })

  if (!npc.status) npc.status = '대기중'

  if (!Object.prototype.hasOwnProperty.call(npc, 'mission')) {
    npc.mission = null
  }

  if (!Object.prototype.hasOwnProperty.call(npc, 'missionRemaining')) {
    npc.missionRemaining = 0
  }
}

/*
|--------------------------------------------------------------------------
| 직업 슬롯 / 유입 제한
|--------------------------------------------------------------------------
*/

export function getOccupiedSpecializationIds(game) {
  const ids = new Set()

  const groups = [
    game.apprentices || [],
    game.regularReady || [],
    game.regularNpcs || []
  ]

  groups.forEach((group) => {
    group.forEach((npc) => {
      if (npc.specializationId) {
        ids.add(npc.specializationId)
      }
    })
  })

  return ids
}

export function getOpenSpecializationsByField(game, field) {
  const occupied = getOccupiedSpecializationIds(game)
  const jobs = jobSpecializations[field] || []

  return jobs.filter((job) => {
    return !occupied.has(job.id)
  })
}

export function isFieldOpen(game, field) {
  return getOpenSpecializationsByField(game, field).length > 0
}

export function getOpenFields(game) {
  return missionFields.filter((field) => {
    return isFieldOpen(game, field)
  })
}

export function hasAnyOpenSpecialization(game) {
  return getOpenFields(game).length > 0
}

function updateRecruitmentStopped(game) {
  game.recruitment.stopped = !hasAnyOpenSpecialization(game)

  if (game.recruitment.stopped) {
    game.recruitment.nextIncomingAt = null
  } else if (!game.recruitment.nextIncomingAt) {
    game.recruitment.nextIncomingAt = Date.now() + AUTO_INCOMING_MS
  }
}

function getOpenIncomingFieldMissions(game) {
  const openFields = getOpenFields(game)

  return incomingFieldMissions.filter((mission) => {
    return openFields.includes(mission.field)
  })
}

function getRandomOpenFieldMission(game) {
  const missions = getOpenIncomingFieldMissions(game)

  return getRandomItem(missions)
}

/*
|--------------------------------------------------------------------------
| 유입 처리
|--------------------------------------------------------------------------
*/

function processIncomingTimer(game) {
  const current = Date.now()

  updateRecruitmentStopped(game)

  if (game.recruitment.stopped) return

  if (!game.recruitment.nextIncomingAt) {
    game.recruitment.nextIncomingAt = current + AUTO_INCOMING_MS
    return
  }

  while (
    current >= game.recruitment.nextIncomingAt &&
    hasAnyOpenSpecialization(game)
  ) {
    game.incomingNpcs.push(createIncomingNpc(game))
    game.recruitment.nextIncomingAt += AUTO_INCOMING_MS
  }

  updateRecruitmentStopped(game)
}

function createInitialIncomingNpcs(game, count) {
  const npcs = []

  for (let i = 0; i < count; i += 1) {
    if (!hasAnyOpenSpecialization(game)) break

    npcs.push(createIncomingNpc(game))
  }

  return npcs
}

function createIncomingNpc(game) {
  const guideMission = getRandomItem(incomingMissions)
  const fieldMission = getRandomOpenFieldMission(game)

  if (!guideMission || !fieldMission) {
    return {
      id: createId('npc'),
      phase: 'incoming',
      name: '',
      status: '유입 대기 종료',
      mission: null,
      missionRemaining: 0,
      skills: createEmptySkills(),
      specialSkills: {}
    }
  }

  return {
    id: createId('npc'),
    phase: 'incoming',
    name: '',
    status: '유입 적응중',
    mission: {
      id: guideMission.id,
      name: guideMission.name,
      field: fieldMission.field
    },
    missionRemaining: randomBetween(
      INCOMING_MIN_SECONDS,
      INCOMING_MAX_SECONDS
    ),
    skills: createInitialIncomingSkills(game, fieldMission.field),
    specialSkills: {}
  }
}

function updateIncomingNpcs(game) {
  const finished = []

  game.incomingNpcs.forEach((npc) => {
    if (!npc.mission) {
      finished.push(npc)
      return
    }

    npc.missionRemaining -= 1

    if (npc.missionRemaining <= 0) {
      finished.push(npc)
    }
  })

  finished.forEach((npc) => {
    completeIncomingMission(game, npc)
  })
}

function completeIncomingMission(game, npc) {
  const field = npc.mission?.field

  if (!field) {
    removeIncomingNpc(game, npc)
    return
  }

  if (!isFieldOpen(game, field)) {
    reassignOrRemoveIncomingNpc(game, npc)
    return
  }

  npc.skills[field] += 1

  if (npc.skills[field] >= TRAINEE_PASS_SKILL) {
    judgeIncomingNpc(game, npc, field)
    return
  }

  assignNextIncomingMission(game, npc)
}

function assignNextIncomingMission(game, npc) {
  const nextMission = getRandomOpenFieldMission(game)

  if (!nextMission) {
    removeIncomingNpc(game, npc)
    updateRecruitmentStopped(game)
    return
  }

  npc.mission = {
    id: nextMission.id,
    name: nextMission.name,
    field: nextMission.field
  }

  npc.missionRemaining = randomBetween(
    INCOMING_MIN_SECONDS,
    INCOMING_MAX_SECONDS
  )
}

function reassignOrRemoveIncomingNpc(game, npc) {
  const nextMission = getRandomOpenFieldMission(game)

  if (!nextMission) {
    removeIncomingNpc(game, npc)
    updateRecruitmentStopped(game)
    return
  }

  npc.status = '유입 적응중'
  npc.mission = {
    id: nextMission.id,
    name: nextMission.name,
    field: nextMission.field
  }

  npc.missionRemaining = randomBetween(
    INCOMING_MIN_SECONDS,
    INCOMING_MAX_SECONDS
  )
}

function removeIncomingNpc(game, npc) {
  game.incomingNpcs = game.incomingNpcs.filter((item) => {
    return item.id !== npc.id
  })
}

function judgeIncomingNpc(game, npc, field) {
  removeIncomingNpc(game, npc)

  if (!isFieldOpen(game, field)) return

  const passed = Math.random() < TRAINEE_PASS_RATE

  if (!passed) return

  npc.phase = 'candidate'
  npc.status = '신규직원 후보'
  npc.name = ''
  npc.mission = null
  npc.missionRemaining = 0
  npc.assignedField = field

  game.candidates.push(npc)
}

/*
|--------------------------------------------------------------------------
| 후보 / 견습 / 정규
|--------------------------------------------------------------------------
*/

export async function assignCandidateToApprentice(
  game,
  npc,
  field,
  specializationId
) {
  if (!field || !specializationId) return

  const openJobs = getOpenSpecializationsByField(game, field)
  const canUseSpecialization = openJobs.some((job) => {
    return job.id === specializationId
  })

  if (!canUseSpecialization) return

  const specializationName = getSpecializationName(field, specializationId)

  game.candidates = game.candidates.filter((item) => {
    return item.id !== npc.id
  })

  npc.phase = 'apprentice'
  npc.status = '견습 진행중'
  npc.assignedField = field
  npc.specializationId = specializationId
  npc.specializationName = specializationName
  npc.name = specializationName
  npc.apprenticeCompleted = 0
  npc.specialSkills = {}

  assignApprenticeMission(npc)

  game.apprentices.push(npc)

  updateRecruitmentStopped(game)

  await saveGame(game)
}

function assignApprenticeMission(npc) {
  const missions = apprenticeMissions.filter((mission) => {
    return mission.field === npc.assignedField
  })

  const mission = getRandomItem(missions)

  if (!mission) {
    npc.mission = {
      id: `app_${npc.assignedField}_fallback`,
      name: `${npc.specializationName} 견습 업무`,
      field: npc.assignedField
    }
  } else {
    npc.mission = {
      id: mission.id,
      name: mission.name,
      field: mission.field
    }
  }

  npc.missionRemaining = randomBetween(
    APPRENTICE_MIN_SECONDS,
    APPRENTICE_MAX_SECONDS
  )
}

function updateApprentices(game) {
  const finished = []

  game.apprentices.forEach((npc) => {
    npc.missionRemaining -= 1

    if (npc.missionRemaining <= 0) {
      finished.push(npc)
    }
  })

  finished.forEach((npc) => {
    completeApprenticeMission(game, npc)
  })
}

function completeApprenticeMission(game, npc) {
  const key = npc.specializationId

  if (!npc.specialSkills[key]) {
    npc.specialSkills[key] = 0
  }

  npc.specialSkills[key] += 1
  npc.apprenticeCompleted += 1

  if (npc.apprenticeCompleted >= APPRENTICE_REQUIRED_MISSIONS) {
    moveToRegularReady(game, npc)
    return
  }

  assignApprenticeMission(npc)
}

function moveToRegularReady(game, npc) {
  game.apprentices = game.apprentices.filter((item) => {
    return item.id !== npc.id
  })

  npc.phase = 'regularReady'
  npc.status = '정규 채용 대기'
  npc.mission = null
  npc.missionRemaining = 0

  game.regularReady.push(npc)
}

export async function confirmRegularNpc(game, npc, specializationId) {
  const field = npc.assignedField

  if (!field || !specializationId) return

  const currentSpecializationId = npc.specializationId

  if (specializationId !== currentSpecializationId) {
    const openJobs = getOpenSpecializationsByField(game, field)
    const canUseSpecialization = openJobs.some((job) => {
      return job.id === specializationId
    })

    if (!canUseSpecialization) return
  }

  game.regularReady = game.regularReady.filter((item) => {
    return item.id !== npc.id
  })

  npc.phase = 'regular'
  npc.status = '정규 업무중'
  npc.specializationId = specializationId
  npc.specializationName = getSpecializationName(
    field,
    specializationId
  )
  npc.name = npc.specializationName

  assignRegularMission(npc)

  game.regularNpcs.push(npc)

  updateRecruitmentStopped(game)

  await saveGame(game)
}

function assignRegularMission(npc) {
  const pool =
    specializationMissionPools[npc.specializationId] || []

  const missionName =
    pool.length > 0
      ? getRandomItem(pool)
      : `${npc.specializationName} 전문 업무`

  npc.mission = {
    id: `regular_${npc.specializationId}_${Date.now()}`,
    name: missionName,
    field: npc.assignedField
  }

  npc.missionRemaining = randomBetween(
    REGULAR_MIN_SECONDS,
    REGULAR_MAX_SECONDS
  )
}

function updateRegularNpcs(game) {
  game.regularNpcs.forEach((npc) => {
    if (!npc.mission) {
      assignRegularMission(npc)
      return
    }

    npc.missionRemaining -= 1

    if (npc.missionRemaining <= 0) {
      assignRegularMission(npc)
    }
  })
}

/*
|--------------------------------------------------------------------------
| 구 시스템 유지용 함수
|--------------------------------------------------------------------------
*/

export async function setLeaderNpc(game, npc) {
  if (npc.assignedField !== 'strategy') return

  game.regularNpcs = game.regularNpcs.filter((item) => {
    return item.id !== npc.id
  })

  npc.phase = 'leader'
  npc.roleType = 'leader'
  npc.status = '대표 NPC'
  npc.mission = null
  npc.missionRemaining = 0

  game.leaderNpc = npc

  await saveGame(game)
}

export async function setSpouseNpc(game, npc) {
  if (!game.leaderNpc) return
  if (game.spouseNpc) return

  game.regularNpcs = game.regularNpcs.filter((item) => {
    return item.id !== npc.id
  })

  npc.phase = 'spouse'
  npc.roleType = 'spouse'
  npc.status = '배우자 NPC'
  npc.mission = null
  npc.missionRemaining = 0

  game.spouseNpc = npc

  await saveGame(game)
}

/*
|--------------------------------------------------------------------------
| 표시 / 유틸
|--------------------------------------------------------------------------
*/

export function getBestSkillKey(npc) {
  let bestKey = missionFields[0]
  let bestValue = npc.skills?.[bestKey] || 0

  missionFields.forEach((field) => {
    const value = npc.skills?.[field] || 0

    if (value > bestValue) {
      bestKey = field
      bestValue = value
    }
  })

  return bestKey
}

export function getBestSkillValue(npc) {
  return npc.skills?.[getBestSkillKey(npc)] || 0
}

export function createEmptySkills() {
  const skills = {}

  missionFields.forEach((field) => {
    skills[field] = 0
  })

  return skills
}

function createInitialIncomingSkills(game, preferredField) {
  const skills = createEmptySkills()

  if (preferredField && isFieldOpen(game, preferredField)) {
    skills[preferredField] = 1
    return skills
  }

  const openFields = getOpenFields(game)
  const field = getRandomItem(openFields)

  if (field) {
    skills[field] = 1
  }

  return skills
}

export function formatTime(seconds) {
  if (seconds <= 0) return '0초'

  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainSeconds = seconds % 60

  if (days > 0) {
    return `${days}일 ${hours}시간 ${minutes}분`
  }

  if (hours > 0) {
    return `${hours}시간 ${minutes}분 ${remainSeconds}초`
  }

  if (minutes > 0) {
    return `${minutes}분 ${remainSeconds}초`
  }

  return `${remainSeconds}초`
}

function randomBetween(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min
}

function getRandomItem(items) {
  if (!items || items.length === 0) return null

  return items[Math.floor(Math.random() * items.length)]
}