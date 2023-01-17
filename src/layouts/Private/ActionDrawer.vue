<template>
  <v-navigation-drawer
    temporary
    app
    right
    touchless
    fixed
    stateless
    :style="customStyles"
    :class="[{'bottom-xs': $vuetify.breakpoint.xsOnly,'full-screen': showFullScreen}]"
    :value="show"
    :width="$vuetify.breakpoint.smAndUp? '500' : '85%'"
    :bottom="$vuetify.breakpoint.xsOnly"
    @input="drawerUpdated"
  >
    <components
      v-if="componentData.path"
      v-bind="componentData.props"
      :is="componentLoader"
      @hide-action-drawer="$emit('hide-action-drawer')"
    />
  </v-navigation-drawer>
</template>

<script>
import lazyLoad from '@/utils/lazyLoad.js'

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    componentData: {
      type: Object,
      required: true
    }
  },
  computed: {
    componentLoader () {
      return this.componentData.path ? lazyLoad(this.componentData.path) : null
    },
    showFullScreen () {
      return this.componentData?.path?.includes('New') && this.show
    },
    customStyles () {
      const translate = this.$vuetify.breakpoint.xsOnly ? 'translateY' : 'translateX'
      const valueTranform = this.show ? 0 : 100

      return {
        transform: `${translate}(${valueTranform}%)`
      }
    }
  },
  methods: {
    drawerUpdated (isShown) {
      return isShown ? '' : this.$emit('hide-action-drawer')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  &.bottom-xs {
    max-height: 60% !important;
    top: auto !important;
    bottom: 0px !important;
    width: 100% !important;

    &.full-screen {
      max-height: 100% !important;
    }
  }
}
</style>
