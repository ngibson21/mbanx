<template>
  <section class="recovery-key-wrapper d-flex flex-wrap mt-5">
    <div class="col-12 col-md-4 pa-0 pr-3">
      <h3 class="text-body-2 font-weight-bold">
        {{ $t('components.settings.security.recoveryCodesTitle') }}
      </h3>
      <p>{{ $t('components.settings.security.recoveryCodesDescription') }}</p>
    </div>
    <div class="col-12 col-md-8 pa-0">
      <code class="d-flex py-3 quaternary">
        <ul>
          <li v-for="code in recoveryCodes" :key="code">{{ code }}</li>
        </ul>
      </code>
    </div>
    <section class="col-12 col-md-8 offset-md-4 px-0 pb-0">
      <v-btn :link="true" class="primary" :href="this.textFileUrl" download="RecoveryCodes.txt">
        {{ $t('components.settings.security.downloadKey') }}
      </v-btn>
    </section>
  </section>
</template>

<script>
export default {
  name: 'RecoveryKey',
  props: {
    recoveryCodes: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      textFileUrl: null
    }
  },
  methods: {
    generateTextFile () {
      // Ref: https://stackoverflow.com/a/21016088
      const data = new Blob([this.recoveryCodes.join('\n')], { type: 'text/plain;charset=utf-8' })

      if (this.textFileUrl !== null) {
        window.URL.revokeObjectURL(this.textFileUrl)
      }

      this.textFileUrl = window.URL.createObjectURL(data)
    }
  },
  mounted () {
    this.generateTextFile()
  }
}
</script>

<style scoped>
.recovery-key-wrapper {
  width: 100%;
}
</style>
