<template>
  <div class="pa-3 pb-0">
    <i18n path="components.transfers.searchList.noMatch">
      <b slot="user">{{ keyword }},</b>
    </i18n>
  </div>
</template>

<script>
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    }
  }
}
</script>
