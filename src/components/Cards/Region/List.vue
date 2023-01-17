<template>
  <div>
    <v-card flat max-height="300" class="overflow-y-auto">
      <v-list>
        <v-list-group
          v-for="(continent) in regions"
          :key="continent.name"
          no-action
        >
          <template v-slot:activator>
            <v-list-item :ripple="false" @click.stop="selectContinent(continent)">
              <v-checkbox
                class="pt-0 checkbox"
                dense
                hide-details
                :indeterminate="checkboxesModel[continent.name].indeterminate"
                :input-value="checkboxesModel[continent.name].selected"
                @click.stop="selectContinent(continent)"
              >
                <div slot="label" class="text--primary">
                  {{ continent.name }}
                </div>
              </v-checkbox>
            </v-list-item>
          </template>

          <v-list-item
            v-for="country in continent.countries"
            :key="country.code"
            @click="selectCountry(continent, country)"
          >
            <v-checkbox
              class="pt-0 checkbox"
              dense
              hide-details
              :input-value="checkboxesModel[continent.name].countries[country.code]"
              @click.stop="selectCountry(continent, country)"
            >
              <div slot="label" class="text--primary">
                {{ country.name }}
              </div>
            </v-checkbox>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
    <div class="d-flex justify-space-between pa-2">
      <v-btn text @click="cancel">
        {{ $t('components.cards.regions.cancel') }}
      </v-btn>
      <v-btn depressed color="primary" @click="save" :loading="saving" :disabled="saving">
        {{ $t('components.cards.regions.save') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import regions from '@/components/Cards/Region/regions.json'

export default {
  name: 'ListRegion',
  props: {
    cardId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      regions,
      checkboxesModel: {},
      updatedBlockedCountries: new Set(this.$store.getters['cards/id'](this.cardId).blockedCountries),
      saving: false
    }
  },
  computed: {
    blockedCountries () {
      return this.$store.getters['cards/id'](this.cardId).blockedCountries
    }
  },
  watch: {
    cardId (value) {
      this.setCheckboxesModel()
      this.updatedBlockedCountries = new Set(this.$store.getters['cards/id'](this.cardId).blockedCountries)
    }
  },
  methods: {
    async save () {
      try {
        this.saving = true
        const response = await this.$store.dispatch('cards/updateRegion', { id: this.cardId, value: Array.from(this.updatedBlockedCountries) })

        if (response.data?.errors?.length) {
          this.setCheckboxesModel()
          this.$bus.$emit('notify-with-message', response.data.errors[0].message, { flushQueue: true })
        } else {
          this.$bus.$emit('notify-with-message', this.$t('components.cards.regions.success'))
        }
        this.$emit('close-selection')
        this.saving = false
      } catch (e) {
        this.setCheckboxesModel()
        this.saving = false
      }
    },
    cancel () {
      this.updatedBlockedCountries = new Set(this.$store.getters['cards/id'](this.cardId).blockedCountries)
      this.setCheckboxesModel()
      this.$emit('close-selection')
    },
    selectContinent (continent) {
      const isContinentSelected = !this.checkboxesModel[continent.name].selected

      Object.assign(this.checkboxesModel[continent.name], {
        selected: isContinentSelected,
        indeterminate: false,
        totalSelectedCountries: isContinentSelected ? continent.countries.length : 0
      })

      Object.keys(this.checkboxesModel[continent.name].countries).map(countryCode => {
        this.checkboxesModel[continent.name].countries[countryCode] = isContinentSelected
        isContinentSelected ? this.updatedBlockedCountries.add(countryCode) : this.updatedBlockedCountries.delete(countryCode)
      })
    },
    selectCountry (continent, country) {
      const isCountrySelected = !this.checkboxesModel[continent.name].countries[country.code]

      this.checkboxesModel[continent.name].countries[country.code] = isCountrySelected

      if (isCountrySelected) {
        this.updatedBlockedCountries.add(country.code)
        this.checkboxesModel[continent.name].totalSelectedCountries++
      } else {
        this.updatedBlockedCountries.delete(country.code)
        this.checkboxesModel[continent.name].totalSelectedCountries--
      }

      this.setContinentState(this.checkboxesModel[continent.name])
    },
    setContinentState (continent) {
      if (continent.totalSelectedCountries <= 0) {
        continent.selected = false
        continent.indeterminate = false
      } else if (continent.totalSelectedCountries < continent.totalCountries) {
        continent.selected = false
        continent.indeterminate = true
      } else {
        continent.selected = true
        continent.indeterminate = false
      }
    },
    setCheckboxesModel () {
      const model = {}
      this.regions.map(continent => {
        model[continent.name] = {
          countries: {},
          totalSelectedCountries: 0,
          totalCountries: 0,
          indeterminate: false,
          selected: false
        }

        continent.countries.map(country => {
          if (this.blockedCountries?.includes(country.code)) {
            model[continent.name].countries[country.code] = true
            model[continent.name].totalSelectedCountries++
          } else {
            model[continent.name].countries[country.code] = false
          }

          model[continent.name].totalCountries++
        })

        this.setContinentState(model[continent.name])
      })
      this.$set(this.$data, 'checkboxesModel', model)
    }
  },
  created () {
    this.setCheckboxesModel()
  }
}
</script>

<style scoped>
  .checkbox {
    position:relative;
    top:-8px;
  }
</style>
