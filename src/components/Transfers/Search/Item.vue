<template>
  <div class="d-flex py-3">
    <div class="d-flex mr-3 flex-shrink-1 align-center">
      <Avatar :initials="item.creditor.name" />
    </div>
    <div>
      <div class="text-h6 text-capitalize">
        {{ item.creditor.name }}
      </div>
      <div class="text-body-2 grey--text text-truncate">
        {{ item.creditor.identifier }}
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Shared/Avatar.vue'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    Avatar
  }
}
</script>
