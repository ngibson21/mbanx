<template>
  <ColumnWrapper>
    <div class="pt-3">
      <div>
        {{ $te(label) ? $t(label) : label }}
      </div>
      <v-sheet
        class="uploadFile quaternary rounded-lg"
        active-class="quaternary"
        outlined
        @click="openFileDialog"
      >
        <div class="d-flex align-center py-5">
          <div class="pa-5">
            <v-icon x-large>
              upload_file
            </v-icon>
            <v-file-input :id="`${formName}-${label}`" accept="image/*" :rules="validation" style="display:none" @change="onChange" />
          </div>

          <div v-if="!hasFile" class="grey--text">
            Drag and drop here or click to upload (PDF/JPG/PNG)
          </div>
          <div v-else>
            {{ fileName }}
          </div>
        </div>
      </v-sheet>
      <span class="error--text" v-if="inputFileMsg">{{ inputFileMsg }}</span>
    </div>
  </ColumnWrapper>
</template>

<script>
import Base from '@/components/Shared/Form/Elements/Base.js'
import EventBus from '@/components/Shared/Form/Elements/eventBus.js'
import ColumnWrapper from '@/components/Shared/Form/Elements/formColumnElementSlot.vue'

export default {
  components: {
    ColumnWrapper
  },
  mixins: [Base],
  props: {
    formName: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      validation: [],
      hasFile: false,
      fileName: '',
      inputFileMsg: ''
    }
  },
  methods: {
    openFileDialog () {
      const fileUpload = document.getElementById(`${this.formName}-${this.label}`)

      if (fileUpload) {
        fileUpload.click()
      }
    },
    onChange (file) {
      this.hasFile = !!file
      this.fileName = file.name
      this.$emit('input', file)
    },
    checkInputFileErrorMsg () {
      const domMsg = this.$el.querySelector('.v-messages.error--text .v-messages__message')
      this.inputFileMsg = domMsg?.innerHTML || ''
    },
    validate () {
      if (this.rules.includes('required') && !this.hasFile) this.inputFileMsg = this.$t('components.shared.messages.fieldRequired')
    }
  },
  watch: {
    hasFile () {
      this.inputFileMsg = ''
    }
  },
  mounted () {
    const formIdentifierVerificationBtn = document.querySelector('#form-identifier-verification .v-btn.primary')

    if (formIdentifierVerificationBtn) {
      formIdentifierVerificationBtn.addEventListener('click', this.checkInputFileErrorMsg)
    }

    EventBus.$on('form-validate', () => {
      this.validate()
    })
  }
}
</script>

<style scoped>
.uploadFile:hover {
  cursor: pointer;
}
</style>
