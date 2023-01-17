<template>
  <div>
    <div class="text-h6 text-center pb-5">
      {{ $t('views.cards.noCard.title') }}
    </div>

    <div class="wrapper d-flex justify-center">
      <div class="credit-card">
        <Card />
      </div>
      <div class="credit-card stack-top">
        <Card />
      </div>
    </div>

    <div class="d-flex justify-center">
      <div class="pb-3 pt-12 col-xl-2 col-lg-4 col-md-5 col-sm-6">
        {{ $t('views.cards.noCard.description') }}
        <div class="pt-3">
          <ul>
            <li>{{ $t('views.cards.noCard.benefits.contactlessPayments') }}</li>
            <li>{{ $t('views.cards.noCard.benefits.onlinePayments') }}</li>
            <li>{{ $t('views.cards.noCard.benefits.geoSupport') }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="d-flex justify-center">
      <v-btn large depressed class="primary mt-3">
        {{ $t('views.cards.noCard.selectCard') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Shared/CreditCard/Templates/Full.vue'

export default {
  components: {
    Card
  }
}
</script>

<style scoped>
.wrapper {
  min-height: 180px;
  margin-right: 40px;
}

.credit-card {
  position: absolute;
  min-width: 270px;
}

.stack-top {
  z-index: 9;
  margin-top: 30px;
  margin-left: 50px;
}
</style>
