import {
  registerClient,
  getConfiguration,
  getStepConfiguration,
  uploadClientDocument,
  addStepData,
  createClient,
  finishStaticStep,
  getOnboardingStatus,
  getClientAddressTypes,
  getCountries,
  getStates,
  updateClient
} from '@/api/views/registration/index.js'
import { auth } from '@/api/auth.js'

const getDefaultState = () => {
  return {
    data: {},
    configuration: [],
    cardProducts: [],
    savingsProducts: [],
    currentStepPosition: 1,
    isCompleted: false
  }
}

const state = getDefaultState()

const getters = {
  isCompleted: state => state.isCompleted,
  currentStepPosition: state => state.currentStepPosition,
  currentStep: state => state.configuration.find(config => config.position === state.currentStepPosition),
  stepById: state => id => state.configuration.find(config => config.stepId === id)
}

const mutations = {
  resetState (state) {
    Object.assign(state, getDefaultState())
  },
  setConfiguration (state, payload) {
    state.configuration = payload
  },
  setStepConfiguration (state, { stepId, columnHeaders }) {
    state.configuration = state.configuration.map(config => {
      if (config.stepId === stepId) {
        return {
          ...config,
          columnHeaders
        }
      }

      return config
    })
  },
  updateData (state, payload) {
    state.data = {
      ...state.data,
      ...payload
    }
  },
  updateCurrentStepPosition (state, payload) {
    state.currentStepPosition = payload
  },
  isCompleted (state, payload) {
    state.isCompleted = payload
  }
}

const actions = {
  resetState ({ commit }) {
    commit('resetState')
  },
  async getConfiguration ({ commit }) {
    try {
      const template = await getConfiguration()

      commit('setConfiguration', template.data.data.getOnBoardingTemplate.steps)
    } catch (e) {
      throw e
    }
  },
  async getStepConfiguration ({ state, commit }, stepPosition) {
    try {
      const stepId = state.configuration.find(step => step.position === stepPosition).stepId
      const template = await getStepConfiguration(stepId)

      commit('setStepConfiguration', { stepId, columnHeaders: template.data.data.getStepDetails.columnHeaders })
    } catch (e) {
      throw e
    }
  },
  async getOnboardingStatus ({ commit, getters }) {
    const clientId = sessionStorage.getItem('clientId')

    if (!clientId) return

    const result = await getOnboardingStatus(clientId)
    const currentStepId = result?.data?.data?.getOnBoardingStatus?.nextStep

    if (currentStepId === 0) {
      commit('isCompleted', true)
      // eslint-disable-next-line camelcase
      commit('updateData', { client_id: clientId })
    } else if (currentStepId > 0) {
      const position = getters.stepById(currentStepId).position
      commit('updateCurrentStepPosition', position)
      // eslint-disable-next-line camelcase
      commit('updateData', { client_id: clientId })
    }
  },
  async registerClient ({ commit }, payload) {
    try {
      const result = await registerClient(payload)

      if (result.data.errors) {
        throw result.data
      }

      // eslint-disable-next-line camelcase
      commit('updateData', { ...payload, app_user_id: result.data.data.registerUnverifiedOrgUser })

      await auth({
        username: payload.email,
        password: payload.password
      })

      return result
    } catch (e) {
      throw e
    }
  },
  async createClient ({ commit, state }, payload) {
    const result = await createClient(state.data.app_user_id, `${payload.firstName} ${payload.lastName}`)

    if (result.data.errors) {
      throw result.data
    }

    // eslint-disable-next-line camelcase
    commit('updateData', { client_id: result.data.data.registerOnBoardingClient })
  },
  goBack ({ commit, state }) {
    commit('updateCurrentStepPosition', state.currentStepPosition - 1)
  },
  async goNext ({ commit, state, getters, dispatch }, payload = {}) {
    const { data, step } = payload

    const getFieldToSubmit = async (formModel, step) => {
      const fields = step.columnHeaders
        .map(step => ({ columnName: step.columnName, columnType: step.columnType }))
        .filter(field => field.columnName !== 'id')

      const result = {}

      await Promise.all(fields.map(async ({ columnName, columnType }) => {
        if (columnName === 'client_id') result[columnName] = state.data[columnName]

        else if (columnName.includes('FILE_UPLOAD')) {
          if (!formModel[columnName]) return

          const fileId = await uploadClientDocument({
            clientId: state.data.client_id,
            formData: {
              name: formModel[columnName].name,
              file: formModel[columnName]
            }
          })
          result[columnName] = fileId.data.id
        } else if (columnType === 'multiselect') {
          result[columnName] = formModel[columnName] ? formModel[columnName].join() : formModel[columnName]
        } else {
          result[columnName] = formModel[columnName]
        }
      }))

      return result
    }

    const submit = async (fieldsToSubmit, stepId, resourcePath) => {
      const response = await addStepData({
        stepId: stepId,
        clientId: state.data.client_id,
        data: JSON.stringify(fieldsToSubmit).replace(/"([^(")"]+)":/g, '$1:'),
        originalData: fieldsToSubmit,
        resourcePath
      })

      if (!response.data.data.createUnverifiedOnBoardingStep?.changes) throw response.data.errors
    }

    if (step && !step.isMultiRow) {
      const fieldsToSubmit = await getFieldToSubmit(data, step)
      await submit(fieldsToSubmit, step.stepId, step.resourcePath)
    }

    if (step && step.isMultiRow) {
      for await (const model of data[`stepId${step.stepId}`]) {
        const fieldsToSubmit = await getFieldToSubmit(model, step)
        await submit(fieldsToSubmit, step.stepId, step.resourcePath)
      }
    }

    if (!step) {
      await finishStaticStep(getters.currentStep.stepId, state.data.client_id)
    }

    await dispatch('updateOnboardStatus')

    commit('updateData', payload)
  },
  async updateOnboardStatus ({ state, commit, getters }) {
    try {
      const result = await getOnboardingStatus(state.data.client_id)

      if (result?.data?.data?.getOnBoardingStatus?.nextStep === 0) return commit('isCompleted', true)

      const nextStep = getters.stepById(result?.data?.data?.getOnBoardingStatus?.nextStep)

      commit('updateCurrentStepPosition', nextStep.position)
    } catch (e) {
      throw e
    }
  },
  getClientAddressTypes () {
    return getClientAddressTypes()
  },
  getCountries () {
    return getCountries()
  },
  getStates (context, countryId) {
    return getStates(countryId)
  },
  updateClient (context, data) {
    return updateClient(data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
