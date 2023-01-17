<template>
  <v-card flat class="wrapper">
    <div :class="`pa-${$vuetify.breakpoint.smAndUp ? 5 : 3} quaternary sticky-header d-flex`">
      <div class="flex-shrink-1">
        <v-btn icon @click="$emit('hide-action-drawer')">
          <v-icon key="close-icon">
            arrow_back
          </v-icon>
        </v-btn>
      </div>

      <div class="title pl-3 pt-1">
        {{ $t('components.recipients.new.title') }}
      </div>
    </div>

    <div class="pt-8 pb-8 pb-sm-4 px-4">
      <div class="font-weight-bold pl-4">
        {{ $t('components.recipients.new.baseInfo') }}
      </div>

      <v-form ref="form" class="px-4">
        <component
          :is="formState.type"
          :focused-field="formState.focusedField"
          :parent-form-data="formData"
          @data-changed="updateFormData"
          :allow-character-set="allowCharacterSet"
          :validate-characters-field="validateCharactersField"
        />
      </v-form>

      <v-list>
        <v-list-group no-action color>
          <template v-slot:activator>
            <v-list-item-content>
              <div class="font-weight-bold">
                {{ $t('components.recipients.new.additionalInfo') }}
              </div>
            </v-list-item-content>
          </template>

          <v-list class="px-4">
            <v-form ref="optionalForm">
              <v-text-field
                v-for="item in optionalFields"
                v-model="formData[item.model]"
                :rules="Object.values(item.rules)"
                :type="item.type"
                :key="item.label"
                :label="item.label"
                v-cleave="item.inputFormat"
              />
            </v-form>
          </v-list>
        </v-list-group>
        <div class="pt-5 d-flex justify-center">
          <v-btn
            class="px-12"
            depressed
            color="primary"
            :loading="loading"
            :disabled="loading"
            @click="saveRecipient"
          >
            {{ $t('components.recipients.new.save') }}
          </v-btn>
        </div>
      </v-list>
    </div>
  </v-card>
</template>

<script>
import domestic from '@/components/Shared/DetectTypes/DomesticType.vue'
import { allowCharacterSet, validateCharactersField } from '@/components/Transfers/Misc/charactersRules.js'
import { createRecipient, validateRecipient } from '@/api/views/recipients/createRecipient.js'

export default {
  data () {
    return {
      allowCharacterSet,
      validateCharactersField,
      formState: {
        type: 'domestic',
        focusedField: 'nickname'
      },
      formData: {},
      loading: false
    }
  },
  computed: {
    optionalFields () {
      return [
        {
          label: this.$t('components.recipients.new.email'),
          model: 'email',
          type: 'email',
          rules: {
            email: value => {
              const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              if (!value) return true
              return emailRegex.test(value) || this.$t('components.recipients.new.validation.email')
            }
          },
          inputFormat: null
        },
        {
          label: this.$t('components.recipients.new.mobile'),
          model: 'mobile',
          type: 'tel',
          rules: {},
          inputFormat: { phone: true, phoneRegionCode: 'US' }
        },
        {
          label: this.$t('components.recipients.new.transferReference'),
          model: 'transferRefId',
          type: 'text',
          rules: {},
          inputFormat: null
        }
      ]
    }
  },
  methods: {
    updateFormData (data) {
      this.formData = { ...this.formData, ...data }
    },
    async saveRecipient (data) {
      if (!this.$refs.form.validate()) return
      if (this.$refs.optionalForm && !this.$refs.optionalForm.validate()) return
      this.loading = true
      try {
        await validateRecipient(this.formData.nickname)

        await createRecipient(this.formData)
        await this.$store.dispatch('views/recipientList', {
          page: 1,
          limit: 10
        })
        this.$bus.$emit('notify-with-message', this.$t('components.recipients.new.success.message', { nickname: this.formData.nickname }))
        this.$emit('hide-action-drawer')
        this.loading = false
      } catch (error) {
        this.loading = false

        if (error.message === 'recipient_exist') {
          return this.$bus.$emit('notify-with-message', this.$t('components.recipients.new.validation.alreadyExist'))
        }

        throw error
      }
    }
  },
  components: {
    domestic
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
}
.sticky-header {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 1;
}
</style>
