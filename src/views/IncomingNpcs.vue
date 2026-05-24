<template>
  <div class="page">
    <main class="layout" v-if="game">
      <button class="back" @click="goBack">
        ← 도시로
      </button>

      <section class="card">
        <h1>유입 인원</h1>

        <p class="desc">
          신규 인물은 10분마다 자동 유입됩니다.
          유입 인원은 1~5분 임무를 반복하며,
          한 분야 숙련도 10 달성 시 50% 확률로 신규채용자 명단에 올라갑니다.
        </p>

        <div class="summaryGrid">
          <div class="summaryBox">
            <span>현재 유입 인원</span>
            <strong>{{ sortedIncomingNpcs.length }}명</strong>
          </div>

          <div class="summaryBox">
            <span>다음 신규 인물 도착까지</span>
            <strong>{{ formatTime(nextIncomingRemaining) }}</strong>
          </div>
        </div>
      </section>

      <section class="card">
        <div class="sectionHead">
          <h2>적응 중인 인물</h2>

          <span>
            빠른 종료 순
          </span>
        </div>

        <div v-if="sortedIncomingNpcs.length === 0" class="empty">
          현재 적응 중인 인물이 없습니다.
        </div>

        <div
          v-for="npc in sortedIncomingNpcs"
          :key="npc.id"
          class="npcCard"
        >
          <div class="npcTop">
            <div>
              <strong>이름 미정</strong>

              <p>
                {{ genderLabel(npc.gender) }} · {{ npc.status }}
              </p>
            </div>

            <span>
              {{ formatTime(npc.missionRemaining) }}
            </span>
          </div>

          <div class="missionInfo">
            <p>
              현재 과정:
              {{ npc.mission.name }}
            </p>

            <p>
              분야:
              {{ influenceLabels[npc.mission.field] }}
            </p>

            <p>
              최고 숙련:
              {{ influenceLabels[getBestSkillKey(npc)] }}
              {{ getBestSkillValue(npc) }}
            </p>
          </div>

          <div class="skills">
            <span
              v-for="field in missionFields"
              :key="field"
              :class="{ bestSkill: field === getBestSkillKey(npc) }"
            >
              {{ influenceLabels[field] }} {{ npc.skills[field] || 0 }}
            </span>
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

import {
  formatTime,
  genderLabel,
  getBestSkillKey,
  getBestSkillValue,
  loadGame,
  saveGame,
  updateGameTick
} from '../utils/gameEngine'

const router = useRouter()

const game = ref(null)
const now = ref(new Date())

let timer = null

const nextIncomingRemaining = computed(() => {
  if (!game.value) return 0

  return Math.max(
    0,
    Math.ceil(
      (game.value.recruitment.nextIncomingAt - now.value.getTime()) / 1000
    )
  )
})

const sortedIncomingNpcs = computed(() => {
  if (!game.value) return []

  return [...game.value.incomingNpcs].sort((a, b) => {
    return a.missionRemaining - b.missionRemaining
  })
})

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

  now.value = new Date()

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
.panel {
  background:
    rgba(255, 255, 255, 0.06);

  color: white;

  border: 1px solid rgba(255, 255, 255, 0.12);
}

.back {
  margin-bottom: 16px;
  padding: 10px 14px;

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
  grid-template-columns: 1fr 1.5fr;

  gap: 12px;
  margin-top: 16px;
}

.summaryBox {
  padding: 14px;

  background:
    rgba(157, 198, 255, 0.1);
}

.summaryBox span {
  display: block;

  margin-bottom: 8px;

  color: #cfd8e3;
  font-size: 13px;
}

.summaryBox strong {
  color: #9dc6ff;
  font-size: 18px;
}

.sectionHead {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 12px;
  margin-bottom: 18px;
}

.sectionHead h2 {
  margin: 0;
}

.sectionHead span {
  color: #9dc6ff;
  font-size: 13px;
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

.missionInfo {
  margin-top: 12px;
}

.missionInfo p {
  margin: 5px 0;
}

.skills {
  display: flex;
  flex-wrap: wrap;

  gap: 6px;
  margin-top: 12px;
}

.skills span {
  padding: 6px 8px;

  background:
    rgba(157, 198, 255, 0.1);

  color: #d8e0ea;

  font-size: 12px;
}

.skills .bestSkill {
  color: white;

  background:
    rgba(63, 123, 216, 0.72);
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

  .sectionHead,
  .npcTop {
    display: block;
  }

  .npcTop span {
    display: inline-block;
    margin-top: 8px;
  }
}
</style>