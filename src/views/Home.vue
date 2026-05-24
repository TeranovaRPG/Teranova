<template>
  <div class="home">
    <div class="overlay"></div>

    <main class="panel">
      <header class="header">
        <p class="eyebrow">WORLD SETUP</p>

        <h1 class="title">
          어떤 방식으로 시작할까요?
        </h1>

        <p class="desc">
          TERANOVE는 정해진 스토리를 따라가는 게임이 아닙니다.
          사람을 영입하고, 성장시키고, 세계로 배출하며
          자신만의 도시 흐름을 만들어갑니다.
        </p>
      </header>

      <section class="infoGrid">
        <article class="infoCard">
          <strong>자동 세계</strong>
          <p>
            NPC는 임무와 관계를 통해 자동으로 성장합니다.
            플레이어는 원하는 만큼만 개입하면 됩니다.
          </p>
        </article>

        <article class="infoCard">
          <strong>도시 영향력</strong>
          <p>
            성장한 NPC를 세계로 배출하면 해당 분야 영향력이 증가합니다.
          </p>
        </article>

        <article class="infoCard">
          <strong>중형 해금</strong>
          <p>
            소형 임무 50회 완료 시 커스텀 임무와 더 넓은 운영이 열립니다.
          </p>
        </article>
      </section>

      <div class="actions">
        <button class="mainButton" @click="goCreate">
          새 도시 만들기
        </button>

        <button class="subButton" @click="continueGame">
          이어하기
        </button>

        <button class="backButton" @click="goBack">
          시작 화면으로
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { STORAGE_KEY } from '../data/gameDefaults'

const router = useRouter()

function goCreate() {
  router.push('/character-create')
}

function continueGame() {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    router.push('/character-create')
    return
  }

  router.push('/play')
}

function goBack() {
  router.push('/')
}
</script>

<style scoped>
.home {
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
      rgba(4, 8, 16, 0.58),
      rgba(5, 8, 14, 0.94)
    );
}

.panel {
  position: relative;
  z-index: 1;

  width: min(92vw, 900px);
  padding: 42px 28px;

  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(8, 14, 24, 0.54);
  backdrop-filter: blur(16px);

  text-align: center;

  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.35),
    0 0 30px rgba(80, 140, 255, 0.08);
}

.header {
  margin-bottom: 30px;
}

.eyebrow {
  margin: 0 0 14px;
  color: #9dc6ff;
  font-size: 12px;
  letter-spacing: 0.28em;
}

.title {
  margin: 0 0 18px;
  font-size: clamp(30px, 5vw, 48px);
  letter-spacing: 0.04em;
}

.desc {
  max-width: 660px;
  margin: 0 auto;
  color: #d8e0ea;
  font-size: 16px;
  line-height: 1.8;
}

.infoGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin: 30px 0;
}

.infoCard {
  padding: 22px 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  text-align: left;
}

.infoCard strong {
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
}

.infoCard p {
  margin: 0;
  color: #d8e0ea;
  font-size: 14px;
  line-height: 1.7;
}

.actions {
  width: min(360px, 100%);
  margin: 0 auto;

  display: grid;
  gap: 12px;
}

.mainButton,
.subButton,
.backButton {
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

.subButton,
.backButton {
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: #d8e0ea;
}

.mainButton:hover,
.subButton:hover,
.backButton:hover {
  transform: translateY(-2px);
}

@media (max-width: 760px) {
  .panel {
    padding: 34px 20px;
  }

  .infoGrid {
    grid-template-columns: 1fr;
  }
}
</style>