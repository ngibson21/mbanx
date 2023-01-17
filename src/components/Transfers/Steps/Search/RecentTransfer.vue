<template>
  <div>
    <v-card flat color="transparent">
      <v-card-title class="px-0 pt-0">
        {{ $t('components.transfers.recent.recentTransfers') }}
      </v-card-title>

      <v-row no-gutters>
        <v-col cols="12" md="6" lg="4" class="pa-3 py-2" v-for="(n,index) in limit" :key="index">
          <v-skeleton-loader :loading="loading" type="list-item-avatar-two-line">
            <div>
              <v-card class="rounded-card" flat v-if="transferDetails.length !== 0">
                <div class="d-flex" v-if="transferDetails[index]">
                  <v-list-item @click="initialTransfer(transferDetails[index])">
                    <v-list-item-avatar>
                      <Avatar
                        :email="avatarEmails[index]"
                        :initials="transferDetails[index] && transferDetails[index].creditor.name"
                      />
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        {{ transferDetails[index] && transferDetails[index].creditor.name }}
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        {{ dayjs(transferDetails[index] && transferDetails[index].valueDate).format('MMMM DD, YYYY') }}
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <p class="title text-no-wrap my-auto">
                      {{ $n(transferDetails[index] && transferDetails[index].amount, 'currency') }}
                    </p>
                  </v-list-item>
                </div>
              </v-card>
            </div>
          </v-skeleton-loader>
        </v-col>

        <div v-if="transferDetails.length === 0 && !loading" class="d-flex justify-center mx-auto">
          {{ $t('components.transfers.recent.noRecentTransfer') }}
        </div>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import Avatar from '@/components/Shared/Avatar.vue'
import { getTransfers } from '@/api/views/transfers.js'
import dayjs from 'dayjs'
import getEmails from '@/api/views/recipients/recipientEmail.js'

export default {
  data () {
    return {
      loading: true,
      transferDetails: [],
      avatarEmails: [],
      noRecentTransfers: false,
      limit: 3
    }
  },
  components: {
    Avatar
  },
  computed: {
    getRecentTransferIdentifiers () {
      const identifiers = []
      this.transferDetails.map(detail => identifiers.push(detail.creditor.identifier))
      return identifiers
    }
  },
  async mounted () {
    try {
      await this.getRecentTransfers()
      await this.getRecentTransfersEmails()
      this.loading = false
    } catch (error) {
      this.loading = false
      return error
    }
  },
  methods: {
    dayjs,
    async getRecentTransfers () {
      try {
        const result = await getTransfers({ limit: this.limit })
        this.transferDetails = result.data.data.Transfers.select
      } catch (error) {
        return error
      }
    },
    async getRecentTransfersEmails () {
      try {
        const emails = await getEmails(this.getRecentTransferIdentifiers)
        Object.keys(emails.data.data).map(data => {
          this.avatarEmails.push(emails.data.data[data].select[0]?.email)
        })
      } catch (error) {
        return error
      }
    },
    initialTransfer (recipient) {
      this.$emit('initialTransfer', recipient)
    }
  }
}
</script>

<style scoped>
  .v-skeleton-loader, .rounded-card {
    border-radius: 50px !important;
  }
  .v-skeleton-loader >>> .v-skeleton-loader__list-item-avatar-two-line {
    background-color: var(--v-surface-base) !important;
  }

  /** modify v-list onClick border */
  .v-list-item::before{
    color: transparent
  }
  .v-list-item:hover{
    border-radius: 50px !important;
  }
</style>
