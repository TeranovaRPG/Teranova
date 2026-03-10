<script setup>
function startGame() {
  alert("게임 시작 - 아직 개발 중");
}
</script>

<template>
  <div class="app">
    <div class="title">
      Teranova
    </div>

    <div class="story">
      <p>수많은 도시와 길이 연결된 세계.</p>
      <p>사람들은 이동하고, 물건을 보내고,</p>
      <p>이야기를 남긴다.</p>

      <p class="highlight">
        오늘 당신의 운송 기록이 시작된다.
      </p>
    </div>

    <button class="startButton" @click="startGame">
      게임 시작
    </button>
  </div>
</template>

<style>
body {
  margin: 0;
  background: #0f172a;
}

.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}

.title {
  font-size: 70px;
  font-weight: bold;
  margin-bottom: 40px;
  letter-spacing: 4px;
}

.story {
  font-size: 20px;
  line-height: 1.8;
}

.highlight {
  margin-top: 25px;
  font-size: 22px;
  color: #38bdf8;
}

.startButton {
  margin-top: 50px;
  padding: 15px 40px;
  font-size: 22px;
  border: none;
  border-radius: 10px;
  background: #38bdf8;
  color: black;
  cursor: pointer;
  transition: 0.2s;
}

.startButton:hover {
  background: #0ea5e9;
}
</style>