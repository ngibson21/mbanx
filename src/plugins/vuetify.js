import path from 'path'
import Vue from 'vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// eslint-disable-next-line
import Vuetify from 'vuetify/lib/framework'

const getClientTheme = (themeName) => {
  const client = process.env.VUE_APP_CLIENT || ''
  const themePath = path.join(client, 'themes.js')
  return (require('@/themes/' + themePath))[themeName]
}

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'md'
  },
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: getClientTheme('light'),
      dark: getClientTheme('dark')
    }
  }
})
