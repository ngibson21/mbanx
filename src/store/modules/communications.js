import { withAuth } from '@/api/request.js'

const request = withAuth()

const getDefaultState = () => {
  return {
    communications: [],
    totalCommunications: 0
  }
}

const state = getDefaultState()

const getters = {
  id: (state) => (id) => {
    return state.communications.find(message => message.id === id)
  }
}

const mutations = {
  resetState (state) {
    Object.assign(state, getDefaultState())
  },
  updateCommunications (state, payload) {
    state.communications = state.communications.concat(payload.Medias.select)
    state.totalCommunications = payload.totalMedias.total
    state.communications = state.communications.filter((elem, pos, savings) => {
      return savings.findIndex(tx => tx.id === elem.id) === pos
    })
    state.communications = state.communications.sort((a, b) => b.id - a.id)
  }
}

const actions = {
  resetState ({ commit }) {
    commit('resetState')
  },
  async download ({ commit, getters }, documentId) {
    const { filename, entityId, id } = getters.id(documentId)
    try {
      const downloadStatement = (accountId, documentId) => {
        return request({
          method: 'get',
          baseURL: `${process.env.VUE_APP_API_URL}/v1/self/savings/${accountId}/documents/${documentId}/attachment`,
          responseType: 'blob'
        })
      }

      const response = await downloadStatement(entityId, id)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
    } catch (error) {
      Promise.reject(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
