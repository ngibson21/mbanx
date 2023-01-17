import { withAuth } from '@/api/request.js'
import { recipient } from '@/api/fragments/index.js'

const request = withAuth()

export default (keyword) => {
  return request({
    data: {
      query: `
        {
          creditor: Beneficiaries {
            select {
              id
              name
              email
              creditor (where:{
                OR: [
                  { name: { LIKE: "${keyword}" } }
                  { identifier: { LIKE: "${keyword}" } }
                ]
              }) {
                name
                identifier
              }
            }
          }
          name: Beneficiaries (where: {
            name: { LIKE: "${keyword}"}
          }) {
            select {
              id
              ...recipient
            }
          }
        }
        ${recipient}  
      `
    }
  })
}
