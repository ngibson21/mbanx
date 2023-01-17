export const formErrorsHandler = (vm, err) => {
  // This only handle api errors at the moment
  if (err?.errors?.length > 0) {
    vm.formErrors[err.errors[0].paths[1]] = err.errors[0].message
    vm.$watch(`formData.${err.errors[0].paths[1]}`, function () {
      vm.formErrors[err.errors[0].paths[1]] = null
    })
  }
}

export const formErrorsModel = (schema) => {
  return schema.reduce((obj, item) => {
    return {
      ...obj,
      [item.name]: null
    }
  }, {})
}
