const getDefaultState = () => {
  return {
    savingsAccounts: [],
    loanAccounts: []
  }
}

const state = getDefaultState()

const getters = {
  list: (state) => type => {
    // loan || savings || share
    return state[`${type}Accounts`]
  },
  activeSavings: (state, getters) => {
    return getters.list('savings').filter(account => account.status === 300)
  },
  activeLoans: (state, getters) => {
    return getters.list('loan').filter(loan => loan.loanStatus === 300)
  },
  getById: (state, getters) => (type, id) => {
    return getters.list(type).find(account => {
      return account.id === parseInt(id)
    })
  },
  getByAccountNumber: (state) => (accountNumber) => {
    return state.savingsAccounts.find(account => {
      return account.accountNumber === accountNumber
    })
  },
  getAvailableBalance: (state, getters) => ({ id }) => {
    const {
      summary: { accountBalance },
      minimumRequiredOpeningBalance,
      overdraftLimit,
      minimumRequiredBalanceEnforced,
      onHoldFunds,
      savingsOnHoldAmount
    } = getters.getById('savings', id)

    let availableBalance = accountBalance

    if (minimumRequiredBalanceEnforced) availableBalance -= minimumRequiredOpeningBalance

    if (overdraftLimit) availableBalance += overdraftLimit

    if (onHoldFunds) availableBalance -= onHoldFunds

    if (savingsOnHoldAmount) availableBalance -= savingsOnHoldAmount

    if (availableBalance < 0) availableBalance = 0

    return availableBalance
  },
  getTotalAvailableBalanceByCurrency: (state, getters) => accounts => {
    const result = {}

    accounts.forEach(account => {
      const { code } = account.currency
      const availableBalance = getters.getAvailableBalance(account)

      if (code) {
        result[code] = result[code] ? (result[code] += availableBalance) : availableBalance
      }
    })

    return result
  }
}

const mutations = {
  resetState (state) {
    Object.assign(state, getDefaultState())
  },
  updateSavings (state, updatedData) {
    updatedData.map(updatedSavings => {
      const updatedCache = state.savingsAccounts.find((cache, index) => {
        if (cache.id === updatedSavings.id) {
          state.savingsAccounts.splice(index, 1, {
            ...state.savingsAccounts[index],
            accountNumber: updatedSavings.accountNumber,
            minimumRequiredOpeningBalance: updatedSavings.minimumRequiredOpeningBalance,
            overdraftLimit: updatedSavings.overdraftLimit,
            minimumRequiredBalanceEnforced: updatedSavings.minimumRequiredBalanceEnforced,
            onHoldFunds: updatedSavings.onHoldFunds,
            savingsOnHoldAmount: updatedSavings.savingsOnHoldAmount,
            product: { ...state.savingsAccounts[index].product, ...updatedSavings.product },
            currency: { ...state.savingsAccounts[index].currency, ...updatedSavings.currency },
            summary: { ...state.savingsAccounts[index].summary, ...updatedSavings.summary },
            status: updatedSavings.status
          })
          return true
        }
        return false
      })

      if (!updatedCache) state.savingsAccounts.push(updatedSavings)
    })
  },
  updateSavingsDetails (state, savingsDetails) {
    state.savingsAccounts.find((acc, index) => {
      return (acc.id === savingsDetails.id) ? state.savingsAccounts.splice(index, 1, savingsDetails) : false
    })
  },
  updateLoan (state, loanAccounts) {
    loanAccounts.forEach(updatedLoan => {
      const isCacheUpdated = state.loanAccounts.find((cache, index) => {
        if (cache.id === updatedLoan.id) {
          state.loanAccounts.splice(index, 1, {
            ...state.loanAccounts[index],
            accountNumber: updatedLoan.accountNumber,
            product: { ...state.loanAccounts[index].product, ...updatedLoan.product },
            summary: { ...state.loanAccounts[index].summary, ...updatedLoan.summary },
            productDetail: {
              ...state.loanAccounts[index].productDetail,
              currency: { ...state.loanAccounts[index].productDetail.currency, ...updatedLoan.productDetail.currency }
            },
            loanStatus: updatedLoan.loanStatus
          })
          return true
        }
        return false
      })

      if (!isCacheUpdated) state.loanAccounts.push(updatedLoan)
    })
  },
  updateLoanDetails (state, loanDetails) {
    state.loanAccounts.find((loan, index) => {
      return (loan.id === loanDetails.id) ? state.loanAccounts.splice(index, 1, loanDetails) : false
    })
  },
  updateTotalTx (state, payload) {
    state.savingsAccounts = state.savingsAccounts.map(acc => {
      return {
        ...acc,
        totalTx: payload[`totalTxSavings${acc.id}`]?.total || acc.totalTx || 0
      }
    })
  }
}

const actions = {
  resetState ({ commit }) {
    commit('resetState')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
