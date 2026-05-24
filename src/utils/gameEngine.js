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
  STORAGE_KEY,
  TRAINEE_PASS_RATE,
  TRAINEE_PASS_SKILL
} from '../data/gameDefaults'

import {
  apprenticeMissions,
  incomingFieldMissions,
  incomingMissions,
  specializationMissionPools
} from '../data/missions'

import { getSpecializationName } from '../data/jobs'

export function loadGame() {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) return null

  const game = JSON.parse(saved)

  normalizeGame(game)

  return game
}

export function saveGame(game) {
  if (!game) return

  game.updatedAt = Date.now()

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(game)
  )
}

export function createNewGame(playerName, cityName) {
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

    incomingNpcs: createInitialIncomingNpcs(5),
    candidates: [],
    apprentices: [],
    regularReady: [],
    regularNpcs: [],

    leaderNpc: null,
    spouseNpc: null,
    children: [],

    recruitment: {
      nextIncomingAt: now + AUTO_INCOMING_MS
    },

    createdAt: now,
    updatedAt: now
  }

  saveGame(game)

  return game
}

export function updateGameTick(game) {
  if (!game) return

  processIncomingTimer(game)
  updateIncomingNpcs(game)
  updateApprentices(game)
  updateRegularNpcs(game)

  saveGame(game)
}

function normalizeGame(game) {
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
      nextIncomingAt: Date.now() + AUTO_INCOMING_MS
    }
  }

  if (!game.incomingNpcs) game.incomingNpcs = []
  if (!game.candidates) game.candidates = []
  if (!game.apprentices) game.apprentices = []
  if (!game.regularReady) game.regularReady = []
  if (!game.regularNpcs) game.regularNpcs = []
  if (!game.children) game.children = []

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

  saveGame(game)
}

function normalizeNpc(npc) {
  if (!npc.id) npc.id = crypto.randomUUID()
  if (!npc.gender) npc.gender = randomGender()
  if (!npc.skills) npc.skills = createEmptySkills()
  if (!npc.specialSkills) npc.specialSkills = {}

  missionFields.forEach((field) => {
    if (!Object.prototype.hasOwnProperty.call(npc.skills, field)) {
      npc.skills[field] = 0
    }
  })

  if (!npc.status) npc.status = '대기중'
  if (!Object.prototype.hasOwnProperty.call(npc, 'mission')) npc.mission = null
  if (!Object.prototype.hasOwnProperty.call(npc, 'missionRemaining')) npc.missionRemaining = 0
}

function processIncomingTimer(game) {
  const current = Date.now()

  if (current < game.recruitment.nextIncomingAt) return

  game.incomingNpcs.push(createIncomingNpc())

  game.recruitment.nextIncomingAt = current + AUTO_INCOMING_MS
}

function createInitialIncomingNpcs(count) {
  return Array.from({ length: count }, () => {
    return createIncomingNpc()
  })
}

function createIncomingNpc() {
  const guideMission = getRandomItem(incomingMissions)
  const fieldMission = getRandomItem(incomingFieldMissions)

  return {
    id: crypto.randomUUID(),
    phase: 'incoming',
    name: '',
    gender: randomGender(),
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
    skills: createInitialIncomingSkills(),
    specialSkills: {}
  }
}

function updateIncomingNpcs(game) {
  const finished = []

  game.incomingNpcs.forEach((npc) => {
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

  if (field) {
    npc.skills[field] += 1
  }

  if (field && npc.skills[field] >= TRAINEE_PASS_SKILL) {
    judgeIncomingNpc(game, npc)
    return
  }

  const nextMission = getRandomItem(incomingFieldMissions)

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

function judgeIncomingNpc(game, npc) {
  game.incomingNpcs = game.incomingNpcs.filter((item) => {
    return item.id !== npc.id
  })

  const passed = Math.random() < TRAINEE_PASS_RATE

  if (!passed) return

  npc.phase = 'candidate'
  npc.status = '신규직원 후보'
  npc.name = ''
  npc.mission = null
  npc.missionRemaining = 0

  game.candidates.push(npc)
}

export function assignCandidateToApprentice(game, npc, field, specializationId) {
  if (!npc.name) return

  game.candidates = game.candidates.filter((item) => {
    return item.id !== npc.id
  })

  npc.phase = 'apprentice'
  npc.status = '견습 진행중'
  npc.assignedField = field
  npc.specializationId = specializationId
  npc.specializationName = getSpecializationName(field, specializationId)
  npc.apprenticeCompleted = 0
  npc.specialSkills = {}

  assignApprenticeMission(npc)

  game.apprentices.push(npc)

  saveGame(game)
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

export function confirmRegularNpc(game, npc, specializationId) {
  game.regularReady = game.regularReady.filter((item) => {
    return item.id !== npc.id
  })

  npc.phase = 'regular'
  npc.status = '정규 업무중'
  npc.specializationId = specializationId
  npc.specializationName = getSpecializationName(
    npc.assignedField,
    specializationId
  )

  assignRegularMission(npc)

  game.regularNpcs.push(npc)

  saveGame(game)
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

export function setLeaderNpc(game, npc) {
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

  saveGame(game)
}

export function setSpouseNpc(game, npc) {
  if (!game.leaderNpc) return
  if (game.spouseNpc) return
  if (game.leaderNpc.gender === npc.gender) return

  game.regularNpcs = game.regularNpcs.filter((item) => {
    return item.id !== npc.id
  })

  npc.phase = 'spouse'
  npc.roleType = 'spouse'
  npc.status = '배우자 NPC'
  npc.mission = null
  npc.missionRemaining = 0

  game.spouseNpc = npc

  saveGame(game)
}

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

function createInitialIncomingSkills() {
  const skills = createEmptySkills()
  const field = getRandomItem(missionFields)

  skills[field] = 1

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

export function randomGender() {
  return Math.random() > 0.5 ? 'male' : 'female'
}

export function genderLabel(gender) {
  return gender === 'male' ? '남성' : '여성'
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