import { withAuth } from '@/api/request.js'
import { savingsTransaction } from '@/api/fragments/index.js'

const request = withAuth()

export default ({ beginningLastMonth, currentDate }) => {
  return request({
    data: {
      query: `
        {
          AppUsers {
            select {
              id
              username
              lastName
              firstName
              email
            }
          }
          Clients (where: {status: {EQ: 300}}) {
            select {
              id
            }
          }
          SavingsAccounts (where: {status: {IN: [300, 600]}}) {
            select {
              id
              status
            }
          }
          SavingsAccountTransactions (where: {
            createdAt: {
              BETWEEN: ["${beginningLastMonth.toISOString().replace('Z', '')}","${currentDate.toISOString().replace('Z', '')}"]
            }
            account : {status: {IN: [300, 600]}}
          }) {
            tx: select {
              id(orderBy: DESC)
              ...savingsTransaction
            }
          }
        }
        ${savingsTransaction}
      `
    }
  })
}
