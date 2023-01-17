<template>
  <v-form ref="form" class="d-flex flex-grow-1">
    <v-text-field
      :disabled="disabled"
      :label="$t(item.label)"
      :id="item.el"
      :value="item.value"
      :loading="loading"
      :hint="hint"
      :rules="[rules[itemTitle], value=>noZero(value)]"
      class="noArrow"
      type="number"
      inputmode="numeric"
      persistent-hint
      @input="changeLimit(itemTitle, item.el, $event)"
      @focus="onFocus = true"
      @blur="returnOldLimit(itemTitle, item.el)"
      :placeholder="item.placeholder ? $t('components.cards.limits.defaultLimit', {amount: item.placeholder}) : ''"
    >
      <template v-slot:append>
        <div class="d-flex" v-if="onFocus">
          <v-btn small text @click="returnOldLimit(itemTitle, item.el)">
            {{ $t('components.cards.limits.cancel') }}
          </v-btn>
          <v-btn
            color="primary" small
            :disabled="loading"
            @click="saveLimit(itemTitle, item.el, item.value, item.timeUnit, cardId)"
          >
            {{ $t('components.cards.limits.save') }}
          </v-btn>
        </div>
      </template>
      <template v-slot:append-outer>
        <v-icon v-if="showCloseIcon(item.value)"
                @click="clearLimit(itemTitle, item.el, item.id, cardId)"
        >
          close
        </v-icon>
      </template>
      <template v-slot:prepend-inner>
        <div class="mt-1">
          {{ currency }}
        </div>
      </template>
    </v-text-field>
  </v-form>
</template>
<script>

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    itemTitle: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    cardId: {
      type: [Number, String],
      required: true
    },
    hint: {
      type: String,
      default: ''
    },
    rules: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      onFocus: false
    }
  },
  watch: {
    cardId () {
      this.$refs.form.resetValidation()
    }
  },
  computed: {
    currency () {
      const formatter = new Intl.NumberFormat(this.$store.state.user.locale, {
        style: 'currency',
        currency: this.$store.state.application.activeCurrency,
        minimumFractionDigits: 2
      })
      return formatter.format('0')[0]
    },
    velocityRules () {
      return this.$store.getters['cards/velocityRulesById'](this.cardId)
    }
  },
  methods: {
    showCloseIcon (value) {
      if (value >= 0 && this.onFocus === false) {
        return !!value
      }
    },
    noZero (value) {
      if (value === '0') return this.$t('components.cards.limits.limitCannotBeEqualToZero')
      if (value % 1 !== 0) return this.$t('components.cards.limits.limitCannotBeADecimalNumber')
      return true
    },
    triggerBlur (el) {
      this.$refs.form.resetValidation()
      this.onFocus = false
      setTimeout(() => {
        document.getElementById(el).blur()
      }, 90)
      this.loading = false
    },
    async clearLimit (type, el, id, cardId) {
      this.$refs.form.resetValidation()
      this.loading = true
      try {
        await this.$store.dispatch('cards/removeLimitRule', [cardId, id, this.velocityRules])
        await this.$store.dispatch('cards/clearLimit', { type, el, velocityRulesIds: this.velocityRules, cardId })
      } catch (e) {
        throw e
      }
      this.loading = false
    },
    async saveLimit (type, el, value, timeUnit, cardId) {
      if (!this.$refs.form.validate()) return
      if (!value) return
      if (value.charAt(0) === '0') {
        value = value.replace(/^0+/, '')
      }
      this.loading = true
      try {
        const response = await this.$store.dispatch('cards/saveLimit', { type, el, value, timeUnit, cardId, velocityRulesIds: this.velocityRules })

        if (response.data?.errors?.length) {
          this.$bus.$emit('notify-with-message', response.data.errors[0].message, { flushQueue: true })
        }
      } catch (e) {
        throw e
      }
      this.triggerBlur(el)
    },
    returnOldLimit (type, el) {
      this.$store.dispatch('cards/returnOldLimit', { type, el })
      this.triggerBlur(el)
    },
    changeLimit (type, el, value) {
      this.$store.dispatch('cards/changeLimit', { type, el, value })
    }
  }
}
</script>

<style>
/* Chrome, Safari, Edge, Opera */
.noArrow input::-webkit-outer-spin-button,
.noArrow input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.noArrow input[type=number] {
  -moz-appearance:textfield;
}
</style>
