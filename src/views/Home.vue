<template>
  <div class="home">
    <div class="overlay"></div>

    <div class="container">
      <h1 class="title">TERANOVA</h1>

      <p class="statusText">메타버스 진입 완료.</p>
      <p class="missionText">최초 임무 대기중</p>

      <div class="missionList">
        <button class="missionCard" @click="toggleMission(0)">
          <span class="missionLabel">최초 임무 01</span>
          <strong class="missionTitle">환경 스캔</strong>
          <span class="missionTime">
            남은 시간 : {{ formatTime(missions[0].timeLeft) }}
          </span>
          <span class="missionState">
            {{ getMissionStateText(missions[0]) }}
          </span>
        </button>

        <button class="missionCard" @click="toggleMission(1)">
          <span class="missionLabel">최초 임무 02</span>
          <strong class="missionTitle">기초 연결 확인</strong>
          <span class="missionTime">
            남은 시간 : {{ formatTime(missions[1].timeLeft) }}
          </span>
          <span class="missionState">
            {{ getMissionStateText(missions[1]) }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onBeforeUnmount } from 'vue'

const missions = reactive([
  {
    id: 1,
    title: '환경 스캔',
    duration: 120,
    timeLeft: 120,
    isRunning: false,
    isCompleted: false,
    intervalId: null,
  },
  {
    id: 2,
    title: '기초 연결 확인',
    duration: 120,
    timeLeft: 120,
    isRunning: false,
    isCompleted: false,
    intervalId: null,
  },
])

function toggleMission(index) {
  const mission = missions[index]

  if (mission.isCompleted) {
    return
  }

  if (mission.isRunning) {
    stopMission(mission)
    return
  }

  startMission(mission)
}

function startMission(mission) {
  if (mission.isCompleted || mission.isRunning) {
    return
  }

  mission.isRunning = true

  mission.intervalId = setInterval(() => {
    if (mission.timeLeft > 0) {
      mission.timeLeft -= 1
    }

    if (mission.timeLeft <= 0) {
      mission.timeLeft = 0
      mission.isRunning = false
      mission.isCompleted = true

      clearInterval(mission.intervalId)
      mission.intervalId = null
    }
  }, 1000)
}

function stopMission(mission) {
  mission.isRunning = false

  clearInterval(mission.intervalId)
  mission.intervalId = null
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainSeconds = seconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(remainSeconds).padStart(2, '0')}`
}

function getMissionStateText(mission) {
  if (mission.isCompleted) {
    return '완료'
  }

  if (mission.isRunning) {
    return '진행중'
  }

  return '대기중'
}

onBeforeUnmount(() => {
  missions.forEach((mission) => {
    if (mission.intervalId) {
      clearInterval(mission.intervalId)
      mission.intervalId = null
    }
  })
})
</script>

<style scoped>
.home {
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  background-image: url("/start-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(6, 10, 18, 0.76);
}

.container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 860px;
  padding: 40px 24px;
  text-align: center;
}

.title {
  margin: 0 0 24px;
  color: #f4f7fb;
  font-size: clamp(46px, 8vw, 92px);
  font-weight: 800;
  letter-spacing: 0.2em;
  text-indent: 0.2em;
  text-transform: uppercase;
  text-shadow:
    0 0 12px rgba(180, 220, 255, 0.12),
    0 3px 12px rgba(0, 0, 0, 0.5),
    0 10px 36px rgba(0, 0, 0, 0.45);
}

.statusText {
  margin: 0 0 10px;
  color: #d7e4f1;
  font-size: 18px;
  letter-spacing: 0.08em;
}

.missionText {
  margin: 0 0 34px;
  color: #9fb5ce;
  font-size: 15px;
  letter-spacing: 0.16em;
}

.missionList {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.missionCard {
  width: min(460px, 88vw);
  padding: 20px 22px;
  border: 1px solid rgba(210, 230, 255, 0.2);
  background:
    linear-gradient(
      to bottom,
      rgba(34, 59, 96, 0.92),
      rgba(17, 31, 54, 0.96)
    );
  color: #f7fbff;
  text-align: center;
  cursor: pointer;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.22),
    0 0 18px rgba(80, 140, 255, 0.08);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.missionCard:hover {
  transform: translateY(-2px);
  border-color: rgba(220, 235, 255, 0.4);
  background:
    linear-gradient(
      to bottom,
      rgba(45, 79, 129, 0.96),
      rgba(22, 41, 71, 0.98)
    );
  box-shadow:
    0 14px 34px rgba(0, 0, 0, 0.28),
    0 0 20px rgba(95, 160, 255, 0.14);
}

.missionLabel {
  display: block;
  margin-bottom: 8px;
  color: #9bb7d7;
  font-size: 12px;
  letter-spacing: 0.18em;
}

.missionTitle {
  display: block;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.missionTime {
  display: block;
  color: #d0dceb;
  font-size: 14px;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}

.missionState {
  display: block;
  color: #8fc0ff;
  font-size: 13px;
  letter-spacing: 0.08em;
}

@media (max-width: 640px) {
  .container {
    padding: 32px 18px;
  }

  .statusText {
    font-size: 16px;
  }

  .missionText {
    font-size: 14px;
    margin-bottom: 28px;
  }

  .missionCard {
    padding: 18px 16px;
  }

  .missionTitle {
    font-size: 20px;
  }
}
</style>