<template>
  <v-flex align-self-center shrink>
    <v-layout>
      <v-flex v-if="$vuetify.breakpoint.xsOnly" pr-2 pl-1 align-self-center>
        <Avatar
          :email="$store.state.user.appUser.email"
          :initials="`${$store.state.user.appUser.firstName} ${$store.state.user.appUser.lastName}`"
        />
      </v-flex>
      <v-flex class="pl-1">
        <Greeting class="text-caption" />
        <div class="font-weight-bold text-h6">
          {{ fullName }}
        </div>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import Avatar from '@/components/Shared/Avatar.vue'
import Greeting from '@/components/Shared/Greeting.vue'

export default {
  components: {
    Greeting,
    Avatar
  },
  computed: {
    fullName () {
      return this.$store.getters['user/fullName']
    }
  }
}
</script>
