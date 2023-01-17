const getDefaultState = () => {
  return {
    notification: {
      status: false
    },
    loadingScreen: false,
    settings: {
      general: {
        mainCurrency: 'USD'
      }
    },
    activeCurrency: 'USD',
    selectedAccounts: null,
    hasErrors: false
  }
}

const state = getDefaultState()

const getters = {
  selectedAccounts: (state) => state.selectedAccounts
}

const mutations = {
  resetState (state) {
    Object.assign(state, getDefaultState())
  },
  setSelectedAccount (state, payload) {
    state.selectedAccounts = payload
  },
  toggleLoadingScreen (state) {
    state.loadingScreen = !state.loadingScreen
  },
  updateActiveCurrency (state, currency) {
    state.activeCurrency = currency
  },
  toggleErrorPage (state) {
    state.hasErrors = !state.hasErrors
  }
}

const actions = {
  resetState ({ commit, dispatch }) {
    commit('resetState')
    dispatch('accounts/resetState', null, { root: true })
    dispatch('cards/resetState', null, { root: true })
    dispatch('communications/resetState', null, { root: true })
    dispatch('transactions/resetState', null, { root: true })
    dispatch('transfers/resetState', null, { root: true })
    dispatch('recipients/resetState', null, { root: true })
    dispatch('user/resetState', null, { root: true })
  },
  setSelectedAccount (context, payload) {
    context.commit('setSelectedAccount', payload)
  },
  toggleLoadingScreen (context) {
    context.commit('toggleLoadingScreen')
  },
  updateActiveCurrency (context, payload) {
    context.commit('updateActiveCurrency', payload)
  },
  toggleErrorPage ({ commit }) {
    commit('toggleErrorPage')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
