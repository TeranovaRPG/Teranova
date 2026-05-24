export const fields = {
  strategy: { id: 'strategy', name: '경영/전략', shortName: '경영' },
  finance: { id: 'finance', name: '재무/금융', shortName: '재무' },
  hr: { id: 'hr', name: '행정/인사', shortName: '인사' },
  broadcast: { id: 'broadcast', name: '방송/문화', shortName: '방송' },
  construction: { id: 'construction', name: '건설/도시개발', shortName: '건설' },
  transport: { id: 'transport', name: '교통/물류', shortName: '교통' },
  tech: { id: 'tech', name: '기술/IT', shortName: '기술' },
  medical: { id: 'medical', name: '의료/복지', shortName: '의료' },
  education: { id: 'education', name: '교육/연구', shortName: '교육' },
  safety: { id: 'safety', name: '치안/안전', shortName: '안전' },
  service: { id: 'service', name: '상업/서비스', shortName: '서비스' },
  industry: { id: 'industry', name: '제조/산업', shortName: '산업' }
}

export const fieldIds = Object.keys(fields)

export function getFieldName(fieldId) {
  return fields[fieldId]?.name || '미지정'
}

export function getFieldShortName(fieldId) {
  return fields[fieldId]?.shortName || '미정'
}