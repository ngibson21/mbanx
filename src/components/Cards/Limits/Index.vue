<template>
  <div>
    <Note v-if="!isCardBlocked && defaultCardLimit.length !== 0" />

    <v-list two-line class="pa-0" :disabled="isCardBlocked">
      <v-list-group
        v-for="limit in limits"
        :key="limit.type"
        v-model="active[limit.type]"
      >
        <template v-slot:activator class="pa-0">
          <v-icon left :color="isCardBlocked ? 'grey' : 'primary'">
            tune
          </v-icon>
          <v-list-item-content :class="{ 'text-subtitle-1 pb-md-2': true, 'grey--text': isCardBlocked }">
            {{ $t(limit.title) }}
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="(subItem) in limit.items"
          :key="subItem.el"
        >
          <Input
            :item-title="limit.type"
            :card-id="cardId"
            :item="subItem"
            :hint="messages({type: limit.type, timeUnit: subItem.timeUnit})"
            :rules="rules"
          />
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
import Input from '@/components/Cards/Limits/Input.vue'
import Note from '@/components/Cards/Limits/Note.vue'
export default {
  props: {
    card: {
      type: Object,
      required: true
    },
    cardId: {
      type: Number,
      required: true
    }
  },
  components: {
    Input,
    Note
  },
  data () {
    return {
      active: {
        purchase: false,
        withdrawal: false
      }
    }
  },
  computed: {
    limits () {
      return this.$store.state.cards.limits
    },
    purchase () {
      return this.$store.getters['cards/purchase']
    },
    withdrawal () {
      return this.$store.getters['cards/withdrawal']
    },
    rules () {
      return {
        purchase: value => { return this.checkAmount(value, 'purchase') },
        withdrawal: value => { return this.checkAmount(value, 'withdrawal') }
      }
    },
    isCardBlocked () {
      return ['EXPIRED', 'SUSPENDED', 'ORDERED'].includes(this.card.status)
    },
    cardLimit () {
      return this.card.velocityRules
    },
    defaultCardLimit () {
      return this.card.product.velocityRules
    }
  },
  watch: {
    card (newVal, oldVal) {
      this.$store.dispatch('cards/setLimits', this.cardLimit)

      if (this.isCardBlocked) return
      this.active.purchase = false
      this.active.withdrawal = false
    },
    isCardBlocked (val) {
      if (val) {
        Object.keys(this.active).map(key => {
          this.active[key] = false
        })
      }
    },
    cardLimit (limits) {
      if (limits.length === 0) {
        this.setDefaultLimits()
      }
      this.clearLimit(limits)
    }

  },
  created () {
    this.setDefaultLimits()
    this.$store.dispatch('cards/setLimits', this.cardLimit)
  },
  methods: {
    clearLimit (limits) {
      const types = ['purchase', 'withdrawal']
      const controls = []
      limits.map(limit => {
        controls.push(limit.controls[0])
      })
      types.map(type => {
        if ([...new Set(controls)].includes(type.toUpperCase())) {
          return this.$store.dispatch('cards/clearDefaultLimits', type)
        }
        this.$store.dispatch('cards/setDefaultLimits', { defaultCardLimit: [...this.defaultCardLimit], types: [type] })
      })
    },
    setDefaultLimits () {
      this.$store.dispatch('cards/setDefaultLimits', { defaultCardLimit: [...this.defaultCardLimit], types: ['purchase', 'withdrawal'] })
    },
    messages (limits) {
      const timeType = ['seconds', 'days', 'weeks', 'months']
      const index = timeType.indexOf(limits.timeUnit)
      const lastArray = timeType.length - 1 === index
      const text = lastArray ? 'amountCannotBeLower' : 'amountCannotBeHigher'
      const timeUnit = timeType[index + 1] || timeType[index - 1]

      return this.$t(`components.cards.limits.${text}`, {
        amount: this[limits.type]?.[timeUnit]?.savedValue || this.$t(`components.cards.limits.${timeUnit}Limit`).toLowerCase()
      })
    },
    checkAmount (value, type) {
      if (!value) return ''
      const { seconds, days, weeks, months } = this[type]
      const allValues = [seconds?.value, days?.value, weeks?.value, months?.value]
      const indexOfValue = allValues.indexOf(value)

      let nextIndex = indexOfValue
      let previousIndex = indexOfValue
      let validated = true

      allValues.forEach((element) => {
        nextIndex++
        if (allValues[nextIndex] && allValues[indexOfValue] > allValues[nextIndex]) {
          validated = this.$t('components.cards.limits.amountCannotBeHigher', { amount: allValues[nextIndex] })
        }
        previousIndex--
        if (allValues[previousIndex] && allValues[indexOfValue] < allValues[previousIndex]) {
          validated = this.$t('components.cards.limits.amountCannotBeLower', { amount: allValues[previousIndex] })
        }
      })

      return validated
    }
  }
}
</script>
