import { withAuth } from '@/api/request.js'

const request = withAuth()

const getTransfers = ({ limit } = {}) => {
  return request({
    data: {
      query: `
        {
          Transfers (
            ${limit ? `page:{start: 1, limit: ${limit}}` : ''}
            where: {
              status: {EQ: EXECUTION_SUCCESS}
            }
          ) {
            select {
              creditor(where: {
                AND: {name: {NOT_NULL:true} identifier: {NOT_NULL: true}}
              }) {
                name
                identifier
              }
              id(orderBy:DESC)
              amount
              valueDate
            }
          }
        }
      `
    }
  })
}

const draft = (payload) => {
  const { creditor, debtor, currency, amount, subject, fullName, paymentType } = payload
  let creditorIdentifier

  if (paymentType.value === 'INTERNAL') {
    creditorIdentifier = `ACCOUNT:${creditor.accountNo}`
  } else {
    creditorIdentifier = `${paymentType.value}://${creditor.sortCode}/${creditor.accountNo}`
  }

  return request({
    data: {
      query: `
        mutation {
          createTransfer(input: {
            type: "CREDIT"
            paymentType: "${paymentType.value}"
            currency: "${currency}"
            amount: ${+amount}
            dateFormat: "YYYY-MM-DD"
            reference: ${JSON.stringify(subject)}
            debtor: {
              identifier: "ACCOUNT:${debtor.accountNumber}"
            }
            creditor: {
              identifier: "${creditorIdentifier}"
              name: "${fullName}"
              ${creditor?.address ? `address: ${JSON.stringify(creditor.address)}` : ''}
              ${creditor?.country ? `country: "${creditor.country}"` : ''}
              ${creditor?.city ? `city: "${creditor.city}"` : ''}
              ${creditor?.postalCode ? `postalCode: "${creditor.postalCode}"` : ''}
            }
          }
          ) {id}
        }
      `
    }
  })
}

const submit = ({ transferId }) => {
  return request({
    data: {
      query: `
        mutation {
          submitTransfer (id:${+transferId}){
            id
          }
        }
      `
    }
  })
}

export {
  draft,
  submit,
  getTransfers
}
