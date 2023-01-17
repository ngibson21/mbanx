<template>
  <v-card flat :loading="loading" :disabled="loading">
    <div class="d-flex px-5 py-3 pl-3">
      <v-btn icon @click="$emit('hide-action-drawer')">
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </div>

    <div class="px-5 py-3">
      <v-card class="d-flex pa-3" flat color="quaternary">
        <div>
          <Avatar
            class="mr-3"
            color="background"
            :size="75"
            :email="recipient.email"
            :initials="recipient.creditor.name"
          />
        </div>

        <div class="mt-auto mb-1">
          <div class="title text-capitalize">
            {{ recipient.name }}
          </div>

          <div class="text-capitalize">
            {{ recipient.creditor.name }}
          </div>
        </div>

        <div class="ml-auto">
          <DeleteButton :recipient-id="recipientId" @hide-action-drawer="hideActionDrawer" />
        </div>
      </v-card>
    </div>

    <div class="d-flex flex-column px-5 py-3">
      <div>
        <NewTransfer
          @hide-action-drawer="hideActionDrawer"
          :recipient="{
            fullName: recipient.creditor.name, creditor: {
              accountNo: accountNumber,
              sortCode: sortCode
            }
          }"
        />
        <div class="pb-3">
          <div class="text-no-wrap text-caption grey--text">
            {{ $t('components.recipients.details.accountNo') }}
          </div>
          <div>{{ accountNumber }}</div>
        </div>

        <div class="pb-3" v-if="sortCode">
          <div class="text-no-wrap text-caption grey--text">
            {{ $t('components.recipients.details.sortCode') }}
          </div>
          <div>{{ sortCode }}</div>
        </div>
      </div>
    </div>

    <template v-if="$vuetify.breakpoint.smAndUp">
      <v-divider />

      <div class="pa-4 pb-2 font-weight-bold subtitle-1">
        {{ $t('components.recipients.details.transactionList') }}
      </div>

      <Transactions :items="recipient.tx" type="recipients" />
    </template>
  </v-card>
</template>

<script>
import { splitTransferIdentifier } from '@/utils/helpers.js'
import Transactions from '@/components/Transactions/ListCompact.vue'
import Avatar from '@/components/Shared/Avatar.vue'
import NewTransfer from '@/components/Recipients/Details/Actions/NewTransfer.vue'
import DeleteButton from '@/components/Recipients/Details/Actions/Delete.vue'

export default {
  data () {
    return {
      loading: true
    }
  },
  props: {
    recipientId: {
      type: Number,
      required: true
    }
  },
  async created () {
    if (this.recipientId) {
      try {
        await this.$store.dispatch('views/recipientDetails', { id: this.recipient.id, creditorId: this.recipient.creditor.identifier })
        this.loading = false
      } catch (error) {
        this.loading = false
        throw error
      }
    }
  },
  computed: {
    recipient () {
      return this.$store.getters['recipients/id'](this.recipientId) || {
        email: '',
        creditor: {
          name: ''
        }
      }
    },
    sortCode () {
      return this.splitTransferIdentifier(this.recipient.creditor.identifier).sortCode
    },
    accountNumber () {
      return this.splitTransferIdentifier(this.recipient.creditor.identifier).accountNumber
    }
  },
  methods: {
    splitTransferIdentifier,
    hideActionDrawer () {
      this.$emit('hide-action-drawer')
    }
  },
  components: {
    Avatar,
    Transactions,
    DeleteButton,
    NewTransfer
  }
}
</script>
