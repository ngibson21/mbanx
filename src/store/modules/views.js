import getInitialData from '@/api/views/initialData.js'
import getDashboardData from '@/api/views/dashboard.js'
import getAccountListData from '@/api/views/accounts/accountList.js'
import getCurrentAccountDetailsData from '@/api/views/accounts/currentAccountDetails.js'
import getLoanAccountDetailsData from '@/api/views/accounts/loanAccountDetails.js'
import getTransactionListData from '@/api/views/transactions/transactionList.js'
import getTransactionDetailsData from '@/api/views/transactions/transactionDetails.js'
import getCommunicationListData from '@/api/views/communications.js'
import { cardsList as getCardsListData } from '@/api/views/cards/index.js'
import getRecipientListData from '@/api/views/recipients/recipientList.js'
import getRecipientDetailsData from '@/api/views/recipients/recipientDetails.js'

const actions = {
  async initialLoading ({ commit, dispatch, rootGetters }) {
    try {
      const currentDate = new Date()
      const beginningLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      const response = await getInitialData({ beginningLastMonth, currentDate })
      const user = { appUser: response.data.data.AppUsers.select[0], client: response.data.data.Clients.select[0] }

      commit('user/update', user, { root: true })
      commit('accounts/updateSavings', response.data.data.SavingsAccounts.select, { root: true })
      if (rootGetters['accounts/activeSavings'].length <= 0) {
        throw new Error('noActiveSavings')
      }
      commit('transactions/updateTransactions', { txs: response.data.data.SavingsAccountTransactions.tx, type: 'savings' }, { root: true })

      await dispatch('views/dashboard', null, { root: true })
    } catch (e) {
      throw e
    }
  },
  async dashboard ({ commit, rootGetters }) {
    try {
      const savingsIds = rootGetters['accounts/list']('savings').map(acc => acc.id)
      const cards = await getCardsListData() // break down the big query, retrieve cards separatly
      const response = await getDashboardData({ savingsIds })

      commit('accounts/updateSavings', response.data.data.SavingsAccounts.select, { root: true })
      commit('application/updateActiveCurrency', response.data.data.SavingsAccounts.select[0].currency.code, { root: true })
      let newTx = []
      savingsIds.forEach(id => {
        const latestTx = response.data.data[`latestTxSavings${id}`]?.select || []
        const pagedTx = response.data.data[`pagedTxSavings${id}`] ?.select || []
        newTx = newTx.concat(latestTx).concat(pagedTx)
      })
      commit('transactions/updateTransactions', { txs: newTx, type: 'savings' }, { root: true })
      commit('transactions/updateHoldTx', response.data.data.AuthorizeTransactions.select, { root: true })
      commit('cards/setState', cards.data.data.Cards.select, { root: true })
    } catch (e) {
      throw e
    }
  },
  async accountList ({ commit }) {
    try {
      const response = await getAccountListData()

      commit('accounts/updateSavings', response.data.data.SavingsAccounts.select, { root: true })
      commit('accounts/updateLoan', response.data.data.Loans.select, { root: true })
    } catch (e) {
      throw e
    }
  },
  async currentAccountDetails ({ commit }, id) {
    try {
      const response = await getCurrentAccountDetailsData(id)

      commit('accounts/updateSavingsDetails', response.data.data.SavingsAccount, { root: true })
      commit('transactions/updateTransactions', { txs: response.data.data.SavingsAccountTransactions.tx, type: 'savings' }, { root: true })
      commit('transactions/updateHoldTx', response.data.data.AuthorizeTransactions.select, { root: true })
    } catch (e) {
      throw e
    }
  },
  async loanAccountDetails ({ commit }, loanId) {
    try {
      const response = await getLoanAccountDetailsData(loanId)

      commit('accounts/updateLoanDetails', response.data.data.Loan, { root: true })
      commit('transactions/updateTransactions', { txs: response.data.data.LoanTransactions.select, type: 'loan' }, { root: true })
    } catch (e) {
      throw e
    }
  },
  async transactionList ({ commit, rootGetters, dispatch }, { accounts, page, limit }) {
    try {
      const response = await getTransactionListData({ accounts, page, limit })

      commit('accounts/updateSavings', response.data.data.SavingsAccounts.select, { root: true })
      commit('accounts/updateTotalTx', response.data.data, { root: true })

      let newTx = []
      accounts.forEach(id => {
        const latestTx = response.data.data[`latestTxSavings${id}`]?.select || []
        const pagedTx = response.data.data[`pagedTxSavings${id}`]?.select || []

        newTx = newTx.concat(latestTx).concat(pagedTx)
      })
      commit('transactions/updateTransactions', { txs: newTx, type: 'savings' }, { root: true })
      commit('transactions/updateHoldTx', response.data.data.AuthorizeTransactions.select, { root: true })
    } catch (e) {
      throw e
    }
  },
  async transactionDetails ({ commit }, id) {
    const response = await getTransactionDetailsData(id)

    commit('transactions/updateTransactionDetails', response.data.data.SavingsAccountTransaction, { root: true })
  },
  async communicationList ({ commit }, { page, limit }) {
    const response = await getCommunicationListData({ page, limit })

    commit('communications/updateCommunications', response.data.data, { root: true })
  },
  async cardsList ({ commit }) {
    try {
      const response = await getCardsListData()
      commit('cards/setState', response.data.data.Cards.select, { root: true })
    } catch (e) {
      throw e
    }
  },
  async recipientList ({ commit }, { page, limit }) {
    try {
      const response = await getRecipientListData({ page, limit })
      const latestItems = response.data.data?.latest?.select || []
      const pagedItems = response.data.data?.paged?.select || []
      const fetchedItems = latestItems.concat(pagedItems)
      const allItemIDs = response.data.data.total.select

      commit('recipients/updateRecipients', { fetchedItems, allItemIDs }, { root: true })
    } catch (e) {
      throw e
    }
  },
  async recipientDetails ({ commit }, { id, creditorId }) {
    try {
      const response = await getRecipientDetailsData({ id, creditorId })

      commit('recipients/updateRecipientDetails', Object.assign(response.data.data.Recipient, response.data.data.Transfers), { root: true })
    } catch (e) {
      throw e
    }
  }
}

export default {
  namespaced: true,
  actions
}
