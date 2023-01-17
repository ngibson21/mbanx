<template>
  <v-row no-gutters>
    <v-col cols="12" v-if="$vuetify.breakpoint.xsOnly && this.tabItems.length > 1">
      <Widget :items="tabItems" v-if="tabItems.length">
        <Analytics slot="analytics" />
        <CardTemplate
          :title="$t('views.dashboard.cards.title')"
          see-more-link="cards"
          slot="cards"
        >
          <template #title v-if="cards.length > totalDisplayCards">
            {{ $t('views.dashboard.cards.title') }}
            <span class="pl-2 align-self-center text-body-2 grey--text">{{ cards.length }}</span>
          </template>
          <Cards
            :cards="cards"
            :size="totalDisplayCards"
          />
        </CardTemplate>
        <CardTemplate
          :title="$t('views.dashboard.accounts.title')"
          see-more-link="accounts"
          slot="accounts"
        >
          <template #title v-if="(activeAccounts.length + activeLoans.length) > totalDisplayAccounts">
            {{ $t('views.dashboard.accounts.title') }}
            <span class="pl-2 align-self-center text-body-2 grey--text">{{ (activeAccounts.length + activeLoans.length) }}</span>
          </template>
          <Accounts
            class="px-3 mb-2"
            :accounts="activeAccounts"
            :size="totalDisplayAccounts"
            color="quaternary"
          />
        </CardTemplate>
      </Widget>
      <A2HS class="pt-3" />
    </v-col>

    <v-col cols="12" md="8" class="pr-md-3" v-if="$vuetify.breakpoint.smAndUp || this.tabItems.length <= 1">
      <v-row no-gutters>
        <v-col cols="12" class="pb-md-3 pb-sm-0">
          <Analytics />
        </v-col>

        <A2HS class="pt-3" />

        <v-col cols="12" :md="this.cards.length ? '6' : '12'" v-if="$appConfig.enabled('accounts')">
          <CardTemplate
            :title="$t('views.dashboard.accounts.title')"
            class="pb-3 pb-md-0 account-list"
            :class="this.cards.length ? 'pr-md-3' : 'pr-md-0'"
            see-more-link="accounts"
          >
            <template #title v-if="(activeAccounts.length + activeLoans.length) > totalDisplayAccounts">
              {{ $t('views.dashboard.accounts.title') }}
              <span class="pl-2 align-self-center text-body-2 grey--text">{{ (activeAccounts.length + activeLoans.length) }}</span>
            </template>
            <Accounts
              :accounts="activeAccounts"
              :size="totalDisplayAccounts"
            />
          </CardTemplate>
        </v-col>

        <v-col cols="12" md="6" v-if="$appConfig.enabled('cards') && this.cards.length">
          <CardTemplate
            :title="$t('views.dashboard.cards.title')"
            see-more-link="cards"
          >
            <template #title v-if="cards.length > totalDisplayCards">
              {{ $t('views.dashboard.cards.title') }}
              <span class="pl-2 align-self-center text-body-2 grey--text">{{ cards.length }}</span>
            </template>
            <Cards
              :cards="cards"
              :size="totalDisplayCards"
            />
          </CardTemplate>
        </v-col>
      </v-row>
    </v-col>

    <v-col
      cols="12"
      md="4"
      :class="['pt-3 pt-md-0', { 'overflow-y-hidden': $vuetify.breakpoint.smAndUp }]"
    >
      <CardTemplate
        :title="$t('views.dashboard.lastTransactions.title')"
        see-more-link="transactions"
      >
        <Transactions class="px-3" :accounts="accounts.map(a => a.id)" :limit="10" type="savings" :class="{'no-height' : $vuetify.breakpoint.mdAndUp}" />
      </CardTemplate>
      <div class="fade" v-if="$vuetify.breakpoint.mdAndUp" />
    </v-col>
  </v-row>
</template>

<script>
import Analytics from '@/components/Dashboard/Analytics.vue'
import Accounts from '@/components/Dashboard/Accounts.vue'
import Cards from '@/components/Dashboard/Cards/Index.vue'
import Transactions from '@/components/Transactions/ListCompact.vue'
import CardTemplate from '@/components/Dashboard/CardTemplate.vue'
import A2HS from '@/components/Widgets/A2HS/Index.vue'
import Widget from '@/components/Dashboard/Widget.vue'

export default {
  data () {
    return {
      page: {
        fab: this.$appConfig.enabled('newTransfer') ? { name: 'newTransfer' } : {}
      },
      totalDisplayAccounts: 3,
      totalDisplayCards: 3
    }
  },
  components: {
    Analytics,
    Accounts,
    Transactions,
    CardTemplate,
    A2HS,
    Cards,
    Widget
  },
  created () {
    this.$emit('page-created', this.page)
    this.$store.dispatch('views/dashboard')
  },
  computed: {
    tabItems () {
      const defaultTabs = [
        {
          title: 'views.dashboard.analytics.title',
          name: 'analytics',
          icon: 'trending_up'
        },
        {
          title: 'views.dashboard.cards.title',
          name: 'cards',
          icon: 'credit_card'
        },
        {
          title: 'views.dashboard.accounts.title',
          name: 'accounts',
          icon: 'local_activity'
        }
      ]

      return defaultTabs.filter(tabItem => {
        if (tabItem.name === 'analytics') return true
        else if (tabItem.name === 'cards') return this.cards.length && this.$appConfig.enabled(tabItem.name)
        else return this.$appConfig.enabled(tabItem.name)
      })
    },
    accounts () {
      return this.$store.getters['accounts/list']('savings')
    },
    activeAccounts () {
      return this.$store.getters['accounts/activeSavings']
    },
    activeLoans () {
      return this.$store.getters['accounts/activeLoans']
    },
    cards () {
      return this.$store.getters['cards/list']
    }
  }
}
</script>

<style scoped>
.no-height {
  height: 0px;
}

.account-list {
  background-color: transparent !important;
}

.fade {
  position: relative;
  z-index: 1;
  bottom: 4em;
  height: 6em;
  background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, var(--v-background-base) 100%);
}
</style>
