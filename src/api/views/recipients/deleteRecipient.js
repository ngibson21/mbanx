import { withAuth } from '@/api/request.js'

const request = withAuth()

export default (recipientId) => {
  return request({
    data: {
      query: `
        mutation{
          DeleteRecipient: DeleteBeneficiary(id: ${recipientId}){
            id
          }
        }
      `
    }
  })
}
