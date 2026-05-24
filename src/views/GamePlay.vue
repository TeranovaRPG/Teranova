<template>
  <div class="page">
    <main class="layout" v-if="game">
      <header class="top">
        <div>
          <h1>{{ game.city.name }}</h1>

          <p>
            {{ game.player.name }}의 도시 · {{ stageLabel }}
          </p>
        </div>

        <div class="timeBox">
          <strong>{{ worldTime }}</strong>
          <span>{{ currentDate }}</span>
        </div>
      </header>

      <section class="grid">
        <button class="menuCard" @click="go('/incoming')">
          <strong>유입 인원</strong>
          <span>{{ game.incomingNpcs.length }}명</span>
        </button>

        <button class="menuCard" @click="go('/candidates')">
          <strong>신규채용자</strong>
          <span>{{ game.candidates.length }}명</span>
        </button>

        <button class="menuCard" @click="go('/regular')">
          <strong>정규 NPC</strong>
          <span>{{ totalRegularCount }}명</span>
        </button>

        <button class="menuCard" @click="go('/family')">
          <strong>대표 / 배우자</strong>
          <span>{{ familyStatus }}</span>
        </button>
      </section>

      <section class="card">
        <div class="sectionHead">
          <h2>도시 영향력</h2>

          <span>
            총 분야 {{ missionFields.length }}개
          </span>
        </div>

        <div class="influenceGrid">
          <div
            v-for="field in missionFields"
            :key="field"
            class="influenceBox"
          >
            <span>{{ influenceLabels[field] }}</span>

            <strong>
              {{ game.city.influences[field] || 0 }} / 100
            </strong>
          </div>
        </div>
      </section>
    </main>

    <main class="panel" v-else>
      <h1>저장된 도시가 없습니다</h1>

      <p>
        Google 로그인 후 새 도시를 만들어주세요.
      </p>

      <button class="menuCard centerButton" @click="go('/character-create')">
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
  loadGame,
  updateGameTick,
  watchGame
} from '../utils/gameEngine'

const router = useRouter()

const game = ref(null)
const now = ref(new Date())
const syncStatus = ref('Firebase 동기화 준비 중')

let timer = null
let unsubscribeGame = null
let isTickSaving = false

const stageLabel = computed(() => {
  if (!game.value) return ''

  if (game.value.city.stage === 'middle') {
    return '중형 단계'
  }

  if (game.value.city.stage === 'large') {
    return '대형 단계'
  }

  return '소형 단계'
})

const worldTime = computed(() => {
  const h = String(now.value.getHours()).padStart(2, '0')
  const m = String(now.value.getMinutes()).padStart(2, '0')

  return `${h}:${m}`
})

const currentDate = computed(() => {
  const y = now.value.getFullYear()
  const m = String(now.value.getMonth() + 1).padStart(2, '0')
  const d = String(now.value.getDate()).padStart(2, '0')

  return `${y}.${m}.${d}`
})

const totalRegularCount = computed(() => {
  if (!game.value) return 0

  return (
    game.value.apprentices.length +
    game.value.regularReady.length +
    game.value.regularNpcs.length
  )
})

const familyStatus = computed(() => {
  const leader = game.value?.leaderNpc ? '대표 있음' : '대표 없음'
  const spouse = game.value?.spouseNpc ? '배우자 있음' : '배우자 없음'

  return `${leader} / ${spouse}`
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

function go(path) {
  router.push(path)
}

async function tick() {
  now.value = new Date()

  if (!game.value) return
  if (isTickSaving) return

  isTickSaving = true
  syncStatus.value = '진행 상황 저장 중'

  try {
    normalizeInfluences()
    await updateGameTick(game.value)
    syncStatus.value = 'Firebase 실시간 동기화 완료'
  } catch (error) {
    console.error(error)
    syncStatus.value = '동기화 오류 발생'
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
        syncStatus.value = '저장된 도시 없음'
        return
      }

      game.value = firebaseGame
      normalizeInfluences()
      syncStatus.value = 'Firebase 데이터 연결됨'
    })

    timer = setInterval(tick, 1000)
  } catch (error) {
    console.error(error)
    syncStatus.value = '로그인 또는 데이터 연결 필요'
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
  max-width: 1100px;
  margin: 0 auto;
}

.top {
  display: flex;
  justify-content: space-between;

  gap: 18px;
  margin-bottom: 18px;
  padding: 24px;

  background:
    rgba(255, 255, 255, 0.06);

  border: 1px solid rgba(255, 255, 255, 0.12);
}

h1 {
  margin: 0;
  font-size: 36px;
}

p {
  color: #cfd8e3;
}

.syncText {
  margin-top: 8px;
  color: #9dc6ff;
  font-size: 13px;
}

.timeBox {
  min-width: 180px;
  padding: 14px;

  text-align: center;

  background:
    rgba(255, 255, 255, 0.06);
}

.timeBox strong {
  display: block;

  color: #9dc6ff;

  font-size: 38px;
  font-family: "Courier New", monospace;
}

.timeBox span {
  color: #cfd8e3;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 14px;
  margin-bottom: 18px;
}

.menuCard,
.card,
.panel {
  border: 1px solid rgba(255, 255, 255, 0.12);

  background:
    rgba(255, 255, 255, 0.06);

  color: white;
}

.menuCard {
  padding: 24px;

  text-align: left;

  cursor: pointer;
}

.centerButton {
  text-align: center;
}

.menuCard strong {
  display: block;

  margin-bottom: 10px;

  font-size: 18px;
}

.menuCard span {
  color: #9dc6ff;
}

.card {
  padding: 22px;
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

.influenceGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 10px;
}

.influenceBox {
  display: flex;
  justify-content: space-between;

  padding: 14px;

  background:
    rgba(255, 255, 255, 0.06);
}

.influenceBox span {
  color: #d8e0ea;
}

.influenceBox strong {
  color: #9dc6ff;
}

.panel {
  max-width: 520px;
  margin: 18vh auto 0;
  padding: 32px;

  text-align: center;
}

@media (max-width: 900px) {
  .grid,
  .influenceGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 760px) {
  .page {
    padding: 18px;
  }

  .top {
    display: block;
  }

  .timeBox {
    margin-top: 16px;
  }

  .grid,
  .influenceGrid {
    grid-template-columns: 1fr;
  }

  .menuCard,
  .influenceBox {
    width: 100%;
  }
}
</style>