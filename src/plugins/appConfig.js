import path from 'path'

const client = process.env.VUE_APP_CLIENT || ''

const assets = (file) => {
  const assetPath = path.join(client, file)

  return require('@/assets/' + assetPath)
}

const enabled = (enabledComponents) => {
  if (!enabledComponents) return () => { return true }

  return (component) => {
    return enabledComponents.includes(component)
  }
}

const AppConfig = {
  install (Vue, options) {
    const { enabledComponents } = options

    Vue.prototype.$appConfig = {
      assets,
      enabled: enabled(enabledComponents),
      enabledComponents
    }
  }
}

export default AppConfig
