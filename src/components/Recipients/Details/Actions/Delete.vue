<template>
  <div>
    <v-btn
      small
      fab
      depressed
      color="background"
      class="mx-1"
      @click="deleteRecipient"
    >
      <v-icon small>
        delete
      </v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="700"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ $t('components.recipients.details.deleteRecipient') }}
        </v-card-title>

        <v-card-text>
          {{ $t('components.recipients.details.deleteRecipientDescription') }}
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="dialog = false"
          >
            {{ $t('components.recipients.details.cancel') }}
          </v-btn>
          <v-btn
            color="accent"
            @click="deleteRecipient"
          >
            {{ $t('components.recipients.details.delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  props: {
    recipientId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    async updateRecipients () {
      const page = 1
      const limit = 10
      try {
        await this.$store.dispatch('views/recipientList', {
          page,
          limit
        })
      } catch (error) {
        return error
      }
    },
    async deleteRecipient () {
      try {
        this.dialog = !this.dialog
        if (this.dialog) return
        await this.$store.dispatch('recipients/deleteRecipient', this.recipientId)
        this.$emit('hide-action-drawer')
        await this.updateRecipients()
        this.$bus.$emit('notify-with-message', this.$t('components.recipients.details.recipientHasBeenDeleted'), { flushQueue: true })
      } catch (error) {
        return error
      }
    }
  }
}
</script>
