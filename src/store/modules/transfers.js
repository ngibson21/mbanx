import { draft as createTransfer, submit as submitTransfer } from '@/api/views/transfers.js'

const getDefaultState = {
  transferTypes: {
    domestic: {
      recipientNameLabel: 'components.transfers.new.transferTypes.recipientName',
      accountNoLabel: 'components.transfers.new.transferTypes.accountNo',
      bankCodeLabel: 'components.transfers.new.transferTypes.bankCode',
      accountNoMask: 'N### ####',
      bankCodeMask: ''
    },
    sepa: {
      recipientNameLabel: 'components.transfers.new.transferTypes.recipientName',
      accountNoLabel: 'components.transfers.new.transferTypes.iban',
      bankCodeLabel: 'components.transfers.new.transferTypes.bic',
      accountNoMask: 'AA## NNNN #### #### #### #### NNNN NNNN',
      bankCodeMask: ''
    },
    email: {
      recipientNameLabel: 'components.transfers.new.transferTypes.email',
      bankCodeLabel: 'components.transfers.new.transferTypes.recipientName',
      bankCodeMask: ''
    }
  },
  newTransfer: {
    amount: '',
    subject: '',
    remainingBalance: '',
    paymentType: {
      value: 'ACH'
    }
  },
  isCompletedStep: {
    recipientAccountInfo: false,
    transferAccountInfo: false,
    debitAccountInfo: false,
    transferTypeInfo: false
  },
  transferStep: 'SearchList',
  inEdit: false,
  previousStep: { panelName: '' },
  transferOptions: {
    normal: [
      { value: 'ACH', name: 'ACH Transfer', description: 'Usually money will arrive at your recipient account after 3 days' }
    ]
  }
}

const state = getDefaultState

const getters = {
  getTransfer (state) {
    return state.newTransfer
  },
  getAllTransferOptions (state) {
    return state.transferOptions.normal
  }
}

const mutations = {
  resetState (state) {
    Object.assign(state, getDefaultState)
  },
  saveRecipient (state, { data, to }) {
    state.newTransfer = { ...state.newTransfer, ...data }
    state.transferStep = to
  },
  setNavigation (state, payload) {
    state.transferStep = payload
  },
  updateRecipient (state, { data, step }) {
    state.newTransfer = { ...state.newTransfer, ...data }
    state.transferStep = state.previousStep.panelName
    state.isCompletedStep[step] = true
    state.inEdit = false
  },
  discardTransfer (state) {
    state.transferStep = 'SearchList'
    state.isCompletedStep = { ...state.isCompletedStep, ...getDefaultState.isCompletedStep }
    state.previousStep = { ...state.previousStep, ...getDefaultState.previousStep }
    state.inEdit = false
    state.newTransfer = getDefaultState.newTransfer
  },
  updateNewTransferState (state, { data }) {
    state.newTransfer = { ...state.newTransfer, ...data }
  },
  setCompleteStep (state, { step }) {
    state.isCompletedStep[step] = true
  },
  removeCompleteStep (state, { step }) {
    state.isCompletedStep[step] = false
  },
  editPanel (state, { panelName, step }) {
    state.previousStep = { ...state.previousStep, ...{ panelName: state.transferStep } }
    state.transferStep = panelName
    state.isCompletedStep[step] = false
    state.inEdit = true
  }
}

const actions = {
  resetState ({ commit }) {
    commit('resetState')
  },
  saveRecipient ({ commit }, payload) {
    commit('saveRecipient', payload)
  },
  updateRecipient ({ commit }, payload) {
    commit('updateRecipient', payload)
  },
  updateNewTransferState ({ commit }, payload) {
    commit('updateNewTransferState', payload)
  },
  async createTransfer (_, recipient) {
    try {
      // Convert subject to array
      recipient = { ...recipient, subject: [`${recipient.subject}`] }
      const result = await createTransfer(recipient)
      if (result.data.errors) {
        throw result.data
      }
      return result
    } catch (error) {
      throw error.errors[0].message.split(':')
    }
  },
  async submitTransfer ({ commit }, payload) {
    try {
      const result = await submitTransfer(payload)
      commit('setNavigation', 'SuccessPage')
      return result
    } catch (error) {
      throw error
    }
  },
  discardTransfer (context) {
    context.commit('discardTransfer')
  },
  setNavigation ({ commit }, payload) {
    commit('setNavigation', payload)
  },
  setCompleteStep ({ commit }, payload) {
    commit('setCompleteStep', payload)
  },
  removeCompleteStep ({ commit }, payload) {
    commit('removeCompleteStep', payload)
  },
  editPanel ({ commit }, payload) {
    commit('editPanel', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
