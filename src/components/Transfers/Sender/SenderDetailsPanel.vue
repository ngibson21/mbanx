<template>
  <layout-template header="components.transfers.new.accountSelection.title">
    <account-selection-panel />
  </layout-template>
</template>

<script>
import LayoutTemplate from '@/components/Transfers/Misc/LayoutTemplate.vue'
import AccountSelectionPanel from '@/components/Transfers/Sender/AccountSelectionPanel.vue'

export default {
  components: {
    LayoutTemplate,
    AccountSelectionPanel
  }
}
</script>
