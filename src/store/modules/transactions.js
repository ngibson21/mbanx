import searchTransactions from '@/api/views/transactions/transactionSearch.js'

const getDefaultState = () => {
  return {
    savings: [],
    loan: [],
    holdTx: []
  }
}

const state = getDefaultState()

const getters = {
  list: state => (ids, type) => {
    // loan || savings || share
    const txs = state[type].filter(tx => ids.includes(tx[type === 'savings' ? 'account' : 'loan'].id))

    if (type === 'savings') {
      const tmpHoldTx = state.holdTx.filter(tx => ids.includes(tx.account.id))
      return [...tmpHoldTx, ...txs].sort((a, b) => {
        if (new Date(a.createdAt) > new Date(b.createdAt)) return -1
        if (new Date(a.createdAt) < new Date(b.createdAt)) return 1
        return 0
      })
    }

    return txs
  }
}

const mutations = {
  resetState (state) {
    Object.assign(state, getDefaultState())
  },
  updateTransactions (state, { txs, type }) {
    state[type] = state[type].concat(txs)
    state[type] = state[type].filter((elem, pos, savings) => savings.findIndex(tx => tx.id === elem.id) === pos)
    state[type] = state[type].sort((a, b) => {
      if (new Date(a.createdAt) > new Date(b.createdAt)) return -1
      if (new Date(a.createdAt) < new Date(b.createdAt)) return 1
      return 0
    })
  },
  updateTransactionDetails (state, payload) {
    const transactionIndex = state.savings.findIndex(tx => tx.id === payload.id)
    state.savings.splice(transactionIndex, 1, payload)
  },
  updateHoldTx (state, txs) {
    state.holdTx = txs
  }
}

const actions = {
  resetState ({ commit }) {
    commit('resetState')
  },
  async search (context, payload) {
    try {
      const { accounts, filters } = payload

      const response = (await searchTransactions({
        accounts,
        filters
      })).data.data

      return response.result.tx
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
