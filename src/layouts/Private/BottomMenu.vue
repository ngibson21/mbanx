<template>
  <v-bottom-navigation app fixed grow height="70" class="d-flex align-center" v-model="bottomNav">
    <router-link :to="{name: nav.uri}" v-for="(nav, index) in navList" :key="index" class="d-flex flex-1">
      <v-btn v-ripple="false" :value="nav.name">
        <v-icon
          class="d-flex justify-center"
          size="10"
          color="transparent"
        >
          {{ 'fiber_manual_record' }}
        </v-icon>
        <span>{{ $t(`components.menu.${nav.name}`) }}</span>
        <!-- <v-icon :class="nav.name === 'transfer'? 'transfer-icon' : ''">{{ nav.icon }}</v-icon> -->
      </v-btn>
    </router-link>
  </v-bottom-navigation>
</template>

<script>
import menu from '@/config/menus/index.js'
import bottomMenu from '@/config/menus/bottomMenu.js'

export default {
  name: 'BottomMenu',
  data () {
    return {
      bottomNav: 'home',
      navList: menu(bottomMenu)(this.$appConfig.enabledComponents)
    }
  }
}
</script>

<style scoped>
.transfer-icon{
  -ms-transform: rotate(180deg); /* IE 9 */
  transform: rotate(180deg);
}
.router-link-active{
  font-weight: 700 !important;
}
a {
  color: inherit;
  text-decoration: none;
}
.router-link-active .v-icon{
  color: var(--v-primary-base) !important
}
.v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before {
  opacity: 0!important;
}
</style>
