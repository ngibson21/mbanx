<template>
  <section id="transfer-type-panel">
    <h4 class="mb-3">
      {{ $t('components.transfers.new.paymentType.normalTransferTitle') }}
    </h4>
    <div v-for="option in normalTransferOptions" :key="option.name">
      <v-divider />
      <v-container>
        <v-row no-gutters>
          <v-col align-self="center" class="col-auto pr-0">
            <v-radio-group v-model="selectedTransferType">
              <v-radio :value="option.value" />
            </v-radio-group>
          </v-col>

          <v-col class="pl-0 align-self-center">
            <v-row no-gutters justify="space-between">
              <v-col class="col-auto">
                <h4>{{ option.name }}</h4>
                <div class="text-subtitle-1 grey--text text--lighten-1">
                  {{ option.description }}
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="text-right mt-3">
      <v-btn id="update" color="primary" v-if="inEdit" @click="updateTransferType">
        {{ $t('components.transfers.new.form.update') }}
      </v-btn>

      <v-btn id="next" color="primary" v-else :disabled="disableNextBtn" @click="saveTransferType">
        {{ $t('components.transfers.new.form.next') }}
      </v-btn>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      selectedTransferType: this.$store.state.transfers.newTransfer?.paymentType?.value || '',
      paymentType: { ...this.$store.state.transfers.newTransfer?.paymentType } || {},
      normalTransferOptions: this.$store.state.transfers.transferOptions.normal,
      allTransferOptions: this.$store.getters['transfers/getAllTransferOptions'],
      disableNextBtn: true
    }
  },
  methods: {
    saveTransferType () {
      this.$store.dispatch('transfers/saveRecipient', { data: { paymentType: this.paymentType }, to: 'SummaryPage' })
      this.$store.dispatch('transfers/setCompleteStep', { step: 'transferTypeInfo' })
    },
    updateTransferType () {
      this.$store.dispatch('transfers/updateRecipient', { data: { paymentType: this.paymentType }, step: 'transferTypeInfo' })
    }
  },
  computed: {
    inEdit () {
      return this.$store.state.transfers.inEdit
    },
    transfer () {
      return this.$store.state.transfers.newTransfer
    }
  },
  watch: {
    selectedTransferType () {
      this.disableNextBtn = false
      this.paymentType = this.allTransferOptions.find(({ value }) => value === this.selectedTransferType)
    }
  }
}
</script>
