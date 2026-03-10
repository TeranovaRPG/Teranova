<template>
  <div class="start">
    <div class="overlay"></div>
    <div class="vignette"></div>

    <div class="content">

      <div class="logoWrap">
        <h1 class="title">TERANOVA</h1>
        <div class="titleLine"></div>
      </div>

      <button class="startButton" @click="startGame">
        START
      </button>

      <p class="systemText">
        {{ typedText }}<span class="cursor">|</span>
      </p>

    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function startGame(){
  router.push('/home')
}

/* 타이핑 문구 */

const text = "도시 기능 손상. 관리자 대기중..."

const typedText = ref("")
let index = 0

function typeEffect(){

  if(index < text.length){

    typedText.value += text[index]
    index++

    setTimeout(typeEffect,40)

  }

}

onMounted(()=>{
  typeEffect()
})

</script>

<style scoped>

.start{

  position:relative;
  min-height:100vh;

  background-image:url("/start-bg.png");
  background-size:cover;
  background-position:center;
  background-repeat:no-repeat;

  display:flex;
  justify-content:center;
  align-items:center;

}

.overlay{

  position:absolute;
  inset:0;

  background:
  linear-gradient(
  to bottom,
  rgba(6,10,18,0.42),
  rgba(8,12,20,0.75)
  );

}

.vignette{

  position:absolute;
  inset:0;

  background:
  radial-gradient(
  circle at center,
  rgba(0,0,0,0) 40%,
  rgba(0,0,0,0.5) 100%
  );

}

.content{

  position:relative;
  text-align:center;

}

.logoWrap{

  margin-bottom:40px;

}

.title{

  margin:0;

  font-size:90px;

  letter-spacing:0.22em;
  text-indent:0.22em;

  color:#f5f7fa;

  text-shadow:
  0 0 12px rgba(180,220,255,0.2),
  0 6px 18px rgba(0,0,0,0.6);

}

.titleLine{

  width:300px;
  height:2px;

  margin:15px auto;

  background:
  linear-gradient(
  to right,
  transparent,
  #9dc6ff,
  transparent
  );

}

.startButton{

  margin-top:20px;

  padding:16px 50px;

  font-size:18px;

  letter-spacing:0.3em;

  background:
  linear-gradient(
  to bottom,
  #3f7bd8,
  #244a86
  );

  border:1px solid rgba(255,255,255,0.2);

  color:white;

  cursor:pointer;

  transition:0.2s;

}

.startButton:hover{

  transform:translateY(-2px);

}

.systemText{

  margin-top:35px;

  font-size:16px;

  color:#cfd6de;

  letter-spacing:0.08em;

  opacity:0.9;

}

.cursor{

  animation:blink 1s infinite;

}

@keyframes blink{

  0%{opacity:0}
  50%{opacity:1}
  100%{opacity:0}

}

</style>