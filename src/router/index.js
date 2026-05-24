import { createRouter, createWebHashHistory } from 'vue-router'

import Start from '../views/Start.vue'
import Home from '../views/Home.vue'
import CharacterCreate from '../views/CharacterCreate.vue'
import GamePlay from '../views/GamePlay.vue'
import IncomingNpcs from '../views/IncomingNpcs.vue'
import CandidateNpcs from '../views/CandidateNpcs.vue'
import RegularNpcs from '../views/RegularNpcs.vue'
import FamilyNpcs from '../views/FamilyNpcs.vue'

const routes = [
  {
    path: '/',
    name: 'start',
    component: Start
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/character-create',
    name: 'characterCreate',
    component: CharacterCreate
  },
  {
    path: '/play',
    name: 'gamePlay',
    component: GamePlay
  },
  {
    path: '/incoming',
    name: 'incomingNpcs',
    component: IncomingNpcs
  },
  {
    path: '/candidates',
    name: 'candidateNpcs',
    component: CandidateNpcs
  },
  {
    path: '/regular',
    name: 'regularNpcs',
    component: RegularNpcs
  },
  {
    path: '/family',
    name: 'familyNpcs',
    component: FamilyNpcs
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router