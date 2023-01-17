import router from '@/router/index.js'
import {
  requestForgotPassword,
  resetPassword,
  changePassword,
  getPasswordPolicy,
  getUserDetails,
  getAuthenticationDetail
} from '@/api/user.js'
import {
  auth,
  validateOTP,
  requestOTP,
  enableTOTP,
  confirmTOTP,
  disableTOTP
} from '@/api/auth.js'
import { clearLocalStorage } from '@/utils/helpers.js'

const getDefaultState = () => {
  return {
    locale: 'en',
    authenticated: false,
    required2FA: false,
    isPasswordExpired: false,
    appUser: {},
    username: '',
    details: {
      getAuthenticationDetail: {
        mfaDeliveryMethods: []
      },
      PasswordValidationPolicies: []
    }
  }
}

const state = getDefaultState()

const getters = {
  get: state => state,
  id: state => state.appUser.id,
  fullName: state => `${state.appUser.firstName} ${state.appUser.lastName}`,
  email: state => state.appUser.email,
  isTotpEnabled: (state) => state.details?.getAuthenticationDetail?.mfaDeliveryMethods?.find(method => method === 'TOTP')
}

const mutations = {
  resetState (state) {
    Object.assign(state, getDefaultState())
  },
  update (state, payload) {
    Object.assign(state, payload)
  },
  updateDetails (state, payload) {
    Object.assign(state, {
      ...state,
      details: {
        ...state.details,
        ...payload
      }
    })
  }
}

const actions = {
  resetState ({ commit }) {
    commit('resetState')
  },
  update (context, payload) {
    context.commit('update', payload)
  },
  async login ({ commit, dispatch }, credentials) {
    try {
      await auth(credentials)

      commit('update', { username: credentials.username })

      await dispatch('updateUserDetails')
      await dispatch('checkUnverifiedClient')

      if (router.currentRoute.name === 'registration') return

      await dispatch('checkSelfServiceUser')
      await dispatch('checkMFA')

      // checkMFA already push to otp if needed
      if (router.currentRoute.name === 'otp') return

      await dispatch('checkExpiredPassword')
      await dispatch('application/toggleLoadingScreen', '', { root: true })

      commit('update', { authenticated: true })
    } catch (e) {
      throw e
    }
  },
  async updateUserDetails ({ commit }) {
    try {
      const newDetail = (await getUserDetails()).data.data

      commit('updateDetails', {
        ...newDetail,
        PasswordValidationPolicies: newDetail.PasswordValidationPolicies.select
      })
    } catch (e) {
      throw e
    }
  },
  async checkSelfServiceUser ({ state }) {
    try {
      const { isSelfServiceUser } = state.details.getAuthenticationDetail

      if (!isSelfServiceUser) {
        throw new Error('noPermissions')
      }
    } catch (e) {
      throw e
    }
  },
  async checkUnverifiedClient ({ state }) {
    try {
      const client = state.details.Client

      if (client?.length > 0 && client[0].status === '100') { // 100 = Unverified client
        sessionStorage.setItem('clientId', client[0].id)
        return router.push({ name: 'registration' })
      }
    } catch (e) {
      throw e
    }
  },
  async checkMFA ({ state, commit, getters }) {
    try {
      const { isMFARequired } = state.details.getAuthenticationDetail

      if (!isMFARequired) return

      if (!getters.isTotpEnabled) requestOTP()

      commit('update', { required2FA: true })

      await router.push({ name: 'otp' })
    } catch (e) {
      throw e
    }
  },
  async checkExpiredPassword ({ state, commit }) {
    try {
      const { isPasswordExpired } = state.details.getAuthenticationDetail

      if (!isPasswordExpired) return

      commit('update', { isPasswordExpired: true })
      return router.push('/reset-password')
    } catch (e) {
      throw e
    }
  },
  async logout ({ dispatch }) {
    try {
      await dispatch('application/resetState', '', { root: true })
      clearLocalStorage()
      await router.push({ name: 'login' })
    } catch (error) {
      throw error
    }
  },
  async submitOtp ({ state, commit, dispatch }, otp) {
    try {
      const twoFA = await validateOTP(otp)
      if (twoFA.data.errors) {
        throw twoFA.data.errors
      }
      sessionStorage.setItem('2FA-Token', twoFA.data.data.requestAccessTokenFromOTP.token)
      const isPasswordExpired = state.details.getAuthenticationDetail.isPasswordExpired

      if (isPasswordExpired) {
        commit('update', { isPasswordExpired: true })
        return router.push('/reset-password')
      }

      await dispatch('application/toggleLoadingScreen', '', { root: true })

      commit('update', { authenticated: true })
    } catch (error) {
      throw error
    }
  },
  async requestForgotPassword (context, identifier) {
    try {
      const result = await requestForgotPassword(identifier)
      if (result.data.errors && result.data.errors.length > 0) {
        throw result.data.errors[0]
      }
      return result
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async resetPassword (context, payload) {
    try {
      const result = await resetPassword(payload)
      if (result.data.errors && result.data.errors.length > 0) {
        throw result.data.errors[0]
      }
      return result
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async submitPasswordChanges ({ state }, password) {
    try {
      const result = await changePassword({ identifier: state.appUser.username, ...password })
      if (result.data.errors && result.data.errors.length > 0) {
        throw result.data.errors[0]
      }
      return result
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async getPasswordPolicy ({ commit, state }) {
    try {
      if (state.details?.PasswordValidationPolicies.length) return

      const userDetails = await getPasswordPolicy()

      commit('updateDetails', { PasswordValidationPolicies: userDetails.data.data.PasswordValidationPolicies.select })
    } catch (error) {
      return error
    }
  },
  async updateAuthenticationDetail ({ commit }) {
    try {
      const newDetail = (await getAuthenticationDetail()).data.data
      commit('updateDetails', newDetail)
    } catch (error) {
      throw error
    }
  },
  async enableTOTP () {
    return enableTOTP()
  },
  async disableTOTP ({ state, dispatch }, payload) {
    try {
      const dataTOTP = await disableTOTP(payload)

      if (dataTOTP.data.data === null) {
        throw new Error(dataTOTP.data.errors[0].message)
      }

      if (!state.details.getAuthenticationDetail.isMFARequired) {
        sessionStorage.removeItem('2FA-Token')
      }

      await dispatch('updateAuthenticationDetail')
    } catch (error) {
      throw error
    }
  },
  async confirmEnableTOTP (context, payload) {
    try {
      const dataTOTP = await confirmTOTP(payload)

      if (!dataTOTP.data.data?.confirmTOTP) {
        throw new Error(dataTOTP.data.errors[0].message)
      }

      const { mfaToken, success, recoveryCodes } = dataTOTP.data.data.confirmTOTP

      if (dataTOTP.data.data.confirmTOTP.mfaToken) {
        sessionStorage.setItem('2FA-Token', mfaToken.token)
      }

      return { success, recoveryCodes }
    } catch (error) {
      throw error
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
