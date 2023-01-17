import search from '@/api/views/recipients/recipientSearch.js'
import deleteRecipient from '@/api/views/recipients/deleteRecipient.js'

const getDefaultState = () => {
  return {
    items: [],
    total: 0
  }
}

const state = getDefaultState()

const getters = {
  id: state => id => state.items.find(item => item.id === id),
  list: state => state.items,
  total: state => state.total
}

const mutations = {
  resetState (state) {
    Object.assign(state, getDefaultState())
  },
  updateRecipients (state, { fetchedItems, allItemIDs }) {
    state.items = state.items
      .concat(fetchedItems)
      .filter((elem, pos, items) => (items.findIndex(a => a.id === elem.id) === pos && allItemIDs.find(a => a.id === elem.id)))
      .sort((a, b) => b.id - a.id)

    state.total = allItemIDs.length
  },
  updateRecipientDetails (state, data) {
    state.items = state.items.map(item => (item.id === data.id) ? data : item)
  },
  deleteRecipient (state, id) {
    const item = state.items.find(item => item.id === id)
    state.items.splice(state.items.indexOf(item), 1)
  }
}

const actions = {
  resetState ({ commit }) {
    commit('resetState')
  },
  async search (context, keyword) {
    try {
      const response = await search(keyword)

      const result = response?.data?.data?.name?.select?.concat(response?.data?.data?.creditor?.select)

      return result?.filter((elem, pos, items) => (items.findIndex(a => a.id === elem.id) === pos))
    } catch (e) {
      throw e
    }
  },
  async deleteRecipient ({ commit }, recipientId) {
    try {
      await deleteRecipient(recipientId)
      commit('deleteRecipient', recipientId)
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
