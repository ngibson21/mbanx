import axios from 'axios'
import gqlErrorHandling from '@/api/middleware/gqlErrorHandling.js'
import tenantId from '@/api/middleware/tenantId.js'
import auth from '@/api/middleware/auth.js'
import refreshToken from '@/api/middleware/refreshToken.js'
import otp from '@/api/middleware/otp.js'

export const base = (options = {}) => {
  const instance = axios.create({
    timeout: 4000,
    ...options
  })

  tenantId(instance)

  return instance
}

export const withAuth = (extraOptions = {}) => {
  const instance = base({
    method: 'post',
    baseURL: `${process.env.VUE_APP_API_URL}/graphql`,
    ...extraOptions
  })

  gqlErrorHandling(instance)
  auth(instance)
  refreshToken(instance)
  otp(instance)

  return instance
}

export const noAuth = (extraOptions = {}) => {
  const instance = base({
    method: 'post',
    baseURL: `${process.env.VUE_APP_API_URL}/graphql`,
    ...extraOptions
  })

  gqlErrorHandling(instance)

  return instance
}

export const restApi = (extraOptions = {}) => {
  const instance = base({
    baseURL: `${process.env.VUE_APP_API_URL}/v1`,
    ...extraOptions
  })

  auth(instance)

  return instance
}
