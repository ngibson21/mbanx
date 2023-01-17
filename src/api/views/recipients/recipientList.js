import { withAuth } from '@/api/request.js'
import store from '@/store/index.js'
import { recipient } from '@/api/fragments/index.js'

const request = withAuth()

export default ({ page, limit }) => {
  const recipientCache = store.getters['recipients/list']
  const latest = recipientCache[0]
  const oldest = recipientCache[recipientCache.length - 1]

  const fetchTotalRecordsQuery = `
    total: Beneficiaries { select { id } total }
  `
  const fetchLatestRecordsQuery = `
    latest:  Beneficiaries (${latest ? '' : `page: {start: 1 limit: ${limit}}`} where: {id: {GT: ${latest?.id || 0}}}) {
      select {
        id (orderBy: DESC)
        ...recipient
      }
    }
  `
  const fetchPagedRecordsQuery = `
    paged: Beneficiaries (page: {start: 1 limit: ${limit}} where: {id: {LT: ${oldest?.id || 0}}}) {
      select {
        id (orderBy: DESC)
        ...recipient
      }
    }
  `
  let query = fetchTotalRecordsQuery + fetchLatestRecordsQuery

  if (recipientCache.length > 0) {
    query = query + fetchPagedRecordsQuery
  }

  return request({
    data: {
      query: `
        {
          ${query}
        }
        ${recipient}
      `
    }
  })
}
