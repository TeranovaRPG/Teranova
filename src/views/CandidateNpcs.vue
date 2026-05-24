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
          숙련도 10을 달성한 분야 기준으로
          남아 있는 2차 직업만 선택 가능합니다.
        </p>

        <div class="summaryBox">
          현재 후보:
          <strong>{{ game.candidates.length }}명</strong>
        </div>
      </section>

      <section class="card">
        <div v-if="sortedCandidates.length === 0" class="empty">
          현재 신규채용자 후보가 없습니다.
        </div>

        <div
          v-for="npc in sortedCandidates"
          :key="npc.id"
          class="npcCard"
        >
          <strong class="candidateTitle">
            {{ influenceLabels[getBestSkillKey(npc)] }} 후보 인원
          </strong>

          <p>
            확정 분야:
            {{ influenceLabels[getBestSkillKey(npc)] }}
            {{ getBestSkillValue(npc) }}
          </p>

          <div class="skills">
            <span
              v-for="field in missionFields"
              :key="field"
              :class="{ bestSkill: field === getBestSkillKey(npc) }"
            >
              {{ influenceLabels[field] }}
              {{ npc.skills[field] || 0 }}
            </span>
          </div>

          <div
            v-if="getJobs(getBestSkillKey(npc)).length > 0"
            class="selects"
          >
            <select v-model="selectedSpecs[npc.id]">
              <option value="">
                2차 직업 선택
              </option>

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
              :disabled="isSaving"
              @click="startApprentice(npc)"
            >
              견습 시작
            </button>

            <button
              class="dangerButton"
              :disabled="isSaving"
              @click="rejectCandidate(npc)"
            >
              탈락 처리
            </button>
          </div>

          <div v-else class="closedBox">
            해당 분야의 모든 직업이 채워졌습니다.
          </div>

          <p v-if="noticeMap[npc.id]" class="noticeText">
            {{ noticeMap[npc.id] }}
          </p>
        </div>
      </section>
    </main>

    <main class="panel" v-else>
      <h1>저장된 도시가 없습니다</h1>

      <p>
        Google 로그인 후 새 도시를 만들어주세요.
      </p>

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
  assignCandidateToApprentice,
  getBestSkillKey,
  getBestSkillValue,
  getOpenSpecializationsByField,
  loadGame,
  saveGame,
  updateGameTick,
  watchGame
} from '../utils/gameEngine'

const router = useRouter()

const game = ref(null)
const selectedSpecs = ref({})
const noticeMap = ref({})
const isSaving = ref(false)

let timer = null
let unsubscribeGame = null
let isTickSaving = false

const sortedCandidates = computed(() => {
  if (!game.value?.candidates) return []

  return [...game.value.candidates].sort((a, b) => {
    return getBestSkillValue(b) - getBestSkillValue(a)
  })
})

function getJobs(field) {
  if (!field || !game.value) return []

  return getOpenSpecializationsByField(
    game.value,
    field
  )
}

function setNotice(npcId, message) {
  noticeMap.value = {
    ...noticeMap.value,
    [npcId]: message
  }
}

function clearNotice(npcId) {
  if (!noticeMap.value[npcId]) return

  const nextMap = { ...noticeMap.value }
  delete nextMap[npcId]
  noticeMap.value = nextMap
}

async function startApprentice(npc) {
  const field = getBestSkillKey(npc)
  const spec = selectedSpecs.value[npc.id]

  if (!field || !spec) {
    setNotice(
      npc.id,
      '2차 직업을 선택해주세요.'
    )

    return
  }

  if (!game.value || isSaving.value) return

  isSaving.value = true
  clearNotice(npc.id)

  try {
    await assignCandidateToApprentice(
      game.value,
      npc,
      field,
      spec
    )

    delete selectedSpecs.value[npc.id]
  } catch (error) {
    console.error(error)

    setNotice(
      npc.id,
      '견습 배치 저장 중 오류가 발생했습니다.'
    )
  } finally {
    isSaving.value = false
  }
}

async function rejectCandidate(npc) {
  if (!game.value || isSaving.value) return

  isSaving.value = true
  clearNotice(npc.id)

  try {
    game.value.candidates =
      game.value.candidates.filter((item) => {
        return item.id !== npc.id
      })

    delete selectedSpecs.value[npc.id]

    await saveGame(game.value)
  } catch (error) {
    console.error(error)

    setNotice(
      npc.id,
      '후보 탈락 처리 중 오류가 발생했습니다.'
    )
  } finally {
    isSaving.value = false
  }
}

function normalizeInfluences() {
  if (!game.value) return

  if (!game.value.city.influences) {
    game.value.city.influences = {
      ...defaultInfluences
    }
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

async function tick() {
  if (!game.value) return
  if (isTickSaving || isSaving.value) return

  isTickSaving = true

  try {
    normalizeInfluences()
    await updateGameTick(game.value)
  } catch (error) {
    console.error(error)
  } finally {
    isTickSaving = false
  }
}

onMounted(async () => {
  try {
    game.value = await loadGame()

    normalizeInfluences()

    unsubscribeGame = watchGame((firebaseGame) => {
      if (!firebaseGame) {
        game.value = null
        return
      }

      game.value = firebaseGame

      normalizeInfluences()
    })

    timer = setInterval(tick, 1000)
  } catch (error) {
    console.error(error)
  }
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }

  if (unsubscribeGame) {
    unsubscribeGame()
  }
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

.candidateTitle {
  display: block;
  margin-bottom: 12px;
  color: #9dc6ff;
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

select {
  width: 100%;
  max-width: 260px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);
  color: white;
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

.mainButton:disabled,
.dangerButton:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.closedBox {
  margin-top: 12px;
  padding: 12px;
  background: rgba(160, 58, 58, 0.18);
  color: #ffd0d0;
}

.noticeText {
  margin-top: 10px;
  color: #9dc6ff;
  font-size: 13px;
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

  select {
    max-width: none;
  }
}
</style>