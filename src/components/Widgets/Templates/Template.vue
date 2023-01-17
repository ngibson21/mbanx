<template>
  <v-card :color="color" :dark="dark" flat class="pa-3" @click="$emit('clicked')">
    <v-row no-gutters>
      <v-col class="shrink pr-3" align-self="center">
        <v-img
          width="45"
          :src="$appConfig.assets(`logo-dark.png`)"
          :srcset="$appConfig.assets(`logo-dark@2x.png`) + ' 2x'"
        />
      </v-col>

      <v-col>
        <span class="font-weight-bold">{{ greeting }}</span>{{ message }}
      </v-col>

      <v-col class="shrink">
        <v-btn
          icon
          text
          @click.stop="$emit('closed')"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    greeting: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    dark: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      required: false,
      default: 'primary'
    }
  }
}
</script>
