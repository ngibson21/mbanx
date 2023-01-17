<template>
  <div>
    <div class="text-h4 primary--text font-weight-bold mb-4 px-6">
      Company address
    </div>
    <v-card
      class="py-4 px-6 mt-4 mb-4 rounded-lg"
      elevation="2"
    >
      <div>
        <form-creator
          ref="form1"
          name="companyAddress"
          :value="{}"
          :form-errors="getFormErrorModel(schemaSection1)"
          :schema="schemaSection1"
          @input="updateValue"
        />
        <div class="text-h6 primary--text font-weight-bold mb-2">
          Registration address details
        </div>
        <form-creator
          ref="form2"
          name="companyAddress"
          :value="formData"
          :form-errors="getFormErrorModel(schemaSection2)"
          :schema="schemaSection2"
          @input="updateValue"
        />
      </div>
    </v-card>
    <div class="px-6">
      <div class="d-flex justify-space-between">
        <v-spacer />
        <v-btn
          large
          :disabled="loading"
          :loading="loading"
          color="primary"
          @click="goNext"
        >
          {{ $t('components.registration.next') }}
        </v-btn>
      </div>
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
      formName: 'CompanyAddress',
      schemaSection1: [
        {
          name: 'countryId',
          label: 'Where is your company registered?',
          element: 'InputSelect',
          rules: [
            'required'
          ],
          options: []
        }
      ],
      schemaSection2: [
        {
          name: 'addressLine1',
          label: 'Address Line 1',
          element: 'InputText',
          rules: [
            'required'
          ]
        },
        {
          name: 'addressLine2',
          label: 'Address Line 2',
          element: 'InputText',
          rules: [
            'required'
          ]
        },
        {
          name: 'stateId',
          label: 'State',
          element: 'InputSelect',
          rules: [],
          options: []
        },
        {
          name: 'city',
          label: 'City',
          element: 'InputText',
          rules: [
            'required'
          ]
        },
        {
          name: 'postalCode',
          label: 'ZIP Code',
          element: 'InputZipCode',
          rules: [
            'required'
          ]
        },
        {
          name: 'mobileNo',
          label: 'Telephone number',
          element: 'InputPhoneNumber',
          rules: [
            'required'
          ]
        }
      ]
    }
  },
  watch: {
    'formData.countryId': function (countryId) {
      this.setStates(countryId)
    }
  },
  methods: {
    getFormErrorModel (schema) {
      return formErrorsModel(schema)
    },
    async goNext () {
      const form1Valid = this.$refs.form1.validate()
      const form2Valid = this.$refs.form2.validate()

      if (form1Valid && form2Valid) {
        try {
          this.loading = true
          await this.$store.dispatch('registration/updateClient', this.formData)
          await this.$store.dispatch('registration/goNext')
        } catch (e) {
          throw e
        } finally {
          this.loading = false
        }
      }
    },
    updateInputSelectOptions (data = []) {
      return data.map(item => ({ text: item.label, value: item.id })).sort((a, b) => a.text > b.text)
    },
    async setAddressType () {
      const addressType = await this.$store.dispatch('registration/getClientAddressTypes')
      addressType.data.data.getClientAddressTypes.map(item => {
        if (item.label === 'PRIMARY') {
          this.formData.addressTypeId = item.id
        }
      })
    },
    async setCountries () {
      const countries = await this.$store.dispatch('registration/getCountries')
      this.schemaSection1[0].options = this.updateInputSelectOptions(countries?.data?.data?.getCountries)
    },
    async setStates (countryId) {
      const states = await this.$store.dispatch('registration/getStates', countryId)
      this.schemaSection2[2].options = this.updateInputSelectOptions(states?.data?.data?.getStates)
    },
    updateValue (val) {
      this.formData = { ...this.formData, ...val }
    }
  },
  async created () {
    await this.setCountries()
  },
  async mounted () {
    await this.setAddressType()
  }
}
</script>
