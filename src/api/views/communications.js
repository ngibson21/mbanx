import { withAuth } from '@/api/request.js'

const request = withAuth()

export default ({ page, limit }) => {
  return request({
    data: {
      query: `
        {
          totalMedias: Medias (where: {type: {EQ: "statement"}}) {
            select {
              id
            }
            total
          }
          Medias(where: { type: {EQ: "statement"} } page:{ start:${page} limit: ${limit} }) {
            total
            select {
              type
              id (orderBy: DESC)
              name
              description
              filename
              entityType
              entityId
              createdAt
            }
          }      
        }
      `
    }
  })
}
