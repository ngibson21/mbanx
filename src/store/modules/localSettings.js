const getDefaultState = () => {
  return {
    darkMode: JSON.parse(localStorage.getItem('darkMode'))
  }
}

const state = getDefaultState()

const getters = {
  imageTheme: (state) => {
    if (state.darkMode) return 'dark'
    return 'bright'
  }
}

const mutations = {
  changeTheme (state) {
    state.darkMode = !state.darkMode
    localStorage.setItem('darkMode', state.darkMode)
  }
}

const actions = {
  changeTheme (context) {
    context.commit('changeTheme')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
