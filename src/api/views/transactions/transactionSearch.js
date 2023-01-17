import { withAuth } from '@/api/request.js'
import { addDays } from '@/utils/helpers.js'
import { savingsTransaction, savingsTransactionDetails } from '@/api/fragments/index.js'

const request = withAuth()

export default ({ accounts, page, limit, offset, filters }) => {
  return request({
    data: {
      query: `
        {
          result: SavingsAccountTransactions (
            where: {${dateFilter(filters)} ${savingsFilter(accounts, filters)}}
          ) {
            tx: select {
              id (orderBy: DESC)
              ...savingsTransaction
              ...savingsTransactionDetails
            }
            pages
            total
          }
        }
        ${savingsTransaction}
        ${savingsTransactionDetails}
      `
    }
  })
}

const savingsSearchQuery = (keyword) => {
  if (!isNaN(keyword)) {
    return `amount: {EQ: "${keyword}"} paymentDetail: {reference: {LIKE: "${keyword}"}}`
  }

  const keywords = keyword.split(' ')
  let reference = ''
  let amount = ''
  keywords.map(word => {
    if (!isNaN(word)) {
      amount += ` amount: {EQ: "${word}"} `
    }
    reference += `{reference: {LIKE: "${word}"}}`
  })
  return `${amount} paymentDetail:{OR:[${reference}]}`
}

const savingsFilter = (accounts, filters = { keywords: '' }) => {
  let filter = ''
  accounts.map(account => {
    filter += `id: {EQ: ${account}} `
  })
  if (filters.keywords) {
    return `
      account: {
        OR: [ { ${filter} } ]
      }
      OR: [{
        ${savingsSearchQuery(filters.keywords)}
      }]`
  } else {
    return `account: {
        OR: [ { ${filter} } ]
      }`
  }
}

const dateFilter = (filters = '') => {
  if (!filters.fromDate && !filters.toDate) return ''

  const fromDate = new Date(filters.fromDate).toISOString().replace('Z', '')
  const toDate = new Date(filters.toDate).toISOString().replace('Z', '')

  if (filters.fromDate && !filters.toDate) {
    return `createdAt: {GE:${JSON.stringify(fromDate)}}`
  }

  if (!filters.fromDate && filters.toDate) {
    return `createdAt: {LE:${JSON.stringify(addDays(toDate, 1))}}`
  }

  return `createdAt: {BETWEEN:${JSON.stringify([fromDate, addDays(toDate, 1)])}}`
}
