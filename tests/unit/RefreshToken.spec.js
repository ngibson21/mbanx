/* eslint-disable camelcase */

import axios from 'axios'
import * as refreshMiddleware from '@/api/middleware/refreshToken.js'

class LocalStorageMock {
  constructor () {
    this.store = {}
  }

  getItem (key) {
    return this.store[key] || null
  }

  setItem (key, value) {
    this.store[key] = value.toString()
  }
};

global.sessionStorage = new LocalStorageMock()

describe('validate expired token', () => {
  sessionStorage.setItem('access_token', '123456789')
  sessionStorage.setItem('refresh_token', 'refreshtoken')

  it('should return new token when token is expired', async () => {
    const instance = axios.create()

    instance.request = jest.fn()
    refreshMiddleware.default(instance)
    refreshMiddleware.refresh = jest.fn().mockImplementation(async () => {
      return {
        data: {
          access_token: '987654321',
          refresh_token: 'newrefreshtoken'
        }
      }
    })

    // mock interceptors response to return error
    sessionStorage.setItem('access_token', '123456789')
    sessionStorage.setItem('refresh_token', 'refreshtoken')
    await instance.interceptors.response.handlers[0].rejected({
      response: {
        status: 401,
        data: { message: 'unauthorized', error: 'invalid_token' }
      },
      config: {
        headers: ''
      }
    })
    expect(sessionStorage.getItem('access_token')).toBe('987654321')
    expect(sessionStorage.getItem('refresh_token')).toBe('newrefreshtoken')
    expect(refreshMiddleware.refresh).toHaveBeenCalled()
  })
})
