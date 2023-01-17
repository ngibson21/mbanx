import { withAuth } from '@/api/request.js'
import { recipient } from '@/api/fragments/index.js'

const request = withAuth()

export default ({ id, creditorId }) => {
  return request({
    data: {
      query: `
        {
          Recipient: Beneficiary (id: ${id}) {
            id
            ...recipient
          }
          Transfers {
            tx: select {
              id (orderBy: DESC)
              beneficiaryRefId
              creditor (where: {identifier: {EQ: "${creditorId}"}}) {
                name
                identifier
              }
              debtor {
                name
                identifier
              }
              amount
              reference
              valueDate
              type
            }
          }
        }
        ${recipient}
      `
    }
  })
}
