<template>
  <v-menu offset-y bottom left ripple>
    <template v-slot:activator="{ on }">
      <v-btn
        depressed
        :text="smAndUp"
        :x-large="smAndUp"
        :icon="xsOnly"
        v-on="on"
        :class="xsOnly ? 'mr-0' : 'pr-4'"
      >
        <Avatar
          class="mr-6 hidden-xs-only"
          :email="user.appUser.email"
          :initials="`${user.appUser.firstName} ${user.appUser.lastName}`"
        />
        <v-icon>more_vert</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-if="$appConfig.enabled('settings')"
        @click="$router.push({name: 'settings'})"
      >
        <v-list-item-avatar>
          <v-icon>
            settings
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content v-text="$t('components.toolBar.profile.dropdown.settings')" />
      </v-list-item>
      <v-list-item>
        <v-switch v-model="$vuetify.theme.dark">
          <template v-slot:label>
            <div class="pl-2 text--primary">
              {{ $t('components.toolBar.profile.dropdown.darkMode') }}
            </div>
          </template>
        </v-switch>
      </v-list-item>
      <v-divider />
      <v-list-item @click="logout">
        <v-list-item-avatar>
          <v-icon>
            power_settings_new
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content v-text="$t('components.toolBar.profile.dropdown.logout')" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/Shared/Avatar.vue'

export default {
  components: {
    Avatar
  },
  data () {
    return {
      dark: this.$store.state.localSettings.darkMode
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/get'
    }),
    xsOnly () {
      return this.$vuetify.breakpoint.xsOnly
    },
    smAndUp () {
      return this.$vuetify.breakpoint.smAndUp
    },
    isDark () {
      return this.$vuetify.theme.dark
    }
  },
  watch: {
    isDark () {
      this.$store.dispatch('localSettings/changeTheme')
    }
  },
  methods: {
    async logout () {
      try {
        await this.$store.dispatch('user/logout')
        this.$bus.$emit('notify-with-message', this.$t('views.login.notifications.successfulLogout'), { flushQueue: true })
      } catch (e) {
        throw e
      }
    }
  }
}
</script>
