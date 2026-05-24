<template>
  <div class="page">
    <main class="layout" v-if="game">
      <button class="back" @click="goBack">
        ← 도시로
      </button>

      <section class="card">
        <h1>정규 NPC</h1>

        <p class="desc">
          견습 직원은 10~30분 임무를 반복합니다.
          견습이 끝나면 정규 채용 대기자로 이동하며,
          최종 특화 직업을 확정할 수 있습니다.
        </p>

        <div class="summaryGrid">
          <div class="summaryBox">
            <span>견습 직원</span>
            <strong>{{ game.apprentices.length }}명</strong>
          </div>

          <div class="summaryBox">
            <span>정규 대기자</span>
            <strong>{{ game.regularReady.length }}명</strong>
          </div>

          <div class="summaryBox">
            <span>정규 직원</span>
            <strong>{{ game.regularNpcs.length }}명</strong>
          </div>
        </div>
      </section>

      <section class="card">
        <h2>견습 직원</h2>

        <div v-if="sortedApprentices.length === 0" class="empty">
          현재 견습 직원이 없습니다.
        </div>

        <div
          v-for="npc in sortedApprentices"
          :key="npc.id"
          class="npcCard"
        >
          <div class="npcTop">
            <div>
              <strong>{{ npc.name }}</strong>
              <p>
                {{ npc.specializationName }} 견습 ·
                {{ genderLabel(npc.gender) }}
              </p>
            </div>

            <span>
              {{ formatTime(npc.missionRemaining) }}
            </span>
          </div>

          <p>분야: {{ influenceLabels[npc.assignedField] }}</p>
          <p>현재 임무: {{ npc.mission.name }}</p>
          <p>견습 진행: {{ npc.apprenticeCompleted }} / 3</p>
        </div>
      </section>

      <section class="card">
        <h2>정규 채용 대기자</h2>

        <div v-if="game.regularReady.length === 0" class="empty">
          정규 채용 대기자가 없습니다.
        </div>

        <div
          v-for="npc in game.regularReady"
          :key="npc.id"
          class="npcCard"
        >
          <strong>{{ npc.name }}</strong>

          <p>
            {{ influenceLabels[npc.assignedField] }} 분야 ·
            {{ genderLabel(npc.gender) }}
          </p>

          <p>
            견습 참고 직업:
            {{ npc.specializationName }}
          </p>

          <select v-model="selectedSpecs[npc.id]">
            <option value="">최종 특화 직업 선택</option>

            <option
              v-for="job in getJobs(npc.assignedField)"
              :key="job.id"
              :value="job.id"
            >
              {{ job.name }}
            </option>
          </select>

          <button
            class="mainButton"
            @click="confirmRegular(npc)"
          >
            정규 직원 확정
          </button>
        </div>
      </section>

      <section class="card">
        <h2>정규 직원</h2>

        <div v-if="sortedRegularNpcs.length === 0" class="empty">
          현재 정규 직원이 없습니다.
        </div>

        <div
          v-for="npc in sortedRegularNpcs"
          :key="npc.id"
          class="npcCard"
        >
          <div class="npcTop">
            <div>
              <strong>{{ npc.name }}</strong>
              <p>
                {{ npc.specializationName }} ·
                {{ genderLabel(npc.gender) }}
              </p>
            </div>

            <span>
              {{ formatTime(npc.missionRemaining) }}
            </span>
          </div>

          <p>분야: {{ influenceLabels[npc.assignedField] }}</p>
          <p>현재 임무: {{ npc.mission?.name }}</p>

          <div class="buttons">
            <button
              v-if="canSetLeader(npc)"
              class="mainButton"
              @click="setLeader(npc)"
            >
              대표 지정
            </button>

            <button
              v-if="canSetSpouse(npc)"
              class="mainButton"
              @click="setSpouse(npc)"
            >
              배우자 지정
            </button>
          </div>
        </div>
      </section>
    </main>

    <main class="panel" v-else>
      <h1>저장된 도시가 없습니다</h1>

      <button class="back" @click="goCreate">
        새 도시 만들기
      </button>
    </main>
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  onUnmounted,
  ref
} from 'vue'

import { useRouter } from 'vue-router'

import {
  defaultInfluences,
  influenceLabels,
  missionFields
} from '../data/gameDefaults'

import { jobSpecializations } from '../data/jobs'

import {
  confirmRegularNpc,
  formatTime,
  genderLabel,
  loadGame,
  saveGame,
  setLeaderNpc,
  setSpouseNpc,
  updateGameTick
} from '../utils/gameEngine'

const router = useRouter()

const game = ref(null)
const selectedSpecs = ref({})

let timer = null

const sortedApprentices = computed(() => {
  if (!game.value) return []

  return [...game.value.apprentices].sort((a, b) => {
    return a.missionRemaining - b.missionRemaining
  })
})

const sortedRegularNpcs = computed(() => {
  if (!game.value) return []

  return [...game.value.regularNpcs].sort((a, b) => {
    return a.missionRemaining - b.missionRemaining
  })
})

function getJobs(field) {
  return jobSpecializations[field] || []
}

function confirmRegular(npc) {
  const spec = selectedSpecs.value[npc.id]

  if (!spec) return

  confirmRegularNpc(game.value, npc, spec)
}

function canSetLeader(npc) {
  return !game.value.leaderNpc && npc.assignedField === 'strategy'
}

function canSetSpouse(npc) {
  return (
    game.value.leaderNpc &&
    !game.value.spouseNpc &&
    npc.gender !== game.value.leaderNpc.gender
  )
}

function setLeader(npc) {
  setLeaderNpc(game.value, npc)
}

function setSpouse(npc) {
  setSpouseNpc(game.value, npc)
}

function normalizeInfluences() {
  if (!game.value) return

  if (!game.value.city.influences) {
    game.value.city.influences = { ...defaultInfluences }
  }

  missionFields.forEach((field) => {
    if (
      !Object.prototype.hasOwnProperty.call(
        game.value.city.influences,
        field
      )
    ) {
      game.value.city.influences[field] = 0
    }
  })
}

function goBack() {
  router.push('/play')
}

function goCreate() {
  router.push('/character-create')
}

function tick() {
  if (!game.value) return

  updateGameTick(game.value)
  normalizeInfluences()
  saveGame(game.value)
}

onMounted(() => {
  game.value = loadGame()

  normalizeInfluences()

  timer = setInterval(tick, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.page {
  height: 100dvh;
  overflow-y: auto;
  background: #07101f;
  color: #f5f7fa;
  padding: 28px;
  box-sizing: border-box;
  scrollbar-width: none;
}

.page::-webkit-scrollbar {
  display: none;
}

.layout {
  max-width: 900px;
  margin: 0 auto;
}

.back,
.card,
.npcCard,
select,
button,
.panel {
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.back,
.card,
.npcCard,
.panel {
  background: rgba(255, 255, 255, 0.06);
}

.back {
  margin-bottom: 16px;
  padding: 10px 14px;
  color: white;
  cursor: pointer;
}

.card {
  margin-bottom: 18px;
  padding: 22px;
}

.desc,
.empty,
p {
  color: #cfd8e3;
}

.summaryGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.summaryBox {
  padding: 14px;
  background: rgba(157, 198, 255, 0.1);
}

.summaryBox span {
  display: block;
  margin-bottom: 8px;
  color: #cfd8e3;
  font-size: 13px;
}

.summaryBox strong {
  color: #9dc6ff;
}

.npcCard {
  margin-bottom: 12px;
  padding: 14px;
}

.npcTop {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.npcTop span {
  color: #9dc6ff;
  font-weight: 700;
}

select {
  width: 100%;
  max-width: 280px;
  margin-top: 10px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);
  color: white;
}

.mainButton {
  margin-top: 10px;
  margin-right: 8px;
  padding: 10px 14px;
  background: rgba(63, 123, 216, 0.82);
  color: white;
  cursor: pointer;
}

.panel {
  max-width: 520px;
  margin: 18vh auto 0;
  padding: 32px;
  text-align: center;
}

@media (max-width: 760px) {
  .page {
    padding: 18px;
  }

  .summaryGrid {
    grid-template-columns: 1fr;
  }

  .npcTop {
    display: block;
  }

  .npcTop span {
    display: inline-block;
    margin-top: 8px;
  }
}
</style>