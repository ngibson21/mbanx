import { withAuth } from '@/api/request.js'

const request = withAuth()

export default (identifers) => {
  let query = ''
  identifers.map((identifer, index) => {
    query = query + `identifer${index}: Beneficiaries{
        select {
            creditor(where:{identifier:{EQ: "${identifer}"}}) {
                identifier
            }
        email
        }
    }`
  })
  return request({
    data: {
      query: `{${query}} `
    }
  })
}
