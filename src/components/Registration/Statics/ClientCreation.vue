<template>
  <div>
    <div class="text-h4 primary--text font-weight-bold mb-4 px-0 px-md-6">
      Sign up
    </div>
    <div class="pb-5 pt-3">
      <v-card class="py-4 mt-4 mb-6 rounded-lg px-2 px-md-6" elevation="2">
        <form-creator
          :name="formName"
          :ref="formName"
          :schema="schema"
          :value="formData"
          :form-errors="getFormErrorModel(schema)"
        />
        <v-row wrapp>
          <v-col xs="7" md="4">
            <v-btn x-large class="mt-3" block @click="redirect('login')" :disabled="loading">
              <v-icon left>
                arrow_back
              </v-icon>
              {{ $t('components.registration.backToSignIn') }}
            </v-btn>
          </v-col>
          <v-col xs="5" md="8">
            <v-btn x-large class="primary mt-3" block @click="submit" :loading="loading" :disabled="loading">
              {{ $t('components.registration.next') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import FormCreator from '@/components/Shared/Form/Builder/Index.vue'
import { formErrorsModel } from '@/components/Shared/Form/Builder/errorHandling.js'

export default {
  components: {
    FormCreator
  },
  data () {
    return {
      loading: false,
      formData: {},
      formName: 'CustomerCreation',
      schema: [
        {
          name: 'firstName',
          label: 'components.registration.customerCreation.fields.firstName.label',
          element: 'InputText',
          rules: [
            'required'
          ]
        },
        {
          name: 'lastName',
          label: 'components.registration.customerCreation.fields.lastName.label',
          element: 'InputText',
          rules: [
            'required'
          ]
        },
        {
          name: 'email',
          label: 'components.registration.customerCreation.fields.email.label',
          element: 'InputEmail',
          rules: [
            'required'
          ]
        },
        {
          name: 'password',
          label: 'components.registration.customerCreation.fields.password.label',
          element: 'InputPassword',
          rules: [
            'required'
          ]
        },
        {
          name: 'repeatPassword',
          label: 'components.registration.customerCreation.fields.repeatPassword.label',
          element: 'InputPassword',
          rules: [
            'required'
          ]
        },
        {
          name: 'acceptanceOfTC',
          label: 'components.registration.customerCreation.fields.acceptanceOfTC.label',
          element: 'InputCheckbox',
          rules: [
            'required'
          ]
        }
      ]
    }
  },
  methods: {
    redirect (path) {
      this.$router.push({
        name: path
      })
    },
    getFormErrorModel (schema) {
      return formErrorsModel(schema)
    },
    validateRepeatPassword () {
      if (this.formData.password !== this.formData.repeatPassword) {
        this.$bus.$emit('notify-with-message', 'Password not match', { flushQueue: true })
        return false
      }

      return true
    },
    async submit () {
      if (this.$refs[this.formName].validate() && this.validateRepeatPassword()) {
        this.loading = true
        try {
          await this.$store.dispatch('registration/registerClient', this.formData)
          await this.$store.dispatch('registration/createClient', this.formData)
          await this.$store.dispatch('registration/goNext', this.formData)
        } catch (e) {
          if (e?.errors.length > 0 && e?.errors[0]?.message) {
            this.$bus.$emit('notify-with-message', e?.errors[0]?.message, { flushQueue: true })
          }
        } finally {
          this.loading = false
        }
      }
    }
  }
}
</script>
