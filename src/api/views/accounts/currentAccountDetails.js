import { withAuth } from '@/api/request.js'
import store from '@/store/index.js'
import { currentAccount, currentAccountDetails, savingsTransaction } from '@/api/fragments/index.js'

const request = withAuth()

export default (id) => {
  const txs = store.getters['transactions/list']([id], 'savings')
  const lastAccTx = txs.find(tx => tx.account.id === id)

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
          SavingsAccount(id: ${id}) {
            ...currentAccount
            ...currentAccountDetails
          }
          SavingsAccountTransactions (
            where: {
              id: {GT: ${lastAccTx ? lastAccTx.id : 0} } 
              account : {id: {EQ: ${id}}}
            } 
            page: {start: 1 limit: 10}
          ) {
            tx: select {
              id (orderBy: DESC)
              ...savingsTransaction
            }
          }
        }
        ${currentAccount}
        ${currentAccountDetails}
        ${savingsTransaction}
      `
    }
  })
}
