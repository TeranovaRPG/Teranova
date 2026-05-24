export const jobSpecializations = {
  strategy: [
  { id: 'strategy_planner', name: '전략기획자', title: '전략기획자'},
  { id: 'project_manager', name: '프로젝트매니저', title: '프로젝트매니저'},
  { id: 'business_developer', name: '사업개발담당', title: '사업개발담당'}
  ],

  tech: [
  { id: 'game_developer', name: '게임개발자', title: '게임개발자'},
  { id: 'system_developer', name: '시스템개발자', title: '시스템개발자'}
  ],

  facility: [ 
  { id: 'facility_developer', name: '시설개발자', title: '시설개발자'},
  { id: 'city_developer', name: '도시개발자', title: '도시개발자'}
  ],

  operation: [ 
  { id: 'operation_manager', name: '운영관리자', title: '운영관리자' },
  { id: 'system_operator', name: '시스템관리관', title: '시스템관리관'}
  ],

  broadcast: [
  { id: 'reporter', name: '기자', title: '기자'},
  { id: 'announcer', name: '아나운서', title: '아나운서'},
  { id: 'producer', name: '프로듀서', title: '프로듀서'},
  { id: 'writer', name: '방송작가', title: '방송작가'}
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