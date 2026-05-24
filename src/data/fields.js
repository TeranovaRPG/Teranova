export const fields = {
  strategy: {
    id: 'strategy',
    name: '경영/전략',
    shortName: '전략'
  },

  tech: {
    id: 'tech',
    name: '기술/개발',
    shortName: '기술'
  },

  facility: {
    id: 'facility',
    name: '시설/개발',
    shortName: '시설'
  },

  operation: {
    id: 'operation',
    name: '운영/관리',
    shortName: '운영'
  },

  broadcast: {
    id: 'broadcast',
    name: '방송/문화',
    shortName: '방송'
  }
}

export const fieldIds = Object.keys(fields)

export function getFieldName(fieldId) {
  return fields[fieldId]?.name || '미지정'
}

export function getFieldShortName(fieldId) {
  return fields[fieldId]?.shortName || '미정'
}