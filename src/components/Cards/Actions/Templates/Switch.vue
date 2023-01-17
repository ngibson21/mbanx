<template>
  <v-card flat color="quaternary" class="px-3 pt-1 pb-0 mb-2">
    <v-switch
      readonly
      :loading="loading"
      :disabled="isDisabled"
      color="primary"
      :input-value="inputValue"
      @click.stop="changeSecuritySettings(action, !inputValue)"
    >
      <div slot="label" :class="isDisabled? 'grey--text':'text--primary'">
        {{ label }}
      </div>
    </v-switch>
  </v-card>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    inputValue: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    isDisabled () {
      return ['EXPIRED', 'SUSPENDED', 'ORDERED'].includes(this.card.status)
    }
  },
  methods: {
    async changeSecuritySettings (type, value) {
      if (this.loading || this.isDisabled) return
      try {
        this.loading = true
        await this.$store.dispatch(type, {
          id: this.card.id, value: value
        })
        this.loading = false
      } catch (e) {
        this.$bus.$emit('notify-with-message', e.message)
        this.loading = false
      }
    }
  }
}
</script>
