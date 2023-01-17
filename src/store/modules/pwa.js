const getDefaultState = () => {
  return {
    A2HS: {
      promptClosed: false
    }
  }
}

const state = getDefaultState()

const mutations = {
  updateA2HSEvent (state, payload) {
    state.A2HS.event = payload
  },
  closeA2HSPrompt (state) {
    Object.assign(state.A2HS, {
      promptClosed: true
    })
  }
}

const actions = {
  updateA2HSEvent (context, payload) {
    context.commit('updateA2HSEvent', payload)
  },
  closeA2HSPrompt (context) {
    context.commit('closeA2HSPrompt')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
