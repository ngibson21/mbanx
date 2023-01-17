import { withAuth } from '@/api/request.js'
import { savingsTransaction, savingsTransactionDetails } from '@/api/fragments/index.js'

const request = withAuth()

export default (id) => {
  return request({
    data: {
      query: `
        {
          SavingsAccountTransaction(id: ${id}) {
            id
            ...savingsTransaction
            ...savingsTransactionDetails
          }
        }
        ${savingsTransaction}
        ${savingsTransactionDetails}     
      `
    }
  })
}
