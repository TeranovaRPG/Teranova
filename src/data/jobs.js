export const jobSpecializations = {
  strategy: [
    { id: 'ceo_candidate', name: '경영후보자', title: '경영후보자' },
    { id: 'strategy_planner', name: '전략기획자', title: '전략기획자' },
    { id: 'project_manager', name: '프로젝트매니저', title: '프로젝트매니저' },
    { id: 'business_developer', name: '사업개발담당', title: '사업개발담당' },
    { id: 'executive_secretary', name: '임원비서', title: '임원비서' }
  ],

  finance: [
    { id: 'accountant', name: '회계담당', title: '회계담당' },
    { id: 'finance_manager', name: '재무관리자', title: '재무관리자' },
    { id: 'tax_manager', name: '세무담당', title: '세무담당' },
    { id: 'investment_analyst', name: '투자분석가', title: '투자분석가' },
    { id: 'asset_manager', name: '자산관리자', title: '자산관리자' }
  ],

  hr: [
    { id: 'hr_manager', name: '인사담당', title: '인사담당' },
    { id: 'recruiter', name: '채용담당', title: '채용담당' },
    { id: 'training_manager', name: '교육담당', title: '교육담당' },
    { id: 'labor_manager', name: '노무관리자', title: '노무관리자' },
    { id: 'general_affairs', name: '총무담당', title: '총무담당' }
  ],

  broadcast: [
    { id: 'announcer', name: '아나운서', title: '아나운서' },
    { id: 'actor', name: '배우', title: '배우' },
    { id: 'entertainer', name: '예능인', title: '예능인' },
    { id: 'streamer', name: '스트리머', title: '스트리머' },
    { id: 'producer', name: '프로듀서', title: '방송 프로듀서' },
    { id: 'reporter', name: '기자', title: '기자' },
    { id: 'writer', name: '방송작가', title: '방송작가' },
    { id: 'singer', name: '가수', title: '가수' }
  ],

  construction: [
    { id: 'site_manager', name: '현장관리자', title: '현장관리자' },
    { id: 'architect', name: '설계사', title: '설계사' },
    { id: 'safety_manager', name: '안전관리자', title: '안전관리자' },
    { id: 'equipment_operator', name: '중장비기사', title: '중장비기사' },
    { id: 'civil_engineer', name: '토목기술자', title: '토목기술자' },
    { id: 'urban_planner', name: '도시계획가', title: '도시계획가' }
  ],

  transport: [
    { id: 'bus_driver', name: '버스기사', title: '버스기사' },
    { id: 'train_operator', name: '기관사', title: '기관사' },
    { id: 'logistics_driver', name: '물류기사', title: '물류기사' },
    { id: 'traffic_controller', name: '교통관제사', title: '교통관제사' },
    { id: 'dispatcher', name: '배차관리자', title: '배차관리자' },
    { id: 'airline_pilot', name: '항공조종사', title: '항공조종사' }
  ],

  tech: [
    { id: 'programmer', name: '프로그래머', title: '프로그래머' },
    { id: 'server_engineer', name: '서버엔지니어', title: '서버엔지니어' },
    { id: 'data_analyst', name: '데이터분석가', title: '데이터분석가' },
    { id: 'security_expert', name: '보안전문가', title: '보안전문가' },
    { id: 'ai_researcher', name: 'AI연구원', title: 'AI연구원' },
    { id: 'game_developer', name: '게임개발자', title: '게임개발자' }
  ],

  medical: [
    { id: 'doctor', name: '의사', title: '의사' },
    { id: 'nurse', name: '간호사', title: '간호사' },
    { id: 'pharmacist', name: '약사', title: '약사' },
    { id: 'paramedic', name: '응급구조사', title: '응급구조사' },
    { id: 'counselor', name: '심리상담사', title: '심리상담사' },
    { id: 'social_worker', name: '사회복지사', title: '사회복지사' }
  ],

  education: [
    { id: 'teacher', name: '교사', title: '교사' },
    { id: 'professor', name: '교수', title: '교수' },
    { id: 'researcher', name: '연구원', title: '연구원' },
    { id: 'training_instructor', name: '훈련교관', title: '훈련교관' },
    { id: 'curriculum_planner', name: '교육기획자', title: '교육기획자' }
  ],

  safety: [
    { id: 'police_officer', name: '경찰', title: '경찰' },
    { id: 'firefighter', name: '소방관', title: '소방관' },
    { id: 'security_guard', name: '보안요원', title: '보안요원' },
    { id: 'bodyguard', name: '경호원', title: '경호원' },
    { id: 'disaster_manager', name: '재난관리자', title: '재난관리자' }
  ],

  service: [
    { id: 'store_manager', name: '점장', title: '점장' },
    { id: 'barista', name: '바리스타', title: '바리스타' },
    { id: 'chef', name: '셰프', title: '셰프' },
    { id: 'hotelier', name: '호텔리어', title: '호텔리어' },
    { id: 'customer_manager', name: '고객관리자', title: '고객관리자' }
  ],

  industry: [
    { id: 'production_manager', name: '생산관리자', title: '생산관리자' },
    { id: 'mechanic', name: '기계기사', title: '기계기사' },
    { id: 'factory_manager', name: '공장관리자', title: '공장관리자' },
    { id: 'quality_manager', name: '품질관리자', title: '품질관리자' },
    { id: 'process_engineer', name: '공정기술자', title: '공정기술자' }
  ]
}

export function getSpecializationName(field, specializationId) {
  const list = jobSpecializations[field] || []
  const found = list.find((item) => item.id === specializationId)

  return found?.name || '미지정'
}

export function getSpecializationTitle(field, specializationId) {
  const list = jobSpecializations[field] || []
  const found = list.find((item) => item.id === specializationId)

  return found?.title || getSpecializationName(field, specializationId)
}