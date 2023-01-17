const unformat = (input, precision) => {
  const negative = input.indexOf('-') >= 0 ? -1 : 1
  const numbers = onlyNumbers(input)
  const currency = numbersToCurrency(numbers, precision)
  return parseFloat(currency) * negative
}
const onlyNumbers = (input) => {
  return toStr(input).replace(/\D+/g, '') || '0'
}
const toStr = (value) => {
  return value ? value.toString() : ''
}
const numbersToCurrency = (numbers, precision) => {
  const exp = Math.pow(10, precision)
  const float = parseFloat(numbers) / exp
  return float.toFixed(fixed(precision))
}
const fixed = (precision) => {
  return between(0, precision, 20)
}
const between = (min, n, max) => {
  return Math.max(min, Math.min(n, max))
}

export default unformat
