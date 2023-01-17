<template>
  <v-card flat>
    <v-text-field
      v-model="keyword"
      :loading="loading"
      hide-details
      flat
      prepend-inner-icon="search"
      :label="$t('views.recipients.searchPlaceholder')"
      solo
      @change="search"
      background-color="transparent"
    />
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      keyword: '',
      filteredItems: null
    }
  },
  methods: {
    async search () {
      if (!this.keyword) {
        this.filteredItems = null
        return this.$emit('hide-filter')
      }

      try {
        this.loading = true
        this.filteredItems = await this.$store.dispatch('recipients/search', this.keyword)
        this.loading = false
        this.$emit('show-filter', this.filteredItems)
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>
