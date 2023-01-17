<template>
  <div>
    <SideMenu v-if="$vuetify.breakpoint.smAndUp" />
    <v-idle
      @idle="onIdle"
      :wait="5"
      :duration="300"
      v-show="false"
    />
    <v-main>
      <v-container class="pa-0" fluid>
        <ToolBar :title="page.title" />
        <v-container fluid v-show="page.fab" class="pa-0">
          <div class="d-flex justify-end pr-4 pl-6">
            <div
              v-if="$vuetify.breakpoint.smAndUp && $route.name === 'dashboard'"
              class="font-weight-bold text-h6 col-6 pa-0"
            >
              {{ $d(new Date(), 'long') }}
            </div>
            <div v-if="page.fab" class="d-flex col-6 justify-end pa-0">
              <div>
                <v-fab-transition>
                  <FAB :link="page.fab" />
                </v-fab-transition>
              </div>
            </div>
          </div>
        </v-container>

        <v-container fluid grid-list-lg class="pt-3">
          <router-view @page-created="pageCreated" @show-action-drawer="showDrawer" />
        </v-container>
      </v-container>
      <BottomMenu v-if="$vuetify.breakpoint.xsOnly" />
    </v-main>
    <ActionDrawer
      :show="drawer.show"
      :component-data="drawer.componentData"
      @hide-action-drawer="hideDrawer"
    />
  </div>
</template>

<script>
import FAB from '@/layouts/Private/FAB.vue'
import ToolBar from '@/layouts/Private/Toolbar/Index.vue'
import SideMenu from '@/layouts/Private/SideMenu.vue'
import BottomMenu from '@/layouts/Private/BottomMenu.vue'
import ActionDrawer from '@/layouts/Private/ActionDrawer.vue'

export default {
  data () {
    return {
      page: {},
      drawer: {
        show: false,
        componentData: {
          path: null,
          props: null
        }
      }
    }
  },
  methods: {
    pageCreated (event) {
      this.page = event
    },
    showDrawer ({ path, props }) {
      this.drawer.componentData = { path, props }
      this.drawer.show = true
    },
    hideDrawer () {
      this.drawer.show = false
    },
    async onIdle () {
      try {
        await this.$store.dispatch('user/logout')
      } catch (e) {
        throw e
      }
    }
  },
  components: {
    ToolBar,
    FAB,
    SideMenu,
    BottomMenu,
    ActionDrawer
  }
}
</script>
