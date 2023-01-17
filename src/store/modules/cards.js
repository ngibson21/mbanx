import {
  updateContactlessPayment,
  updateOnlinePayment,
  updateStatus,
  updateRegion,
  cardsList as getCardListData,
  updateCardLimit
} from '@/api/views/cards/index.js'

import dayjs from 'dayjs'

const getDefaultState = () => {
  return {
    items: [],
    limits: [
      {
        title: 'components.cards.limits.cardPayments',
        type: 'purchase',
        items: [
          {
            el: 'purchase_seconds',
            placeholder: '',
            id: '',
            timeUnit: 'seconds',
            label: 'components.cards.limits.secondsLimit',
            value: '',
            savedValue: ''
          },
          {
            el: 'purchase_days',
            placeholder: '',
            id: '',
            timeUnit: 'days',
            label: 'components.cards.limits.daysLimit',
            value: '',
            savedValue: ''
          },
          {
            el: 'purchase_weeks',
            placeholder: '',
            id: '',
            timeUnit: 'weeks',
            label: 'components.cards.limits.weeksLimit',
            value: '',
            savedValue: ''
          },
          {
            el: 'purchase_months',
            placeholder: '',
            id: '',
            timeUnit: 'months',
            label: 'components.cards.limits.monthsLimit',
            value: '',
            savedValue: ''
          }
        ]
      },
      {
        title: 'components.cards.limits.cashWithDrawals',
        type: 'withdrawal',
        items: [
          {
            el: 'withdrawal_seconds',
            placeholder: '',
            id: '',
            timeUnit: 'seconds',
            label: 'components.cards.limits.secondsLimit',
            value: '',
            savedValue: ''
          },
          {
            el: 'withdrawal_days',
            placeholder: '',
            id: '',
            timeUnit: 'days',
            label: 'components.cards.limits.daysLimit',
            value: '',
            savedValue: ''
          },
          {
            el: 'withdrawal_weeks',
            placeholder: '',
            id: '',
            timeUnit: 'weeks',
            label: 'components.cards.limits.weeksLimit',
            value: '',
            savedValue: ''
          },
          {
            el: 'withdrawal_months',
            placeholder: '',
            id: '',
            timeUnit: 'months',
            label: 'components.cards.limits.monthsLimit',
            value: '',
            savedValue: ''
          }
        ]
      }
    ]
  }
}

const state = getDefaultState()

const getters = {
  id: (state) => (id) => state.items.find(card => card.id === id),
  list: (state, getters) => state.items.filter(item => (!['TERMINATED', 'CREATED', 'EXPIRED'].includes(item.status)) || getters.visibleExpiredCard(item)),
  defaultVelocityRulesById: (state, getters) => (cardId) => {
    const velocitiesRules = []
    getters.id(cardId).product.velocityRules.map(result => {
      velocitiesRules.push(result.id)
    })
    return velocitiesRules
  },
  velocityRulesById: (state, getters) => (cardId) => {
    const velocitiesRules = []
    getters.id(cardId).velocityRules.map(result => {
      velocitiesRules.push(result.id)
    })
    return velocitiesRules
  },
  allVelocitiesRules: (state) => {
    const velocitiesRules = []
    state.items.map(limit => {
      limit.velocityRules.map(rule => {
        velocitiesRules.push(rule.id)
      })
    })
    return velocitiesRules
  },
  getLimit: (state) => (type, el) => {
    const itemsObject = state.limits.find(item => item.type === type)
    const inputValue = itemsObject.items.find(item => item.el === el)
    return inputValue
  },
  purchase: (state) => {
    return {
      seconds: state.limits[0].items[0],
      days: state.limits[0].items[1],
      weeks: state.limits[0].items[2],
      months: state.limits[0].items[3]
    }
  },
  withdrawal: (state) => {
    return {
      seconds: state.limits[1].items[0],
      days: state.limits[1].items[1],
      weeks: state.limits[1].items[2],
      months: state.limits[1].items[3]
    }
  },
  isFreezedOrOrdered: (state) => (cardStatus) => {
    return ['SUSPENDED', 'ORDERED'].some(status => status === cardStatus)
  },
  hasExpired: (state) => (cardStatus) => {
    return cardStatus === 'EXPIRED'
  },
  visibleExpiredCard: () => (card) => {
    const todayDate = dayjs()
    const diffMonth = todayDate.diff(dayjs(card.expiresOn).startOf('month'), 'month')

    return card.status === 'EXPIRED' && diffMonth <= 0
  }
}

const mutations = {
  resetState (state) {
    Object.assign(state, getDefaultState())
  },
  setState (state, payload) {
    state.items = payload
  },
  addLimitRule (state, payload) {
    state.items.find(item => {
      if (item.id === payload.cardId) {
        item.velocityRules = payload.velocityRules
      }
    })
  },
  removeLimitRule (state, payload) {
    const [cardId, id] = payload
    state.items.find(item => {
      if (item.id === cardId) {
        item.velocityRules.find(rule => {
          if (rule.id === id) {
            return item.velocityRules.splice(item.velocityRules.indexOf(rule), 1)
          }
        })
      }
    })
  },
  toggleContactlessPayments (state, payload) {
    const card = state.items.find(card => card.id === payload.id)
    card.contactlessPaymentEnabled = payload.value
  },
  updateStatus (state, { id, status }) {
    const card = state.items.find(card => card.id.toString() === id)
    card.status = status
  },
  toggleOnlinePayments (state, payload) {
    const card = state.items.find(card => card.id === payload.id)
    card.onlinePaymentEnabled = payload.value
  },
  changePin (state, payload) {
    const card = state.find(card => card.id === payload.id)
    card.pin = payload.value
  },
  updateRegion (state, payload) {
    const card = state.items.find(card => card.id === payload.id)
    card.blockedCountries = payload.blockedCountries
  },
  returnOldLimit (state, payload) {
    payload.limit.value = payload.limit.savedValue
  },
  changeLimit (state, payload) {
    payload.limit.value = payload.value
  },
  saveLimit (state, payload) {
    payload.limit.savedValue = payload.value
  },
  saveLimitAndId (state, payload) {
    payload.limit.savedValue = payload.value
    payload.limit.value = payload.value
    payload.limit.id = payload.id || payload.limit.id
  },
  clearLimit (state, payload) {
    payload.limit.savedValue = ''
    payload.limit.value = ''
    payload.limit.id = ''
  },
  setLimits (state, payload) {
    state.limits.map(control => {
      control.items.map(item => {
        item.value = ''
        item.savedValue = ''
        item.id = ''
      })
      payload.map(limit => {
        if (control.type === limit.controls[0].toLowerCase()) {
          control.items.map(item => {
            if (item.timeUnit === limit.timeUnit.toLowerCase()) {
              item.value = limit.value
              item.savedValue = limit.value
              item.id = limit.id
            }
          })
        }
      })
    })
  },
  setDefaultLimits (state, payload) {
    state.limits.map(control => {
      payload.types.map(type => {
        if (type === control.type) {
          payload.defaultCardLimit.map(limit => {
            if (control.type === limit.controls[0].toLowerCase()) {
              control.items.map(item => {
                if (item.timeUnit === limit.timeUnit.toLowerCase()) {
                  item.placeholder = limit.value
                }
              })
            }
          })
        }
      })
    })
  },
  clearDefaultLimits (state, type) {
    state.limits.map(limit => {
      if (limit.type === type) {
        limit.items.map(item => {
          item.placeholder = ''
        })
      }
    })
  }
}

const actions = {
  resetState ({ commit }) {
    commit('resetState')
  },
  async removeLimitRule ({ commit, getters }, payload) {
    commit('removeLimitRule', payload)
  },

  async toggleContactlessPayments (context, { id, value }) {
    try {
      const response = await updateContactlessPayment(id, value)

      if (!response.data.data.updateCard.id) throw response

      context.commit('toggleContactlessPayments', { id, value })
    } catch (e) {
      throw e
    }
  },
  async updateStatus (context, { id, status }) {
    try {
      const response = await updateStatus(id, status)
      context.commit('updateStatus', response.data.data.handleCardEvent)
    } catch (e) {
      throw e
    }
  },
  async toggleOnlinePayments (context, { id, value }) {
    try {
      const response = await updateOnlinePayment(id, value)

      if (!response.data.data.updateCard.id) throw response

      context.commit('toggleOnlinePayments', { id, value })
    } catch (e) {
      throw e
    }
  },
  changePin (context, payload) {
    context.commit('changePin', payload)
  },
  async updateRegion ({ commit }, payload) {
    try {
      const response = await updateRegion(payload.id, payload.value)
      const updateCardList = await getCardListData()
      commit('cards/setState', updateCardList.data.data.Cards.select, { root: true })
      return response
    } catch (e) {
      throw e
    }
  },
  returnOldLimit ({ commit, getters }, payload) {
    const limit = getters.getLimit(payload.type, payload.el)
    commit('returnOldLimit', { ...payload, limit })
  },
  changeLimit ({ commit, getters }, payload) {
    const limit = getters.getLimit(payload.type, payload.el)
    commit('changeLimit', { ...payload, limit })
  },
  async saveLimit ({ commit, state, getters, rootGetters }, payload) {
    const limit = getters.getLimit(payload.type, payload.el)
    const card = getters.id(payload.cardId)
    let velocityResult = [...card.velocityRules]

    // check if id of velocity already exist in the card
    try {
      if (limit.id) {
        velocityResult = velocityResult.map(velocityRule => {
          if (velocityRule.id === limit.id) {
            return {
              ...velocityRule,
              value: payload.value
            }
          } else {
            return velocityRule
          }
        })
      } else {
        velocityResult.push({
          controls: [payload.type.toUpperCase()],
          value: payload.value,
          timeUnit: payload.timeUnit,
          timePeriod: 1,
          type: 'AMOUNT'
        })
      }

      const updateCardResponse = await updateCardLimit(payload.cardId, velocityResult)

      const response = await getCardListData()
      commit('cards/setState', response.data.data.Cards.select, { root: true })
      return updateCardResponse
    } catch (e) {
      throw e
    }
  },
  async clearLimit ({ commit, state, getters }, payload) {
    const limit = getters.getLimit(payload.type, payload.el)
    const card = getters.id(payload.cardId)
    commit('clearLimit', { ...payload, limit })
    await updateCardLimit(payload.cardId, card.velocityRules)
    const response = await getCardListData()
    commit('cards/setState', response.data.data.Cards.select, { root: true })
  },
  setLimits ({ commit }, payload) {
    commit('setLimits', payload)
  },
  setDefaultLimits ({ commit }, payload) {
    commit('setDefaultLimits', payload)
  },
  clearDefaultLimits ({ commit }, payload) {
    commit('clearDefaultLimits', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
