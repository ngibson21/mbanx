import { withAuth } from '@/api/request.js'
import store from '@/store/index.js'
import { loanAccount, loanAccountDetails, loanTransaction } from '@/api/fragments/index.js'

const request = withAuth()

export default (loanId) => {
  const txs = store.getters['transactions/list']([loanId], 'loan')
  const lastAccTx = txs.find(tx => tx.loan.id === loanId)

  return request({
    data: {
      query: `
        {
          Loan (id: ${loanId}) {
            ...loanAccount
            ...loanAccountDetails
          }
          LoanTransactions (
            where: {
              id: {GT: ${lastAccTx ? lastAccTx.id : 0} } 
              loan : {id: {EQ: ${loanId}}}
            } 
            page: {start: 1 limit: 10}
          ) {
            select {
              id (orderBy: DESC)
              ...loanTransaction
            }
          }      
        }
        ${loanAccount}
        ${loanAccountDetails}
        ${loanTransaction}
      `
    }
  })
}
