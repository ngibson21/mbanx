import i18n from '@/plugins/i18n.js'

const randomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

const randomHexColors = (size) => {
  const colors = []
  for (let i = 0; i < size; i++) {
    colors.push(randomHexColor())
  }
  return colors
}

const getPagedData = (data, page, limit) => {
  if (!data) return []

  if (!page && !limit) return data

  const startIndex = (page - 1) * limit
  const endIndex = Math.min(startIndex + limit - 1, data.length - 1)

  return data.slice(startIndex, endIndex + 1)
}

// to work around search date filter from core
const addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result.toISOString().replace('Z', '')
}

const errorMessages = (errorCode) => {
  let errorType = ''
  switch (true) {
    case !!errorCode.match(/PASSWORD_NOT_MATCH/):
      errorType = 'notMatch'
      break
    case !!errorCode.match(/INVALID_TOKEN/):
      errorType = 'invalidToken'
      break
    case !!errorCode.match(/TOKEN_EXPIRED/):
      errorType = 'tokenExpired'
      break
    case !!errorCode.match(/NEW_PASSWORD_MUST_BE_DIFFERENT/):
      errorType = 'differentNewPassword'
      break
    default: errorType = 'error'
  }
  return i18n.t(`views.errorCodes.${errorType}`)
}

const clearLocalStorage = () => {
  const darkMode = localStorage.getItem('darkMode')
  localStorage.clear()
  localStorage.setItem('darkMode', darkMode)
}

const getFullMaskedPan = (pan) => {
  return pan?.slice(-4).padStart(pan.length, '\u2022').replace(/(.{4})/g, '$1 ')
}

const getShortMaskedPan = (pan) => {
  return pan?.slice(-4).padStart(8, '\u2022').replace(/(.{4})/g, '$1 ')
}

const splitTransferIdentifier = (identifier) => {
  if (identifier?.includes('ACCOUNT')) {
    return {
      accountNumber: identifier.split(':')[1],
      sortCode: process.env.VUE_APP_BANK_CODE || ''
    }
  } else if (identifier?.includes('SWIFT') || identifier?.includes('ACH') || identifier?.includes('WIRE')) {
    return {
      accountNumber: identifier.split('/')[3],
      sortCode: identifier.split('/')[2]
    }
  } else {
    return {
      accountNumber: '',
      sortCode: ''
    }
  }
}

// used to transform the json to x-www-form-urlencoded
// without using extra npm packages like 'qs'
const transformRequest = (jsonData = {}) =>
  Object.entries(jsonData)
    .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join('&')

export {
  randomHexColor,
  randomHexColors,
  addDays,
  getPagedData,
  errorMessages,
  clearLocalStorage,
  getFullMaskedPan,
  getShortMaskedPan,
  splitTransferIdentifier,
  transformRequest
}
