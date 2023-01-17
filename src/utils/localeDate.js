import i18n from '@/plugins/i18n.js'

const sampleDate = i18n.d(new Date('2019-12-21'), 'digit')

const oprator = sampleDate.match(/\W/g)[0]
const hint = sampleDate.replace(/12|21|2019/gi, (matched) => {
  return { 12: 'MM', 21: 'DD', 2019: 'YYYY' }[matched]
})
const mask = sampleDate.replace(/12|21|2019/gi, (matched) => {
  return { 12: 'm', 21: 'd', 2019: 'Y' }[matched]
}).split('/')

const parseDate = (date) => {
  if (!date) return
  const indexOfFormat = (format) => {
    return hint.split(oprator).map((item) => item.trim()).indexOf(format)
  }
  const splitDate = date.split(oprator).map((item) => item.trim())
  return `${splitDate[indexOfFormat('YYYY')]}-${splitDate[indexOfFormat('MM')]}-${splitDate[indexOfFormat('DD')]}`
}

export {
  mask,
  oprator,
  hint,
  parseDate
}
