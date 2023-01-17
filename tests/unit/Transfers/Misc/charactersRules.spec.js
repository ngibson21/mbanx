import { allowCharacterSet, validateCharactersField } from '@/components/Transfers/Misc/charactersRules.js'
import i18n from '@/plugins/i18n.js'

// character that allowed: /^[a-z0-9\s/?:().,'+-]+$/i

it('should return true if it is number', () => {
  const event = {
    charCode: 48 // is number 0
  }
  expect(allowCharacterSet(event)).toBeTruthy()
})

it('should return true if it is number', () => {
  const event = {
    which: 48 // is number 0
  }
  expect(allowCharacterSet(event)).toBeTruthy()
})

it('should return false if it is a special character that not in the set', () => {
  const event = {
    charCode: 37,
    preventDefault: () => {} // is %
  }
  expect(allowCharacterSet(event)).toBeFalsy()
})

it('should not show validation text when it has character in the set', () => {
  expect(validateCharactersField(0)).toBeFalsy()
})

it('should show validation text when it has character not in the set', () => {
  expect(validateCharactersField('%')).toBe(i18n.t('components.transfers.new.specialCharactersAllow'))
})
