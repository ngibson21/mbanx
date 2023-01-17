<template>
  <div>
    <v-col cols="12" class="pa-0 pb-2">
      <CardNotification />
    </v-col>
    <v-row v-if="cards.length" key="checkCardLength">
      <template v-if="cards.length > 1">
        <v-col cols="12" class="py-0 px-0 pb-2" v-if="$vuetify.breakpoint.smAndUp">
          <CardsList @switch-card="changeCard" />
        </v-col>
      </template>
      <v-col class="pt-0">
        <v-card flat class="pa-3 py-0">
          <v-row>
            <v-col class="pb-0 pb-md-3" cols="12" md="4" order="first">
              <v-skeleton-loader
                :loading="loading"
                max-width="500"
                min-height="32"
                class="mb-4"
                type="card-heading"
              >
                <div class="d-flex">
                  <div class="text-h6 d-flex align-self-center">
                    {{ selectedCard.product && selectedCard.product.name }}
                  </div>

                  <template v-if="cards.length > 1">
                    <v-menu
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
                          {{ $t('components.cards.mobileList.selectCard') }}
                        </v-btn>
                      </template>
                      <v-card class="pa-3">
                        <CardsList @switch-card="changeCard" />
                      </v-card>
                    </v-menu>
                  </template>
                </div>
              </v-skeleton-loader>

              <Details :card="selectedCard" :loading="loading" />
            </v-col>
            <v-col cols="12" md="4" order="last">
              <p class="title">
                {{ $t('components.cards.limits.title') }}
              </p>
              <Limits :card="limit" :card-id="cardId || cards[0].id" />
              <p class="title">
                {{ $t('components.cards.regions.title') }}
              </p>
              <RegionSelection :card="selectedCard" />
            </v-col>
            <v-col cols="12" md="4" order-sm="last">
              <p class="title">
                {{ $t('components.cards.security.title') }}
              </p>
              <Security :card="selectedCard" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <NoCard v-else key="checkCardLength" />
  </div>
</template>

<script>
import CardsList from '@/components/Cards/List.vue'
import Details from '@/components/Cards/Details/Index.vue'
import Security from '@/components/Cards/Securities.vue'
import Limits from '@/components/Cards/Limits/Index.vue'
import RegionSelection from '@/components/Cards/Region/Index.vue'
import NoCard from '@/components/Cards/NoCard.vue'
import CardNotification from '@/components/Cards/Notifications/Index.vue'

export default {
  components: {
    CardsList,
    Security,
    Details,
    Limits,
    RegionSelection,
    NoCard,
    CardNotification
  },
  data () {
    return {
      loading: true,
      page: {
        title: this.$t('views.cards.header')
      },
      selectedCard: {},
      cardId: ''
    }
  },
  computed: {
    cards () {
      return this.$store.getters['cards/list']
    },
    limit () {
      return this.cards.find(card => card.id === (this.cardId || this.cards[0].id))
    }
  },
  methods: {
    changeCard (cardId) {
      this.cardId = cardId
      this.selectedCard = this.cards.find(card => card.id === cardId)
    }
  },
  async created () {
    try {
      this.$emit('page-created', this.page)
      await this.$store.dispatch('views/cardList')
      this.changeCard(this.$route.params.id || this.$store.getters['cards/list'][0]?.id)
      this.loading = false
    } catch (error) {
      throw error
    }
  }
}
</script>

<style scoped>
  .v-skeleton-loader >>> .v-skeleton-loader__card-heading .v-skeleton-loader__heading {
    margin: 0px !important;
  }
  .v-skeleton-loader >>> .v-skeleton-loader__card-heading {
    background-color: var(--v-surface-base) !important;
  }
</style>
