import Base from '@/components/Shared/Form/Elements/Base.js'

test('components.shared.formElements.base.js', () => {
  Base.rules = []
  Base.rules.push('required')
  Base.validation = []
  Base.created()

  expect(typeof Base.data() === 'object').toBeTruthy()
  expect(typeof Base.validation[0] === 'function').toBeTruthy()
})
