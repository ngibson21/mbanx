<template>
  <div :class="iconClasses" ref="statusIconRef">
    <v-btn disabled small outlined fab>
      <v-icon>{{ cardIcon }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cardWidth: 0
    }
  },
  props: {
    cardIcon: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.cardWidth = this.$refs.statusIconRef.clientWidth
  },
  computed: {
    iconClasses () {
      return [
        'd-flex fill-height icon-status',
        {
          'pl-4 pt-4': this.cardWidth > 100,
          'justify-center align-center': this.cardWidth <= 100
        }
      ]
    }
  }
}
</script>

<style scoped>
  .icon-status, .icon-status::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .icon-status::after {
    content: "";
    background-color: rgba(0,0,0,0.3) !important;
    opacity: 0.5;
  }
</style>
