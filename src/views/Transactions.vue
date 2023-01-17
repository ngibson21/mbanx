<template>
  <v-row no-gutters>
    <v-col>
      <v-card flat>
        <template v-if="savingAccounts.length > 1">
          <v-col no-gutters class="d-inline-flex">
            <h2 v-if="$vuetify.breakpoint.smAndUp" class="text-body-2">
              {{ $t('views.transactions.accountsFilter.filter') }}
            </h2>

            <template>
              <v-menu
                :close-on-content-click="false"
                v-if="$vuetify.breakpoint.xsOnly"
                transition="slide-y-transition"
                offset-y
                min-width="95%"
              >
                <template v-slot:activator="{ on }">
                  <v-btn class="d-flex ml-auto" v-on="on" color="primary" rounded>
                    <v-icon left>
                      keyboard_arrow_down
                    </v-icon>
                    {{ $t('views.transactions.accountsFilter.filter') }}
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text>
                    <AccountSelections
                      :selected-accounts="selectedAccounts"
                      :tx-loading="loading"
                      @updated-selected-accounts="selectedAccounts = $event"
                    />
                  </v-card-text>
                </v-card>
              </v-menu>
            </template>
          </v-col>

          <v-col class="py-0" no-gutters v-if="$vuetify.breakpoint.smAndUp">
            <AccountSelections
              :selected-accounts="selectedAccounts"
              :tx-loading="loading"
              @updated-selected-accounts="selectedAccounts = $event"
            />
          </v-col>
        </template>

        <v-col v-if="selectedAccounts.length < 1" class="text-center">
          {{ $t('components.transactions.list.noSelectAcc') }}
        </v-col>

        <v-col v-else>
          <v-row no-gutters>
            <v-col>
              <List
                :accounts="selectedAccounts"
                @loading="loading = $event"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AccountSelections from '@/components/Transactions/AccountSelection.vue'
import List from '@/components/Transactions/List.vue'

export default {
  components: {
    AccountSelections,
    List
  },
  data () {
    return {
      page: {
        title: this.$t('views.transactions.header')
      },
      loading: false
    }
  },
  computed: {
    savingAccounts () {
      return this.$store.getters['accounts/list']('savings')
    },
    selectedAccounts: {
      get () {
        return this.$store.getters['application/selectedAccounts']?.slice() || []
      },
      set (newValue) {
        this.$store.dispatch('application/setSelectedAccount', newValue)
      }
    }
  },
  created () {
    if (!this.$store.getters['application/selectedAccounts']) {
      this.$store.dispatch('application/setSelectedAccount', this.savingAccounts.map(acc => acc.id))
    }
    this.$emit('page-created', this.page)
  }
}
</script>
