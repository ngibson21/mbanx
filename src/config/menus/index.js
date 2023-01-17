export default function (defaultMenu) {
  return (enabledComponents) => {
    if (!enabledComponents) return defaultMenu
    return defaultMenu.filter(menuItem => {
      return enabledComponents.includes(menuItem.uri)
    })
  }
}
