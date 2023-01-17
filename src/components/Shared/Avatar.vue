<template>
  <v-avatar :size="size" :color="color" class="avatar">
    <template v-if="gravatarExists">
      <img
        :src="getGravatarUrl()"
        :alt="email"
      >
    </template>
    <template v-if="!gravatarExists">
      <div class="text-subtitle-1">
        {{ getInitials() }}
      </div>
    </template>
  </v-avatar>
</template>

<script>
import axios from 'axios'
// if there's no picture
// associated with the email address
// then render the initials
const crypto = require('crypto')

export default {
  props: {
    initials: {
      type: String,
      required: true,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 40
    },
    color: {
      type: String,
      default: 'quaternary'
    }
  },
  data () {
    return {
      gravatarExists: undefined
    }
  },
  name: 'Avatar',
  methods: {
    getInitials () {
      if (!this.initials) return ''
      return this.initials
        .split(' ')
        .map(s => s.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase()
    },
    getGravatarUrl () {
      const gravatarHash = crypto.createHash('md5').update(this.email).digest('hex')
      return `https://gravatar.com/avatar/${gravatarHash}.png?d=404&s=200`
    },
    async checkGravatar () {
      if (!this.email) return
      try {
        const response = await axios.get(this.getGravatarUrl())
        this.gravatarExists = true
        return response
      } catch (error) {
        this.gravatarExists = false
      }
    }
  },
  created () {
    this.checkGravatar()
  },
  watch: {
    email () {
      this.checkGravatar()
    }
  }
}
</script>

<style lang="scss">
.application {
  .avatar {
    background: #eeeef1;
  }
  &.theme--dark {
    .avatar {
      background: #6a6d74;
    }
  }
}
</style>
