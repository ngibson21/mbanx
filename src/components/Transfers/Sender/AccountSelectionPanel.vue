<template>
  <v-expansion-panels accordion tile flat :value="0">
    <v-expansion-panel readonly>
      <v-expansion-panel-header class="text-uppercase font-weight-medium subtitle-1 flex-row-reverse align-start">
        <div class="ml-5">
          {{ $t('components.transfers.new.panel.debitAccountInfoTitle') }}
        </div>
        <template v-slot:actions>
          <check-mark :is-complete="false" />
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content class="pl-10">
        <div v-for="(account, index) in savingsAccounts" :key="index">
          <v-divider />
          <v-container>
            <v-row no-gutters>
              <v-col align-self="center" class="col-auto pr-0">
                <v-radio-group v-model="recipientDebitorNumber">
                  <v-radio :value="account.accountNumber" @change="selectAccount(account)" />
                </v-radio-group>
              </v-col>

              <v-col class="pl-0">
                <v-row no-gutters justify="space-between">
                  <v-col class="col-auto">
                    <span class="title">{{ account.product.name }}</span>
                    <div class="text-subtitle-1">
                      <account-number :account-number="account.accountNumber" />
                    </div>
                  </v-col>
                  <v-col align-self="center" class="col-auto text-end text-h6 font-weight-bold">
                    {{ $n(availableBalance(account), {key:'currency',currency: account.currency.code}) }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </div>

        <div class="text-right mt-3">
          <v-btn id="update" color="primary" v-if="inEdit" @click="updateAccountSelection">
            {{ $t('components.transfers.new.form.update') }}
          </v-btn>

          <v-btn id="next" color="primary" v-else :disabled="disableNextBtn" @click="saveAccountSelection">
            {{ $t('components.transfers.new.form.next') }}
          </v-btn>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import AccountNumber from '@/components/Shared/AccountNumber.vue'
import CheckMark from '@/components/Transfers/Panels/CheckMark.vue'

export default {
  data () {
    return {
      selectedAccount: {},
      disableNextBtn: true,
      recipientDebitorNumber: this.$store.state.transfers.newTransfer.debitorNumber || ''
    }
  },
  components: {
    AccountNumber,
    CheckMark
  },
  computed: {
    savingsAccounts () {
      return this.$store.getters['accounts/activeSavings']
    },
    inEdit () {
      return this.$store.state.transfers.inEdit
    }
  },
  methods: {
    selectAccount (account) {
      const debitAccount = {
        debitorNumber: account.accountNumber,
        debtor: account
      }
      this.selectedAccount = { ...this.selectedAccount, ...debitAccount }
    },
    saveAccountSelection () {
      this.$store.dispatch('transfers/saveRecipient', { data: this.selectedAccount, to: 'SummaryPage' })
      this.$store.dispatch('transfers/setCompleteStep', { step: 'debitAccountInfo' })
    },
    availableBalance (account) {
      return this.$store.getters['accounts/getAvailableBalance'](account)
    },
    updateAccountSelection () {
      this.$store.dispatch('transfers/updateRecipient', { data: this.selectedAccount, step: 'debitAccountInfo' })
    }
  },
  watch: {
    recipientDebitorNumber () {
      this.disableNextBtn = false
    }
  }
}
</script>

<style scoped>
.v-expansion-panel {
  border-left: 3px solid transparent;
}

.v-item--active {
  border-left-color: var(--v-primary-base);
}
</style>
