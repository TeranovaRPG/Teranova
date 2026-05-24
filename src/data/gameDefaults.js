import { fields, fieldIds } from './fields'

export const STORAGE_KEY = 'teranove_save'

export const AUTO_INCOMING_MS = 10 * 60 * 1000

export const INCOMING_MIN_SECONDS = 60
export const INCOMING_MAX_SECONDS = 300

export const TRAINEE_PASS_SKILL = 10
export const TRAINEE_PASS_RATE = 0.5

export const APPRENTICE_MIN_SECONDS = 10 * 60
export const APPRENTICE_MAX_SECONDS = 30 * 60
export const APPRENTICE_REQUIRED_MISSIONS = 3

export const REGULAR_MIN_SECONDS = 60 * 60
export const REGULAR_MAX_SECONDS = 24 * 60 * 60

export const PREGNANCY_RATE = 0.1

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

export const jobTitles = {
  strategy: '경영 인재',
  finance: '재무 인재',
  hr: '인사 인재',
  broadcast: '방송 인재',
  construction: '건설 인재',
  transport: '교통 인재',
  tech: '기술 인재',
  medical: '의료 인재',
  education: '교육 인재',
  safety: '안전 인재',
  service: '서비스 인재',
  industry: '산업 인재'
}