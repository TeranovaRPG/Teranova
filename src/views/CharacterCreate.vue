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

      <p class="statusText">
        {{ statusText }}
      </p>

      <button
        class="mainButton"
        :disabled="isCreating"
        @click="createGame"
      >
        {{ isCreating ? '생성 중...' : '도시 생성' }}
      </button>

      <button
        class="backButton"
        :disabled="isCreating"
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

import { auth } from '../firebase'

import {
  createNewGame
} from '../utils/gameEngine'

const router = useRouter()

const playerName = ref('')
const cityName = ref('')
const statusText = ref('Google 로그인 후 도시 데이터를 Firebase에 저장합니다.')
const isCreating = ref(false)

async function createGame() {
  if (!auth.currentUser) {
    statusText.value = 'Google 로그인이 필요합니다. 시작 화면에서 로그인해주세요.'
    router.push('/')
    return
  }

  if (isCreating.value) return

  isCreating.value = true
  statusText.value = '새 도시를 Firebase에 생성하는 중입니다.'

  try {
    await createNewGame(
      playerName.value,
      cityName.value
    )

    statusText.value = '도시 생성 완료.'
    router.push('/play')
  } catch (error) {
    console.error(error)
    statusText.value = '도시 생성 중 오류가 발생했습니다.'
  } finally {
    isCreating.value = false
  }
}

function goBack() {
  router.push('/')
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

.statusText {
  min-height: 22px;
  margin: 18px 0 0;

  color: #9dc6ff;
  font-size: 13px;
  line-height: 1.5;
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

.mainButton:disabled,
.backButton:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.mainButton:hover:not(:disabled),
.backButton:hover:not(:disabled) {
  transform: translateY(-2px);
}
</style>