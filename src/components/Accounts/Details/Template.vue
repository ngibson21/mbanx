<template>
  <v-list two-line class="pa-0">
    <v-list-group
      :value="!$vuetify.breakpoint.smAndDown"
      :append-icon="$vuetify.breakpoint.smAndDown ? 'keyboard_arrow_down' : ''"
      no-action
      :class="$vuetify.breakpoint.mdAndUp ? 'disabledContent' : ''"
      color
    >
      <template v-slot:activator>
        <v-list-item-content>
          <div class="text-h6 font-weight-bold pb-md-2">
            {{ $t('components.accounts.details.title') }}
          </div>
        </v-list-item-content>
      </template>
      <v-list class="px-5 pt-0">
        <slot />
      </v-list>
    </v-list-group>
  </v-list>
</template>

<style scoped>
.disabledContent {
  pointer-events: none;
}
</style>
