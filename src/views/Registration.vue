<template>
  <div v-if="!fetchingConfiguration">
    <div>
      <step-navigation v-if="currentStep.groupName" />
    </div>

    <div>
      <no-workflow v-if="configuration.length === 0" />
      <successful-confirm v-else-if="isCompleted" />
      <step-renderer
        v-else-if="currentStep.isDataTable"
        v-model="formData"
        ref="step"
        :step="currentStep"
      >
        <template v-slot:bottom>
          <div class="d-flex justify-space-between">
            <v-btn
              v-if="allowGoBack"
              color="primary"
              text
              @click="goBack"
            >
              <v-icon>arrow_back</v-icon>
              {{ $t('components.registration.back') }}
            </v-btn>
            <v-spacer />
            <v-btn
              large
              :disabled="submittingStep"
              :loading="submittingStep"
              color="primary"
              @click="goNext"
            >
              {{ $t('components.registration.next') }}
            </v-btn>
          </div>
        </template>
      </step-renderer>
      <div v-else>
        <components :is="componentLoader" />
      </div>
    </div>
  </div>
</template>

<script>
import StepRenderer from '@/components/Registration/StepRenderer.vue'
import lazyLoad from '@/utils/lazyLoad.js'
import SuccessfulConfirm from '@/components/Registration/Statics/SuccessfulConfirm.vue'
import NoWorkflow from '@/components/Registration/Statics/NoWorkflow.vue'
import StepNavigation from '@/components/Registration/StepNavigation.vue'

export default {
  name: 'Registration',
  components: {
    StepRenderer,
    SuccessfulConfirm,
    NoWorkflow,
    StepNavigation
  },
  data () {
    return {
      fetchingConfiguration: false,
      submittingStep: false,
      allowGoBack: false,
      formData: {
        ...this.$store.state.registration.data
      }
    }
  },
  computed: {
    isCompleted () {
      return this.$store.getters['registration/isCompleted']
    },
    componentLoader () {
      return this.currentStep.resourceIdentifier ? lazyLoad(`components/Registration/Statics/${this.currentStep.resourceIdentifier}`) : null
    },
    configuration () {
      return this.$store.state.registration.configuration
    },
    currentStep () {
      return this.$store.getters['registration/currentStep']
    },
    currentStepPosition () {
      return this.$store.getters['registration/currentStepPosition']
    }
  },
  methods: {
    goBack () {
      if (this.currentStepPosition === 1) return this.$router.back()
      this.$store.dispatch('registration/goBack')
    },
    async goNext () {
      this.submittingStep = true
      try {
        if (this.stepValidate()) {
          await this.$store.dispatch('registration/goNext', { data: this.formData, step: this.currentStep })
        }
      } catch (e) {
        this.$bus.$emit('notify-with-message', e[0]?.message || e?.message, { flushQueue: true })
      } finally {
        this.submittingStep = false
      }
    },
    stepValidate () {
      return this.currentStep.isDataTable ? this.$refs.step.validate() : true
    }
  },
  async created () {
    try {
      this.fetchingConfiguration = true
      await this.$store.dispatch('registration/getConfiguration')
      await this.$store.dispatch('registration/getOnboardingStatus')
      this.fetchingConfiguration = false
    } catch (e) {
      this.fetchingConfiguration = false
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('registration/resetState')
    next()
  }
}
</script>
