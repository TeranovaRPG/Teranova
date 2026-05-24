<template>
  <div class="page">
    <main class="layout" v-if="game">
      <button class="back" @click="goBack">
        ← 도시로
      </button>

      <section class="card">
        <h1>신규채용자 명단</h1>

        <p class="desc">
          채용 심사를 통과한 인물입니다.
          숙련도 10을 달성한 분야를 기준으로 2차 세부직업만 선택할 수 있습니다.
          마음에 들지 않으면 탈락 처리할 수 있습니다.
        </p>

        <div class="summaryBox">
          현재 후보:
          <strong>{{ game.candidates.length }}명</strong>
        </div>
      </section>

      <section class="card">
        <div v-if="game.candidates.length === 0" class="empty">
          현재 신규채용자 후보가 없습니다.
        </div>

        <div
          v-for="npc in sortedCandidates"
          :key="npc.id"
          class="npcCard"
        >
          <input
            class="nameInput"
            v-model="npc.name"
            placeholder="이름 입력"
            @change="saveGameNow"
          />

          <p>
            {{ genderLabel(npc.gender) }}
            · 확정 분야:
            {{ influenceLabels[getBestSkillKey(npc)] }}
            {{ getBestSkillValue(npc) }}
          </p>

          <div class="skills">
            <span
              v-for="field in missionFields"
              :key="field"
              :class="{ bestSkill: field === getBestSkillKey(npc) }"
            >
              {{ influenceLabels[field] }} {{ npc.skills[field] || 0 }}
            </span>
          </div>

          <div class="selects">
            <select v-model="selectedSpecs[npc.id]">
              <option value="">2차 직업 선택</option>

              <option
                v-for="job in getJobs(getBestSkillKey(npc))"
                :key="job.id"
                :value="job.id"
              >
                {{ job.name }}
              </option>
            </select>

            <button
              class="mainButton"
              @click="startApprentice(npc)"
            >
              견습 시작
            </button>

            <button
              class="dangerButton"
              @click="rejectCandidate(npc)"
            >
              탈락 처리
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
  assignCandidateToApprentice,
  genderLabel,
  getBestSkillKey,
  getBestSkillValue,
  loadGame,
  saveGame,
  updateGameTick
} from '../utils/gameEngine'

const router = useRouter()

const game = ref(null)
const selectedSpecs = ref({})

let timer = null

const sortedCandidates = computed(() => {
  if (!game.value) return []

  return [...game.value.candidates].sort((a, b) => {
    return getBestSkillValue(b) - getBestSkillValue(a)
  })
})

function getJobs(field) {
  if (!field) return []

  return jobSpecializations[field] || []
}

function startApprentice(npc) {
  const field = getBestSkillKey(npc)
  const spec = selectedSpecs.value[npc.id]

  if (!npc.name || !field || !spec) return

  assignCandidateToApprentice(game.value, npc, field, spec)

  saveGameNow()
}

function rejectCandidate(npc) {
  game.value.candidates = game.value.candidates.filter((item) => {
    return item.id !== npc.id
  })

  saveGameNow()
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

function saveGameNow() {
  saveGame(game.value)
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
input,
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

.summaryBox {
  margin-top: 16px;
  padding: 14px;
  background: rgba(157, 198, 255, 0.1);
  color: #cfd8e3;
}

.summaryBox strong {
  color: #9dc6ff;
}

.npcCard {
  margin-bottom: 12px;
  padding: 14px;
}

.nameInput,
select {
  width: 100%;
  max-width: 260px;
  margin-right: 8px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);
  color: white;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 12px 0;
}

.skills span {
  padding: 6px 8px;
  background: rgba(157, 198, 255, 0.1);
  color: #d8e0ea;
  font-size: 12px;
}

.skills .bestSkill {
  color: white;
  background: rgba(63, 123, 216, 0.72);
}

.selects {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mainButton,
.dangerButton {
  padding: 10px 14px;
  color: white;
  cursor: pointer;
}

.mainButton {
  background: rgba(63, 123, 216, 0.82);
}

.dangerButton {
  background: rgba(160, 58, 58, 0.82);
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

  .selects {
    display: grid;
  }

  .nameInput,
  select {
    max-width: none;
  }
}
</style>