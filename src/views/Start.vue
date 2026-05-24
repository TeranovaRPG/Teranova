<template>
  <div class="start">
    <div class="overlay"></div>

    <main class="content">
      <h1 class="title">TERANOVE</h1>

      <p class="subtitle">
        사람을 키우고, 도시를 만들고, 세계로 배출하세요.
      </p>

      <div class="menu">
        <button class="mainButton" @click="startGame">
          GAME START
        </button>

        <button class="subButton" @click="continueGame">
          CONTINUE
        </button>
      </div>

      <p class="systemText">
        {{ typedText }}
        <span class="cursor">|</span>
      </p>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { STORAGE_KEY } from '../data/gameDefaults'

const router = useRouter()

const text = 'TERANOVE 세계 접속 준비 완료.'
const typedText = ref('')
let index = 0

function startGame() {
  router.push('/home')
}

function continueGame() {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    router.push('/home')
    return
  }

  router.push('/play')
}

function typeEffect() {
  if (index < text.length) {
    typedText.value += text[index]
    index += 1
    setTimeout(typeEffect, 45)
  }
}

onMounted(() => {
  typeEffect()
})
</script>

<style scoped>
.start {
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  background-image: url('/start-bg.png');
  background-size: cover;
  background-position: center;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #f5f7fa;
}

.overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to bottom,
      rgba(4, 8, 16, 0.46),
      rgba(5, 8, 14, 0.88)
    );
}

.content {
  position: relative;
  z-index: 1;

  width: min(92vw, 720px);
  padding: 40px 24px;

  text-align: center;
}

.title {
  margin: 0;
  font-size: clamp(52px, 10vw, 96px);
  letter-spacing: 0.22em;
  text-indent: 0.22em;

  color: #f8fbff;

  text-shadow:
    0 0 18px rgba(157, 198, 255, 0.18),
    0 8px 24px rgba(0, 0, 0, 0.75);
}

.subtitle {
  margin: 20px 0 46px;
  color: #d8e0ea;
  font-size: 17px;
  letter-spacing: 0.08em;
  line-height: 1.7;
}

.menu {
  width: min(360px, 100%);
  margin: 0 auto;

  display: grid;
  gap: 14px;
}

.mainButton,
.subButton {
  width: 100%;
  padding: 18px 20px;

  border: 1px solid rgba(255, 255, 255, 0.16);
  color: white;

  cursor: pointer;
  transition: 0.2s;
  backdrop-filter: blur(10px);
}

.mainButton {
  background:
    linear-gradient(
      to bottom,
      rgba(63, 123, 216, 0.9),
      rgba(36, 74, 134, 0.9)
    );

  font-size: 18px;
  letter-spacing: 0.18em;
  font-weight: 700;
}

.subButton {
  background: rgba(255, 255, 255, 0.08);
  font-size: 15px;
  letter-spacing: 0.16em;
}

.mainButton:hover,
.subButton:hover {
  transform: translateY(-2px);
  border-color: rgba(157, 198, 255, 0.7);
}

.systemText {
  margin-top: 34px;
  min-height: 24px;

  color: #cfd6de;
  font-size: 14px;
  letter-spacing: 0.08em;
}

.cursor {
  animation: blink 1s infinite;
}

@keyframes blink {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

@media (max-width: 640px) {
  .title {
    font-size: 54px;
  }

  .subtitle {
    font-size: 15px;
  }
}
</style>