/* eslint-disable camelcase */
import { withAuth, noAuth } from '@/api/request.js'
import { transformRequest } from '@/utils/helpers.js'

const requestWithAuth = withAuth()
const requestNoAuth = noAuth({
  baseURL: `${process.env.VUE_APP_API_URL}/oauth/token`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: data => transformRequest(data)
})

const requestOTP = () => {
  return requestWithAuth({
    timeout: 30000,
    data: {
      query: `
        mutation{
          requestOTP(param:{
            deliveryMethod:"email"
            extendedToken:false
          }){
            requestTime
            expirationTime
          }
        }
      `
    }
  })
}

const enableTOTP = () => {
  return requestWithAuth({
    method: 'post',
    baseURL: `${process.env.VUE_APP_API_URL}/graphql`,
    data: {
      query: `
        mutation {
          requestTOTP {
            secretKey
          }
        }
      `
    }
  })
}

const disableTOTP = (token) => {
  return requestWithAuth({
    data: {
      query: `
        mutation {
          deleteTOTP(token: "${token}")
        }
      `
    }
  })
}

const confirmTOTP = ({ token }) => {
  return requestWithAuth({
    method: 'post',
    baseURL: `${process.env.VUE_APP_API_URL}/graphql`,
    data: {
      query: `
        mutation {
          confirmTOTP(token: "${token}") {
            success
            mfaToken {
              token
              validTo
              validFrom
            }
            success
            recoveryCodes
          }
        }
      `
    }
  })
}

const auth = async ({ username, password }) => {
  const data = {
    username,
    password,
    client_id: process.env.VUE_APP_CLIENT_ID,
    client_secret: process.env.VUE_APP_CLIENT_SECRET,
    grant_type: process.env.VUE_APP_GRANT_TYPE
  }
  try {
    const auth = await requestNoAuth({
      data
    })
    Object.keys(auth.data).forEach(key => {
      sessionStorage.setItem(key, auth.data[key])
    })
  } catch (error) {
    throw error
  }
}

const validateOTP = ({ token, method = 'EMAIL' }) => {
  return requestWithAuth({
    method: 'post',
    baseURL: `${process.env.VUE_APP_API_URL}/graphql`,
    data: {
      query: `
        mutation {
          requestAccessTokenFromOTP(token: "${token}", deliveryMethod: ${method}) {
            token
          }
        }
      `
    }
  })
}

export {
  auth,
  validateOTP,
  requestOTP,
  enableTOTP,
  confirmTOTP,
  disableTOTP
}
