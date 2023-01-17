<template>
  <v-list two-line class="pa-0" :disabled="isCardBlocked">
    <v-list-group v-model="showSelection" color>
      <template v-slot:activator>
        <v-icon left :color="isCardBlocked ? 'grey' : 'primary'">
          public
        </v-icon>

        <v-list-item-content :class="{ 'pb-md-2': true, 'grey--text': isCardBlocked }">
          {{ $t('components.cards.regions.blockedRegion') }}
        </v-list-item-content>
      </template>

      <List :card-id="card.id" @close-selection="closeSelection" />
    </v-list-group>
  </v-list>
</template>

<script>
import List from '@/components/Cards/Region/List.vue'

export default {
  name: 'RegionSelection',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  components: {
    List
  },
  data () {
    return {
      showSelection: false
    }
  },
  watch: {
    card () {
      this.closeSelection()
    }
  },
  computed: {
    isCardBlocked () {
      return ['EXPIRED', 'SUSPENDED', 'ORDERED'].includes(this.card.status)
    }
  },
  methods: {
    closeSelection () {
      this.showSelection = false
    }
  }
}
</script>
