/*
|--------------------------------------------------------------------------
| 유입 기본 적응 임무
|--------------------------------------------------------------------------
*/

export const incomingMissions = [
  { id: 'incoming_basic_1', name: '도시 생활 적응' },
  { id: 'incoming_basic_2', name: '기초 생활 훈련' },
  { id: 'incoming_basic_3', name: '사회 환경 적응' },
  { id: 'incoming_basic_4', name: '기초 업무 이해' },
  { id: 'incoming_basic_5', name: '현장 관찰 과정' }
]

/*
|--------------------------------------------------------------------------
| 분야 적응 임무
|--------------------------------------------------------------------------
*/

export const incomingFieldMissions = [
  // 경영/전략
  {
    id: 'incoming_strategy_1',
    name: '사업 흐름 관찰',
    field: 'strategy'
  },
  {
    id: 'incoming_strategy_2',
    name: '프로젝트 구조 분석',
    field: 'strategy'
  },

  // 재무/금융
  {
    id: 'incoming_finance_1',
    name: '재무 자료 정리',
    field: 'finance'
  },
  {
    id: 'incoming_finance_2',
    name: '예산 흐름 관찰',
    field: 'finance'
  },

  // 행정/인사
  {
    id: 'incoming_hr_1',
    name: '조직 구조 적응',
    field: 'hr'
  },
  {
    id: 'incoming_hr_2',
    name: '행정 흐름 이해',
    field: 'hr'
  },

  // 방송/문화
  {
    id: 'incoming_broadcast_1',
    name: '촬영 현장 견학',
    field: 'broadcast'
  },
  {
    id: 'incoming_broadcast_2',
    name: '콘텐츠 흐름 관찰',
    field: 'broadcast'
  },

  // 건설/도시개발
  {
    id: 'incoming_construction_1',
    name: '건설 현장 견학',
    field: 'construction'
  },
  {
    id: 'incoming_construction_2',
    name: '시설 구조 분석',
    field: 'construction'
  },

  // 교통/물류
  {
    id: 'incoming_transport_1',
    name: '교통 흐름 관찰',
    field: 'transport'
  },
  {
    id: 'incoming_transport_2',
    name: '운행 시스템 적응',
    field: 'transport'
  },

  // 기술/IT
  {
    id: 'incoming_tech_1',
    name: '시스템 구조 분석',
    field: 'tech'
  },
  {
    id: 'incoming_tech_2',
    name: '장비 운용 기초',
    field: 'tech'
  },

  // 의료/복지
  {
    id: 'incoming_medical_1',
    name: '병원 업무 견학',
    field: 'medical'
  },
  {
    id: 'incoming_medical_2',
    name: '응급 흐름 이해',
    field: 'medical'
  },

  // 교육/연구
  {
    id: 'incoming_education_1',
    name: '교육 과정 관찰',
    field: 'education'
  },
  {
    id: 'incoming_education_2',
    name: '연구 자료 정리',
    field: 'education'
  },

  // 치안/안전
  {
    id: 'incoming_safety_1',
    name: '안전 시스템 견학',
    field: 'safety'
  },
  {
    id: 'incoming_safety_2',
    name: '비상 대응 적응',
    field: 'safety'
  },

  // 상업/서비스
  {
    id: 'incoming_service_1',
    name: '고객 응대 훈련',
    field: 'service'
  },
  {
    id: 'incoming_service_2',
    name: '서비스 흐름 적응',
    field: 'service'
  },

  // 제조/산업
  {
    id: 'incoming_industry_1',
    name: '생산 라인 견학',
    field: 'industry'
  },
  {
    id: 'incoming_industry_2',
    name: '공정 흐름 분석',
    field: 'industry'
  }
]

/*
|--------------------------------------------------------------------------
| 견습 임무
|--------------------------------------------------------------------------
*/

export const apprenticeMissions = [
  // 경영/전략
  {
    id: 'app_strategy_1',
    name: '사업 보고서 정리',
    field: 'strategy'
  },
  {
    id: 'app_strategy_2',
    name: '프로젝트 회의 지원',
    field: 'strategy'
  },

  // 재무/금융
  {
    id: 'app_finance_1',
    name: '예산 자료 정리',
    field: 'finance'
  },
  {
    id: 'app_finance_2',
    name: '회계 흐름 검토',
    field: 'finance'
  },

  // 행정/인사
  {
    id: 'app_hr_1',
    name: '채용 자료 정리',
    field: 'hr'
  },
  {
    id: 'app_hr_2',
    name: '인사 기록 관리',
    field: 'hr'
  },

  // 방송/문화
  {
    id: 'app_broadcast_1',
    name: '촬영 지원',
    field: 'broadcast'
  },
  {
    id: 'app_broadcast_2',
    name: '콘텐츠 제작 지원',
    field: 'broadcast'
  },

  // 건설/도시개발
  {
    id: 'app_construction_1',
    name: '현장 관리 지원',
    field: 'construction'
  },
  {
    id: 'app_construction_2',
    name: '시설 점검 보조',
    field: 'construction'
  },

  // 교통/물류
  {
    id: 'app_transport_1',
    name: '배차 운영 보조',
    field: 'transport'
  },
  {
    id: 'app_transport_2',
    name: '운행 흐름 정리',
    field: 'transport'
  },

  // 기술/IT
  {
    id: 'app_tech_1',
    name: '시스템 점검 보조',
    field: 'tech'
  },
  {
    id: 'app_tech_2',
    name: '데이터 정리 지원',
    field: 'tech'
  },

  // 의료/복지
  {
    id: 'app_medical_1',
    name: '진료 보조',
    field: 'medical'
  },
  {
    id: 'app_medical_2',
    name: '의약품 정리',
    field: 'medical'
  },

  // 교육/연구
  {
    id: 'app_education_1',
    name: '교육 자료 준비',
    field: 'education'
  },
  {
    id: 'app_education_2',
    name: '연구 데이터 정리',
    field: 'education'
  },

  // 치안/안전
  {
    id: 'app_safety_1',
    name: '순찰 지원',
    field: 'safety'
  },
  {
    id: 'app_safety_2',
    name: '안전 장비 점검',
    field: 'safety'
  },

  // 상업/서비스
  {
    id: 'app_service_1',
    name: '매장 운영 보조',
    field: 'service'
  },
  {
    id: 'app_service_2',
    name: '고객 응대 지원',
    field: 'service'
  },

  // 제조/산업
  {
    id: 'app_industry_1',
    name: '생산 라인 지원',
    field: 'industry'
  },
  {
    id: 'app_industry_2',
    name: '품질 검사 보조',
    field: 'industry'
  }
]

export const specializationMissionPools = {
  ceo_candidate: [
    '경영 보고 검토',
    '도시 운영 방향 정리',
    '부서별 현황 확인',
    '임원 회의 준비',
    '핵심 프로젝트 검토'
  ],

  strategy_planner: [
    '사업 전략 수립',
    '시장 자료 분석',
    '도시 성장안 작성',
    '프로젝트 우선순위 검토',
    '장기 계획 보고'
  ],

  project_manager: [
    '프로젝트 일정 관리',
    '업무 진행률 점검',
    '부서 간 일정 조율',
    '리스크 항목 정리',
    '성과 보고서 작성'
  ],

  business_developer: [
    '신규 사업 검토',
    '협력사 후보 조사',
    '사업 제안서 작성',
    '시장 진입 전략 수립',
    '수익 모델 검토'
  ],

  executive_secretary: [
    '임원 일정 관리',
    '회의 자료 준비',
    '긴급 연락 조율',
    '보고서 정리',
    '방문자 응대'
  ],

  accountant: [
    '회계 장부 정리',
    '지출 내역 확인',
    '정산 자료 작성',
    '월별 비용 검토',
    '회계 오류 점검'
  ],

  finance_manager: [
    '예산 검토',
    '수익 보고서 작성',
    '재무 리스크 확인',
    '투자 계획 검토',
    '자금 흐름 분석'
  ],

  tax_manager: [
    '세무 자료 검토',
    '신고 항목 정리',
    '세금 리스크 확인',
    '증빙 자료 정리',
    '세무 보고 작성'
  ],

  investment_analyst: [
    '투자 대상 분석',
    '시장 변동 확인',
    '수익률 예측',
    '투자 보고서 작성',
    '리스크 평가'
  ],

  asset_manager: [
    '자산 현황 정리',
    '보유 자산 평가',
    '운용 계획 수립',
    '자산 배분 검토',
    '손익 구조 확인'
  ],

  hr_manager: [
    '인력 배치 검토',
    '근무 기록 확인',
    '조직 분위기 점검',
    '평가 자료 작성',
    '직원 면담 준비'
  ],

  recruiter: [
    '채용 후보 검토',
    '면접 일정 정리',
    '채용 공고 작성',
    '지원자 자료 확인',
    '합격자 명단 정리'
  ],

  training_manager: [
    '교육 과정 설계',
    '훈련 자료 준비',
    '신입 교육 진행',
    '교육 성과 확인',
    '훈련 일정 조율'
  ],

  labor_manager: [
    '근무 조건 검토',
    '노무 이슈 확인',
    '계약 자료 정리',
    '근태 기록 점검',
    '규정 준수 확인'
  ],

  general_affairs: [
    '사무 환경 점검',
    '비품 관리',
    '내부 문서 정리',
    '시설 요청 처리',
    '행정 지원'
  ],

  announcer: [
    '뉴스 원고 리딩',
    '긴급 속보 전달',
    '행사 진행 리허설',
    '발음 교정 훈련',
    '인터뷰 진행'
  ],

  actor: [
    '대본 리딩',
    '감정 연기 훈련',
    '촬영 리허설',
    '현장 동선 연습',
    '캐릭터 분석'
  ],

  entertainer: [
    '예능 녹화 참여',
    '리액션 훈련',
    '게임 코너 적응',
    '애드리브 훈련',
    '패널 토론 참여'
  ],

  streamer: [
    '라이브 방송 진행',
    '시청자 소통',
    '콘텐츠 기획',
    '방송 장비 점검',
    '클립 분석'
  ],

  producer: [
    '프로그램 기획',
    '촬영 일정 조율',
    '출연진 섭외',
    '편집 방향 검토',
    '제작 회의 진행'
  ],

  reporter: [
    '현장 취재',
    '기사 초안 작성',
    '인터뷰 자료 정리',
    '팩트 체크',
    '브리핑 준비'
  ],

  writer: [
    '대본 초안 작성',
    '구성안 정리',
    '캐릭터 설정 작성',
    '회의 내용 반영',
    '최종 원고 수정'
  ],

  singer: [
    '보컬 트레이닝',
    '녹음 리허설',
    '무대 동선 연습',
    '신곡 콘셉트 회의',
    '라이브 공연 준비'
  ],

  site_manager: [
    '현장 인력 배치',
    '공정 회의',
    '작업 진척 확인',
    '자재 반입 확인',
    '현장 문제 보고'
  ],

  architect: [
    '도면 검토',
    '구조 설계',
    '공간 설계',
    '수정안 작성',
    '설계 보고서 작성'
  ],

  safety_manager: [
    '안전 점검',
    '위험 구역 확인',
    '안전 교육 진행',
    '보호장비 점검',
    '사고 예방 보고'
  ],

  equipment_operator: [
    '중장비 운용',
    '토목 작업 지원',
    '장비 점검',
    '현장 이동 지원',
    '정비 요청 보고'
  ],

  civil_engineer: [
    '지반 상태 확인',
    '토목 구조 검토',
    '측량 자료 정리',
    '기초 공사 검토',
    '현장 기술 지원'
  ],

  urban_planner: [
    '도시 구조 검토',
    '개발 구역 분석',
    '교통망 배치 검토',
    '생활권 계획 작성',
    '도시 성장 보고'
  ],

  bus_driver: [
    '노선 운행',
    '승객 안전 확인',
    '배차 시간 준수',
    '차량 상태 점검',
    '운행 기록 작성'
  ],

  train_operator: [
    '열차 운행',
    '신호 확인',
    '정차 위치 확인',
    '비상 대응 훈련',
    '운행 기록 점검'
  ],

  logistics_driver: [
    '화물 운송',
    '배송 경로 확인',
    '상하차 지원',
    '긴급 배송 대응',
    '운송 기록 작성'
  ],

  traffic_controller: [
    '교통 흐름 관제',
    '혼잡 구간 조정',
    '사고 상황 대응',
    '운행 정보 전달',
    '관제 기록 정리'
  ],

  dispatcher: [
    '배차표 작성',
    '운행 인력 배정',
    '차량 회전율 확인',
    '지연 운행 조정',
    '대체 차량 배정'
  ],

  airline_pilot: [
    '비행 전 점검',
    '항로 확인',
    '이착륙 절차 수행',
    '기상 정보 확인',
    '비상 대응 훈련'
  ],

  programmer: [
    '기능 코드 작성',
    '버그 수정',
    '코드 리뷰',
    '프로토타입 개발',
    '배포 전 점검'
  ],

  server_engineer: [
    '서버 상태 점검',
    'API 응답 확인',
    '배포 환경 관리',
    '장애 원인 분석',
    '로그 모니터링'
  ],

  data_analyst: [
    '데이터 정리',
    '통계 보고서 작성',
    '이상 수치 분석',
    '대시보드 검토',
    '사용 패턴 분석'
  ],

  security_expert: [
    '보안 취약점 점검',
    '접근 권한 검토',
    '침입 기록 분석',
    '보안 정책 정리',
    '위험 대응 훈련'
  ],

  ai_researcher: [
    '모델 실험',
    '학습 데이터 검토',
    '성능 지표 분석',
    'AI 기능 설계',
    '연구 보고서 작성'
  ],

  game_developer: [
    '게임 시스템 구현',
    '밸런스 테스트',
    '콘텐츠 구조 설계',
    '버그 수정',
    '플레이 로그 분석'
  ],

  doctor: [
    '진료 수행',
    '환자 상태 확인',
    '검사 결과 검토',
    '치료 계획 작성',
    '응급 대응'
  ],

  nurse: [
    '환자 케어',
    '투약 확인',
    '병동 상태 점검',
    '응급 호출 대응',
    '간호 기록 작성'
  ],

  pharmacist: [
    '처방 검토',
    '의약품 조제',
    '약품 재고 확인',
    '복약 안내',
    '약물 상호작용 확인'
  ],

  paramedic: [
    '응급 출동',
    '현장 응급 처치',
    '환자 이송',
    '장비 점검',
    '응급 기록 작성'
  ],

  counselor: [
    '심리 상담',
    '상담 기록 정리',
    '스트레스 진단',
    '회복 계획 작성',
    '정서 지원'
  ],

  social_worker: [
    '복지 대상 상담',
    '지원 계획 수립',
    '생활 상태 확인',
    '기관 연계',
    '복지 보고서 작성'
  ],

  teacher: [
    '수업 준비',
    '학생 지도',
    '학습 자료 작성',
    '평가 자료 정리',
    '상담 기록 작성'
  ],

  professor: [
    '강의 진행',
    '연구 지도',
    '논문 검토',
    '세미나 준비',
    '학술 자료 정리'
  ],

  researcher: [
    '연구 설계',
    '실험 자료 분석',
    '논문 초안 작성',
    '자료 수집',
    '연구 결과 보고'
  ],

  training_instructor: [
    '훈련 과정 진행',
    '실습 지도',
    '능력 평가',
    '훈련 계획 수정',
    '현장 교육'
  ],

  curriculum_planner: [
    '교육 과정 설계',
    '학습 목표 정리',
    '교육 자료 검토',
    '훈련 체계 개선',
    '교육 성과 분석'
  ],

  police_officer: [
    '순찰 근무',
    '신고 대응',
    '현장 조사',
    '질서 유지',
    '상황 보고'
  ],

  firefighter: [
    '화재 출동',
    '구조 활동',
    '장비 점검',
    '재난 대응 훈련',
    '위험 지역 확인'
  ],

  security_guard: [
    '시설 순찰',
    '출입 관리',
    'CCTV 확인',
    '이상 상황 보고',
    '보안 점검'
  ],

  bodyguard: [
    '경호 동선 확인',
    '위험 요소 분석',
    '근접 보호',
    '이동 경호',
    '비상 대응'
  ],

  disaster_manager: [
    '재난 대응 계획',
    '위험 구역 점검',
    '대피 훈련 준비',
    '비상 물자 확인',
    '상황 보고 체계 점검'
  ],

  store_manager: [
    '매장 운영',
    '재고 확인',
    '직원 배치',
    '매출 정리',
    '고객 응대 관리'
  ],

  barista: [
    '음료 제조',
    '원두 상태 확인',
    '고객 응대',
    '매장 정리',
    '신메뉴 테스트'
  ],

  chef: [
    '메뉴 조리',
    '재료 손질',
    '주방 위생 점검',
    '신메뉴 개발',
    '조리 동선 정리'
  ],

  hotelier: [
    '객실 관리',
    '고객 체크인',
    '예약 확인',
    '서비스 요청 처리',
    '시설 상태 점검'
  ],

  customer_manager: [
    '고객 상담',
    '불만 접수 처리',
    '서비스 품질 점검',
    '고객 데이터 정리',
    '만족도 조사'
  ],

  production_manager: [
    '생산 일정 관리',
    '공정 상태 확인',
    '생산량 보고',
    '인력 배치',
    '설비 점검'
  ],

  mechanic: [
    '기계 정비',
    '부품 교체',
    '장비 상태 점검',
    '고장 원인 분석',
    '정비 기록 작성'
  ],

  factory_manager: [
    '공장 운영 관리',
    '생산 라인 조율',
    '작업자 배치',
    '설비 가동률 확인',
    '운영 보고서 작성'
  ],

  quality_manager: [
    '품질 검사',
    '불량 원인 분석',
    '검수 기준 정리',
    '개선안 작성',
    '품질 보고'
  ],

  process_engineer: [
    '공정 개선',
    '작업 흐름 분석',
    '효율 지표 확인',
    '생산 방식 테스트',
    '개선 보고서 작성'
  ]
}