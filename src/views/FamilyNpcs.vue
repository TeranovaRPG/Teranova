<template>
  <div class="page">
    <main class="layout" v-if="game">
      <button class="back" @click="goBack">
        ← 도시로
      </button>

      <section class="card">
        <h1>대표 / 배우자</h1>

        <p class="desc">
          이 페이지는 제거 예정입니다.
          현재는 기존 저장 데이터 확인용으로만 유지됩니다.
        </p>
      </section>

      <section class="familyGrid">
        <article class="card">
          <h2>대표 NPC</h2>

          <div v-if="game.leaderNpc" class="npcCard">
            <strong>{{ game.leaderNpc.name }}</strong>

            <p>
              {{ game.leaderNpc.specializationName }}
            </p>

            <p>{{ game.leaderNpc.status }}</p>
          </div>

          <p v-else class="empty">
            아직 대표 NPC가 없습니다.
          </p>
        </article>

        <article class="card">
          <h2>배우자 NPC</h2>

          <div v-if="game.spouseNpc" class="npcCard">
            <strong>{{ game.spouseNpc.name }}</strong>

            <p>
              {{ game.spouseNpc.specializationName }}
            </p>

            <p>{{ game.spouseNpc.status }}</p>
          </div>

          <p v-else class="empty">
            아직 배우자 NPC가 없습니다.
          </p>
        </article>
      </section>

      <section class="card">
        <h2>가문 상태</h2>

        <div class="summaryGrid">
          <div class="summaryBox">
            <span>대표</span>
            <strong>{{ game.leaderNpc ? '지정됨' : '없음' }}</strong>
          </div>

          <div class="summaryBox">
            <span>배우자</span>
            <strong>{{ game.spouseNpc ? '지정됨' : '없음' }}</strong>
          </div>

          <div class="summaryBox">
            <span>자녀</span>
            <strong>{{ game.children?.length || 0 }}명</strong>
          </div>
        </div>

        <p class="desc">
          추후 해당 영역은 다른 시스템으로 재구성될 예정입니다.
        </p>
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
  onMounted,
  onUnmounted,
  ref
} from 'vue'

import { useRouter } from 'vue-router'

import {
  defaultInfluences,
  missionFields
} from '../data/gameDefaults'

import {
  loadGame,
  updateGameTick,
  watchGame
} from '../utils/gameEngine'

const router = useRouter()

const game = ref(null)

let timer = null
let unsubscribeGame = null
let isTickSaving = false

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

async function tick() {
  if (!game.value) return
  if (isTickSaving) return

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
.panel {
  border: 1px solid rgba(255, 255, 255, 0.12);
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

.familyGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.desc,
.empty,
p {
  color: #cfd8e3;
}

.npcCard {
  padding: 14px;
}

.summaryGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 16px 0;
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

  .familyGrid,
  .summaryGrid {
    display: block;
  }

  .summaryBox {
    margin-bottom: 12px;
  }
}
</style>