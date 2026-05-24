/*
|--------------------------------------------------------------------------
| 유입 기본 적응 임무
|--------------------------------------------------------------------------
*/

export const incomingMissions = [
  { id: 'incoming_basic_1', name: '도시 시스템 이해' },
  { id: 'incoming_basic_2', name: '기초 업무 관찰' },
  { id: 'incoming_basic_3', name: '운영 구조 적응' },
  { id: 'incoming_basic_4', name: '도시 흐름 파악' },
  { id: 'incoming_basic_5', name: '기초 역할 탐색' }
]

/*
|--------------------------------------------------------------------------
| 분야 적응 임무
|--------------------------------------------------------------------------
*/

export const incomingFieldMissions = [
  { id: 'incoming_strategy_1', name: '도시 방향성 관찰', field: 'strategy' },
  { id: 'incoming_strategy_2', name: '프로젝트 흐름 파악', field: 'strategy' },

  { id: 'incoming_tech_1', name: '시스템 구조 관찰', field: 'tech' },
  { id: 'incoming_tech_2', name: '기능 개발 흐름 이해', field: 'tech' },

  { id: 'incoming_facility_1', name: '시설 구조 관찰', field: 'facility' },
  { id: 'incoming_facility_2', name: '기능 공간 흐름 파악', field: 'facility' },

  { id: 'incoming_operation_1', name: '운영 절차 이해', field: 'operation' },
  { id: 'incoming_operation_2', name: '시스템 관리 흐름 관찰', field: 'operation' },

  { id: 'incoming_broadcast_1', name: '도시 뉴스 흐름 관찰', field: 'broadcast' },
  { id: 'incoming_broadcast_2', name: '방송 기록 구조 이해', field: 'broadcast' }
]

/*
|--------------------------------------------------------------------------
| 견습 임무
|--------------------------------------------------------------------------
*/

export const apprenticeMissions = [
  { id: 'app_strategy_1', name: '기초 기획안 정리', field: 'strategy' },
  { id: 'app_strategy_2', name: '프로젝트 자료 검토', field: 'strategy' },
  { id: 'app_strategy_3', name: '도시 확장 방향 분석', field: 'strategy' },

  { id: 'app_tech_1', name: '기능 구조 점검', field: 'tech' },
  { id: 'app_tech_2', name: '개발 항목 정리', field: 'tech' },
  { id: 'app_tech_3', name: '시스템 개선안 검토', field: 'tech' },

  { id: 'app_facility_1', name: '시설 기능 검토', field: 'facility' },
  { id: 'app_facility_2', name: '공간 해금 조건 정리', field: 'facility' },
  { id: 'app_facility_3', name: '직원 배치 구조 점검', field: 'facility' },

  { id: 'app_operation_1', name: '운영 현황 정리', field: 'operation' },
  { id: 'app_operation_2', name: '시스템 상태 점검', field: 'operation' },
  { id: 'app_operation_3', name: '관리 절차 보조', field: 'operation' },

  { id: 'app_broadcast_1', name: '뉴스 자료 수집 보조', field: 'broadcast' },
  { id: 'app_broadcast_2', name: '공지 문안 정리', field: 'broadcast' },
  { id: 'app_broadcast_3', name: '방송 구성안 보조', field: 'broadcast' }
]

/*
|--------------------------------------------------------------------------
| 직책별 전문 임무
|--------------------------------------------------------------------------
*/

export const specializationMissionPools = {
  strategy_planner: [
    '도시 성장 방향 수립',
    '신규 시스템 기획',
    '운영 우선순위 검토',
    '확장 로드맵 작성',
    '핵심 기능 도입 검토'
  ],

  project_manager: [
    '프로젝트 진행률 점검',
    '기능 개발 일정 정리',
    '부서 간 업무 조율',
    '프로젝트 위험 요소 정리',
    '완료 조건 검토'
  ],

  business_developer: [
    '신규 확장안 검토',
    '도시 기능 연결안 작성',
    '운영 모델 개선',
    '신규 콘텐츠 방향 조사',
    '시스템 확장 가능성 분석'
  ],

  game_developer: [
    '신규 게임 기능 개발',
    '시스템 규칙 구현',
    '밸런스 구조 점검',
    '플레이 흐름 개선',
    '신규 콘텐츠 프로토타입 제작'
  ],

  system_developer: [
    '운영 시스템 개선',
    '저장 구조 점검',
    '동기화 기능 설계',
    '관리 화면 구조 개선',
    '자동화 로직 검토'
  ],

  facility_developer: [
    '신규 시설 기능 오픈',
    '시설 배치 조건 정리',
    '직원 배치 슬롯 검토',
    '시설 활성화 절차 점검',
    '기능 공간 확장안 작성'
  ],

  city_developer: [
    '도시 확장 구역 검토',
    '신규 기능 공간 설계',
    '시설 연결 구조 정리',
    '도시 성장 단계 검토',
    '확장 조건 점검'
  ],

  operation_manager: [
    '도시 운영 현황 점검',
    '진행 중 시스템 관리',
    '직책 배치 상태 확인',
    '운영 흐름 안정화',
    '기능 활성 상태 검토'
  ],

  system_operator: [
    '시스템 상태 모니터링',
    '운영 로그 정리',
    '자동 진행 흐름 점검',
    '오류 상황 확인',
    '관리 절차 유지'
  ],

  reporter: [
    '도시 현황 취재',
    '신규 직원 소식 수집',
    '시설 오픈 정보 확인',
    '프로젝트 진행 상황 취재',
    '도시 이슈 기사 작성'
  ],

  announcer: [
    '도시 뉴스 송출',
    '공지사항 전달',
    '긴급 소식 방송',
    '주요 성과 보도',
    '프로젝트 완료 소식 전달'
  ],

  producer: [
    '뉴스 프로그램 기획',
    '방송 프로젝트 구성',
    '콘텐츠 송출 계획 작성',
    '특집 방송 준비',
    '도시 홍보 콘텐츠 제작'
  ],

  writer: [
    '뉴스 원고 작성',
    '공지 문안 구성',
    '이벤트 스토리 정리',
    '방송 대본 작성',
    '도시 기록문 작성'
  ]
}