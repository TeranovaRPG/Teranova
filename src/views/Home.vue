<template>
  <div class="home">

    <div class="overlay"></div>

    <div class="container">

      <h1 class="title">
        TERANOVA
      </h1>

      <p class="subtitle">
        도시 관리 패널
      </p>

      <div class="menu">

        <button class="menuButton">
          도시 진입
        </button>

        <button class="menuButton">
          도시 상태
        </button>

        <button class="menuButton">
          이벤트 로그
        </button>

        <button class="menuButton">
          설정
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
</script>

<style scoped>

.home{

  position:relative;
  min-height:100vh;

  background-image:url("/start-bg.png");
  background-size:cover;
  background-position:center;

  display:flex;
  justify-content:center;
  align-items:center;

}

.overlay{

  position:absolute;
  inset:0;

  background:rgba(5,8,15,0.8);

}

.container{

  position:relative;

  text-align:center;

}

.title{

  font-size:70px;

  letter-spacing:0.2em;

  color:#f0f4ff;

  text-shadow:
  0 0 12px rgba(150,200,255,0.2),
  0 6px 20px rgba(0,0,0,0.6);

}

.subtitle{

  margin-top:10px;

  color:#9fb2cc;

  letter-spacing:0.15em;

  margin-bottom:50px;

}

.menu{

  display:flex;
  flex-direction:column;

  gap:18px;

  align-items:center;

}

.menuButton{

  width:260px;

  padding:14px;

  font-size:18px;

  letter-spacing:0.2em;

  color:white;

  background:
  linear-gradient(
  to bottom,
  #355f9b,
  #203e6b
  );

  border:1px solid rgba(255,255,255,0.15);

  cursor:pointer;

  transition:0.2s;

}

.menuButton:hover{

  transform:translateY(-2px);

  background:
  linear-gradient(
  to bottom,
  #4a7fd0,
  #2b4f8a
  );

}

</style>