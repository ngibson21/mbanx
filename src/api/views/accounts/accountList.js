import { withAuth } from '@/api/request.js'
import { currentAccount, loanAccount } from '@/api/fragments/index.js'

const request = withAuth()

export default () => {
  return request({
    data: {
      query: `
        {
          SavingsAccounts {
            select {
              ...currentAccount
            }
          }
          Loans {
            select {
              ...loanAccount
            }
          }
        }
        ${currentAccount}
        ${loanAccount}
      `
    }
  })
}
