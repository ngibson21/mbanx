import Vue from 'vue'
import Cleave from 'cleave.js'

Vue.directive('cleave', {
  inserted: (el, binding) => {
    if (!binding.value) return
    const childData = el.querySelectorAll('input')[0]
    if (childData) {
      childData.cleave = new Cleave(childData, binding.value || {})
    } else {
      el.cleave = new Cleave(el, binding.value || {})
    }
  },
  update: (el) => {
    const childData = el.querySelectorAll('input')[0]
    if (!childData.cleave) return
    const event = new Event('input', { bubbles: true })
    setTimeout(function () {
      if (childData) {
        childData.value = childData.value && childData.cleave.properties.result
        childData.dispatchEvent(event)
      } else {
        el.value = el.value && el.cleave.properties.result
        el.dispatchEvent(event)
      }
    }, 100)
  }
})
