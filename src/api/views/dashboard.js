import { withAuth } from '@/api/request.js'
import store from '@/store/index.js'
import { currentAccount, savingsTransaction } from '@/api/fragments/index.js'

const request = withAuth()

export default ({ savingsIds }) => {
  const txGql = (accountId) => {
    const accountTxs = store.getters['transactions/list']([accountId], 'savings')
    const latestAccountTx = accountTxs[0]

    const gql = `
      latestTxSavings${accountId} : SavingsAccountTransactions (
        where:{
          id: {GT: ${latestAccountTx?.id || 0} } 
          account : {id: {EQ: ${accountId}}}
        } 
        page: {start: 1 limit: 10}
      ) {
        select {
          id (orderBy: DESC)
          ...savingsTransaction
        }
      }
    `
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
          ${savingsIds.map(id => txGql(id)).toString()}
        }
        ${currentAccount}
        ${savingsTransaction}
      `
    }
  })
}
