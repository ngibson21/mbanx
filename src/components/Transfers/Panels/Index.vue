<template>
  <layout-template header="components.transfers.new.panel.title" discardable>
    <v-expansion-panels accordion tile flat :value="expandStep">
      <v-expansion-panel readonly>
        <v-divider />
        <v-expansion-panel-header class="title flex-row-reverse align-start">
          <div class="pl-5">
            {{ $t('components.transfers.new.panel.recipientDetailsInfoTitle') }}
            <section id="recipient-details-panel-preview" v-show="expandStep !== 0">
              <recipient-details-panel-preview />
            </section>
          </div>
          <template v-slot:actions>
            <check-mark :is-complete="completedStep.recipientAccountInfo" />
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <recipient-details-panel class="pa-5" />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel readonly>
        <v-divider />
        <v-expansion-panel-header class="title flex-row-reverse align-start">
          <div class="pl-5">
            {{ $t('components.transfers.new.panel.transferDetailsInfoTitle') }}
            <section id="transfer-details-panel-preview" v-show="expandStep !== 1">
              <transfer-details-panel-preview />
            </section>
          </div>
          <template v-slot:actions>
            <check-mark :is-complete="completedStep.transferAccountInfo" />
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <transfer-details-panel class="pa-5" />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel readonly>
        <v-divider />
        <v-expansion-panel-header class="title flex-row-reverse align-start">
          <div class="pl-5">
            {{ $t('components.transfers.new.panel.debitAccountInfoTitle') }}
            <section id="account-selection-panel-preview" v-show="expandStep !== 2">
              <account-selection-panel-preview />
            </section>
          </div>
          <template v-slot:actions>
            <check-mark :is-complete="completedStep.debitAccountInfo" />
          </template>
        </v-expansion-panel-header>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-content class="surface2">
          <summary-panel />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </layout-template>
</template>

<script>
import LayoutTemplate from '@/components/Transfers/Misc/LayoutTemplate.vue'
import RecipientDetailsPanel from '@/components/Transfers/Receiver/RecipientDetailsPanel.vue'
import RecipientDetailsPanelPreview from '@/components/Transfers/Receiver/RecipientDetailsPanelPreview.vue'
import TransferDetailsPanel from '@/components/Transfers/Receiver/TransferDetailsPanel.vue'
import TransferDetailsPanelPreview from '@/components/Transfers/Receiver/TransferDetailsPanelPreview.vue'
import AccountSelectionPanelPreview from '@/components/Transfers/Sender/AccountSelectionPanelPreview.vue'
import SummaryPanel from '@/components/Transfers/Summary'
import CheckMark from '@/components/Transfers/Panels/CheckMark.vue'

export default {
  name: 'TransferPanels',
  computed: {
    navigationStep () {
      return this.$store.state.transfers.transferStep
    },
    completedStep () {
      return this.$store.state.transfers.isCompletedStep
    },
    expandStep () {
      let expansionIndex

      switch (this.navigationStep) {
        case 'TransferDetails':
          expansionIndex = 1
          break
        case 'SummaryPage':
          expansionIndex = 3
          break
        case 'CreditDetails':
        default:
          expansionIndex = 0
          break
      }

      return expansionIndex
    }
  },
  components: {
    LayoutTemplate,
    RecipientDetailsPanel,
    RecipientDetailsPanelPreview,
    TransferDetailsPanel,
    TransferDetailsPanelPreview,
    AccountSelectionPanelPreview,
    SummaryPanel,
    CheckMark
  }
}
</script>

<style scoped>
.v-expansion-panel {
  border-left: 3px solid transparent;
}

.v-expansion-panel-header {
  cursor: default;
}

.v-item--active {
  border-left-color: var(--v-primary-base);
}

.v-expansion-panel-content >>> .v-expansion-panel-content__wrap {
  padding: 0;
}
</style>
