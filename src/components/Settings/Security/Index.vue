<template>
  <div>
    <v-divider class="mb-5" />
    <ChangePassword />
    <v-divider class="my-5" />
    <TOTP />
  </div>
</template>

<script>
import ChangePassword from '@/components/Settings/Security/ChangePassword/Index.vue'
import TOTP from '@/components/Settings/Security/TOTP/Index.vue'

export default {
  name: 'SecurityTab',
  components: {
    ChangePassword,
    TOTP
  }
}
</script>
