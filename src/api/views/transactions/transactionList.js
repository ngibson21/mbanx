import { withAuth } from '@/api/request.js'
import { getPagedData } from '@/utils/helpers.js'
import store from '@/store/index.js'
import { currentAccount, savingsTransaction } from '@/api/fragments/index.js'

const request = withAuth()

export default ({ accounts, page, limit }) => {
  const txQueryForAccount = (accountId) => {
    const accountTx = store.getters['transactions/list']([accountId], 'savings')
    const latestAccountTx = accountTx[0]
    const oldestAccountTx = getPagedData(accountTx, page, limit).pop()
    const isPageFull = (getPagedData(accountTx, page, limit).length === limit)
    const isFetchedAll = (accountTx.length === store.getters['accounts/getById']('savings', accountId).totalTx)

    let gql = `
      latestTxSavings${accountId}: SavingsAccountTransactions (where: {account: {id: {EQ: ${accountId}}} id: {GT: ${latestAccountTx?.id || 0}}}) {
        select {
          id (orderBy: DESC)
          ...savingsTransaction
        }
      }
      totalTxSavings${accountId}: SavingsAccountTransactions (where: {account: {id: {EQ: ${accountId}}}}) {
        select {
          id
        }
        total
      }

    `

    if (!isPageFull || !isFetchedAll) {
      gql = gql + `
        pagedTxSavings${accountId}: SavingsAccountTransactions (page: {limit: ${limit} start: 1} 
          where: {account: {id: {EQ: ${accountId}}} id: {LT: ${oldestAccountTx?.id || 0}}}
        ) {
          select {
            id (orderBy: DESC)
            ...savingsTransaction
          }
        }
      `
    }

    return gql
  }

  return request({
    data: {
      query: `
        {
          AuthorizeTransactions (where: {active: {EQ: true}}){
            select{
              id
              hold: active
              account{
                id
                currency {
                  code
                }
              }
              createdAt(orderBy: DESC)
              amount
            }
          }
          SavingsAccounts {
            select {
              ...currentAccount
            }
          }
          ${accounts.map(id => txQueryForAccount(id)).toString()}
        }
        ${currentAccount}
        ${savingsTransaction}
      `
    }
  })
}
