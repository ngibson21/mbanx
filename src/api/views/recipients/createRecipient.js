import { withAuth } from '@/api/request.js'
import store from '@/store/index.js'

const request = withAuth()

const validateRecipient = async (nickname) => {
  const recipient = await request({
    data: {
      query: `
        {
          Beneficiaries(where: {name: { EQ: "${nickname}"}}) {
            select {
              id
            }
          }
        }
      `
    }
  })

  if (recipient.data.data.Beneficiaries.select.length) {
    throw new Error('recipient_exist')
  }
}

const createRecipient = (recipient) => {
  // const isInternalRecipient = sortCode => process.env.VUE_APP_BANK_CODE === sortCode
  // const getInternalIdentifier = recipient => `ACCOUNT:${recipient.creditor.accountNo}`
  // const getSwiftIdentifier = recipient => `SWIFT://${recipient.creditor.sortCode}/${recipient.creditor.accountNo}`
  // const identifier = isInternalRecipient(recipient.creditor.sortCode) ? getInternalIdentifier(recipient) : getSwiftIdentifier(recipient)

  // New transfer is only supporting ACH at the moment

  const identifier = `ACH://${recipient.creditor.sortCode}/${recipient.creditor.accountNo}`

  return request({
    data: {
      query: `
          mutation {
            CreateRecipient: CreateBeneficiary(input:{
              name: "${recipient.nickname}"
              creditor: {
                name: "${recipient.fullName}"
                identifier: "${identifier}"
              }
              email: "${recipient.email || ''}"
              mobile: "${recipient.mobile || ''}"
              clientId: ${store.state.user.client.id}
            }) {
              id
            }
          }
      `
    }
  })
}

export {
  createRecipient,
  validateRecipient
}
