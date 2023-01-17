<template>
  <v-navigation-drawer
    mobile-breakpoint="600"
    app
    class="primary"
    :mini-variant="smAndDown"
    stateless
    :value="true"
    :width="width"
  >
    <v-layout justify-center row wrap>
      <img
        class="mt-4 mb-4"
        width="45"
        :src="$appConfig.assets('logo-dark.png')"
        :srcset="$appConfig.assets('logo-dark@2x.png') + ' 2x'"
      >
    </v-layout>

    <v-list class="transparent">
      <template v-for="navLink in menu">
        <v-tooltip :key="navLink.id" right>
          <template v-slot:activator="{ on }">
            <v-list-item
              class="py-3"
              active-class="primary--text text--lighten-2"
              ripple
              :to="{ name: navLink.name }"
              v-on="smAndDown ? on : ''"
            >
              <v-layout justify-center row wrap>
                <v-icon color="primary" class="text--lighten-2" :size="iconSize">
                  {{ navLink.icon }}
                </v-icon>
                <v-list-item-title v-if="mdAndUp" class="text-caption text-center primary--text text--lighten-2">
                  {{ $t(`components.menu.${navLink.name}`) }}
                </v-list-item-title>
              </v-layout>
            </v-list-item>
          </template>
          <span>{{ $t(`components.menu.${navLink.name}`) }}</span>
        </v-tooltip>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

import menu from '@/config/menus/index.js'
import sideMenu from '@/config/menus/sideMenu.js'

export default {
  name: 'SideMenu',
  data () {
    return {
      menu: menu(sideMenu)(this.$appConfig.enabledComponents)
    }
  },
  methods: {
    handleScroll (event) {
      this.$el.scrollTop = event.pageY
    }
  },
  computed: {
    mdAndUp () {
      return this.$vuetify.breakpoint.mdAndUp
    },
    smAndDown () {
      return this.$vuetify.breakpoint.smAndDown
    },
    width () {
      if (this.mdAndUp) return 120
      return 60
    },
    iconSize () {
      if (this.mdAndUp) return 40
      return 25
    },
    logoSize () {
      if (this.mdAndUp) return 70
      return 50
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
a.v-list-item--active {
  .text-caption {
    color: white!important;
  }
  .v-icon {
    color: white!important;
  }
}
</style>
