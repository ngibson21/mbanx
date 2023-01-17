import { withAuth, noAuth } from '@/api/request.js'
import { authenticationDetail } from '@/api/fragments/user.js'

const request = withAuth()
const noTokenRequest = noAuth()

const getUserDetails = () => {
  return request({
    data: {
      query: `
        {
          getAuthorizationDetail {
            otpProtectedOperations
          }
          getAuthenticationDetail {
            ...authenticationDetail
          }
          PasswordValidationPolicies (where:{active:{EQ:true}}) {
            select{
              regex
              description
            }
          }
          Client: getUnverifiedClients {
            id
            status
          }
        }
        ${authenticationDetail}
      `
    }
  })
}

const getAuthenticationDetail = () => {
  return request({
    method: 'post',
    baseURL: `${process.env.VUE_APP_API_URL}/graphql`,
    data: {
      query: `
        {
          getAuthenticationDetail {
            ...authenticationDetail
          }
        }
        ${authenticationDetail}
      `
    }
  })
}

const requestForgotPassword = (identifier) => {
  return noTokenRequest({
    data: {
      query: `
        mutation {
          requestPasswordResetToken(input: {identifier: "${identifier}"})
        }
      `
    }
  })
}

const resetPassword = (resetPassword) => {
  return noTokenRequest({
    data: {
      query: `
        mutation {
          resetPassword(input: {token: "${resetPassword.token}", password: "${resetPassword.newPassword}"})
        }
      `
    }
  })
}

const changePassword = (password) => {
  return request({
    data: {
      query: `
        mutation {
          changePassword (
            identifier: "${password.identifier}"
            currentPassword: "${password.current}"
            newPassword: "${password.new}"
          )
        }
     `
    }
  })
}

const getPasswordPolicy = () => {
  return noTokenRequest({
    data: {
      query: `
      {
        PasswordValidationPolicies (where:{active:{EQ:true}}) {
          select{
            regex
            description
          }
        }
      }
      `
    }
  })
}

export {
  getUserDetails,
  getAuthenticationDetail,
  requestForgotPassword,
  resetPassword,
  changePassword,
  getPasswordPolicy
}
