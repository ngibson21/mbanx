<template>
  <v-card flat>
    <v-tabs-items v-model="tabs">
      <v-tab-item v-for="item in items" :key="item.name" :value="item.name">
        <slot :name="item.name" />
      </v-tab-item>
    </v-tabs-items>
    <v-tabs
      v-model="tabs"
      hide-slider
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item.name"
        :href="`#${item.name}`"
        class="ma-1 text-subtitle-2"
        color="primary"
        background-color="transparent"
      >
        {{ $t(item.title) }}
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tabs: null
    }
  },
  mounted () {
    // remove vuetify v-slide-group-prev that keep push tabs to the right
    document.getElementsByClassName('v-slide-group__prev v-slide-group__prev--disabled')[0].remove()
  }
}
</script>

<style scoped>
.v-window-x-transition-enter-active ,
.v-window-x-reverse-transition-enter-active{
  transition: 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
  animation: fadeIn ease 0.8s;
  -webkit-animation: fadeIn ease 0.8s;
  -moz-animation: fadeIn ease 0.8s;
  -o-animation: fadeIn ease 0.8s;
  -ms-animation: fadeIn ease 0.8s;
}
</style>
