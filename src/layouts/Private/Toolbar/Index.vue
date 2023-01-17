<template>
  <v-toolbar
    flat
    color="transparent"
    class="mt-3"
  >
    <div class="pl-1">
      <h1 v-if="title" class="text-h5">
        {{ title }}
      </h1>
      <WelcomeUser v-if="$route.name === 'dashboard'" />
    </div>

    <v-spacer />

    <v-btn
      v-if="$appConfig.enabled('communications')"
      text
      icon
      active-class="v-btn--inactive"
      :to="{ name: 'communications' }"
    >
      <v-badge
        overlap
        dot
        :value="0"
        color="accent"
        class="overwritten"
      >
        <v-icon>chat</v-icon>
      </v-badge>
    </v-btn>

    <Profile />
  </v-toolbar>
</template>

<script>
import WelcomeUser from '@/components/Dashboard/WelcomeUser.vue'
import Profile from '@/layouts/Private/Toolbar/Profile.vue'

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    Profile,
    WelcomeUser
  }
}
</script>
