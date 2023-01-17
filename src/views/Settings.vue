<template>
  <v-card class="pa-4 d-flex flex-column flex-grow-1">
    <v-tabs v-model="currentTab">
      <v-tab class="subheading font-weight-black" ripple>
        {{ $t(`views.settings.tabs.security`) }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="currentTab">
      <v-tab-item>
        <v-card-text>
          <SecurityTab />
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import SecurityTab from '@/components/Settings/Security/Index.vue'

export default {
  components: {
    SecurityTab
  },
  name: 'Settings',
  data () {
    return {
      page: {
        title: this.$t('views.settings.header')
      },
      currentTab: null
    }
  },
  created () {
    this.$emit('page-created', this.page)
  }
}
</script>
