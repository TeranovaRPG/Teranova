<template>
  <div class="page">
    <main class="panel">
      <p class="eyebrow">NEW CITY SETUP</p>

      <h1 class="title">
        당신의 도시를 시작하세요
      </h1>

      <div class="form">
        <label>
          플레이어 이름
          <input
            v-model="playerName"
            placeholder="플레이어 이름"
          />
        </label>

        <label>
          도시 이름
          <input
            v-model="cityName"
            placeholder="도시 이름"
          />
        </label>
      </div>

      <button
        class="mainButton"
        @click="createGame"
      >
        도시 생성
      </button>

      <button
        class="backButton"
        @click="goBack"
      >
        이전으로
      </button>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import {
  AUTO_INCOMING_MS,
  defaultInfluences,
  INCOMING_MAX_SECONDS,
  INCOMING_MIN_SECONDS,
  missionFields,
  STORAGE_KEY
} from '../data/gameDefaults'

import {
  incomingFieldMissions,
  incomingMissions
} from '../data/missions'

const router = useRouter()

const playerName = ref('')
const cityName = ref('')

function createGame() {
  const now = Date.now()

  const game = {
    player: {
      name: playerName.value || '플레이어'
    },

    city: {
      name: cityName.value || '테라노브 시티',
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

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(game)
  )

  router.push('/play')
}

function createInitialIncomingNpcs(count) {
  return Array.from({ length: count }, () => {
    const guideMission = getRandomItem(incomingMissions)
    const fieldMission = getRandomItem(incomingFieldMissions)

    return {
      id: createId(),

      phase: 'incoming',

      name: '',

      gender: Math.random() > 0.5
        ? 'male'
        : 'female',

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

      skills: createInitialSkills(),

      specialSkills: {}
    }
  })
}

function createInitialSkills() {
  const skills = {}

  missionFields.forEach((field) => {
    skills[field] = 0
  })

  const randomField = getRandomItem(missionFields)

  skills[randomField] = 1

  return skills
}

function createId() {
  if (
    typeof crypto !== 'undefined' &&
    crypto.randomUUID
  ) {
    return crypto.randomUUID()
  }

  return `npc_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2)}`
}

function randomBetween(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min
}

function getRandomItem(items) {
  if (!items || items.length === 0) {
    return null
  }

  return items[
    Math.floor(Math.random() * items.length)
  ]
}
</script>

<style scoped>
.page {
  min-height: 100dvh;
  background-image: url('/start-bg.png');
  background-size: cover;
  background-position: center;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #f5f7fa;
}

.panel {
  width: min(92vw, 620px);
  padding: 42px 28px;

  background: rgba(8, 14, 24, 0.62);
  backdrop-filter: blur(16px);

  border: 1px solid rgba(255, 255, 255, 0.14);
  text-align: center;
}

.eyebrow {
  color: #9dc6ff;
  font-size: 12px;
  letter-spacing: 0.26em;
}

.title {
  margin: 12px 0 28px;
  font-size: clamp(30px, 5vw, 46px);
}

.form {
  display: grid;
  gap: 16px;
  text-align: left;
}

label {
  display: grid;
  gap: 8px;

  color: #d8e0ea;
  font-size: 14px;
}

input {
  padding: 14px 16px;

  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.08);

  color: white;
  font-size: 15px;
}

.mainButton,
.backButton {
  width: 100%;
  margin-top: 20px;
  padding: 15px 20px;

  cursor: pointer;
  transition: 0.2s;
}

.mainButton {
  border: 1px solid rgba(157, 198, 255, 0.6);
  background: rgba(63, 123, 216, 0.86);

  color: white;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.backButton {
  margin-top: 10px;

  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);

  color: #d8e0ea;
}

.mainButton:hover,
.backButton:hover {
  transform: translateY(-2px);
}
</style>