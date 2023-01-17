import store from '@/store/index.js'

const { mainCurrency } = store.state.application.settings.general

const sampleNumber = (currencyCode = mainCurrency) => {
  const num = 1000.5555
  return num.toLocaleString(store.state.user.locale, {
    style: 'currency',
    currency: currencyCode
  })
}

const getDecimal = (currencyCode = mainCurrency) => {
  return sampleNumber(currencyCode).split('1')[1].substring(4, 5)
}
const getPrecision = (currencyCode = mainCurrency) => {
  const currencyNumber = sampleNumber(currencyCode).split(getDecimal(currencyCode))
  const decimalNum = currencyNumber[1].split(' ')
  return decimalNum[0].length
}
const getThousands = (currencyCode = mainCurrency) => {
  return sampleNumber(currencyCode).split('1')[1].substring(0, 1)
}

const getCurrencySymbol = (currencyCode = mainCurrency) => {
  return sampleNumber(currencyCode).replace(/[\d., ]/g, '')
}

export {
  sampleNumber,
  getDecimal,
  getThousands,
  getPrecision,
  getCurrencySymbol
}
