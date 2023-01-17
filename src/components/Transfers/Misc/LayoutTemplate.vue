<template>
  <v-card flat :color="color">
    <div>
      <v-row no-gutters v-if="header">
        <v-col class="d-flex">
          <div class="text-h6 font-weight-medium py-2 pl-3 mr-auto">
            {{ $t(header) }}
          </div>

          <div v-if="discardable" class="pt-1 pr-1">
            <v-btn icon text @click="$store.commit('transfers/discardTransfer')">
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>

    <slot />
  </v-card>
</template>

<script>
export default {
  name: 'LayoutTemplate',
  props: {
    header: {
      type: String,
      default: ''
    },
    discardable: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    }
  }
}
</script>
