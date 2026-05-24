import { fields, fieldIds } from './fields'

export const STORAGE_KEY = 'teranove_save'

/*
|--------------------------------------------------------------------------
| 유입 / 성장 시간
|--------------------------------------------------------------------------
*/

export const AUTO_INCOMING_MS = 10 * 60 * 1000

export const INCOMING_MIN_SECONDS = 60
export const INCOMING_MAX_SECONDS = 300

export const TRAINEE_PASS_SKILL = 10

/*
|--------------------------------------------------------------------------
| 견습 단계
|--------------------------------------------------------------------------
*/

export const APPRENTICE_MIN_SECONDS = 10 * 60
export const APPRENTICE_MAX_SECONDS = 30 * 60
export const APPRENTICE_REQUIRED_MISSIONS = 3

/*
|--------------------------------------------------------------------------
| 정규 직책 임무
|--------------------------------------------------------------------------
*/

export const REGULAR_MIN_SECONDS = 60 * 60
export const REGULAR_MAX_SECONDS = 24 * 60 * 60

/*
|--------------------------------------------------------------------------
| 분야 데이터
|--------------------------------------------------------------------------
*/

export const missionFields = fieldIds

export const influenceLabels = Object.fromEntries(
  fieldIds.map((fieldId) => {
    return [fieldId, fields[fieldId].shortName]
  })
)

export const defaultInfluences = Object.fromEntries(
  fieldIds.map((fieldId) => {
    return [fieldId, 0]
  })
)

/*
|--------------------------------------------------------------------------
| 기본 분야 호칭
|--------------------------------------------------------------------------
*/

export const jobTitles = {
  strategy: '전략 인재',
  tech: '기술 인재',
  facility: '시설 인재',
  operation: '운영 인재',
  broadcast: '방송 인재'
}