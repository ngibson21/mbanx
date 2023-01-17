function auth (axios) {
  axios.interceptors.request.use(
    request => {
      const accessToken = sessionStorage.getItem('access_token')
      const twoFaToken = sessionStorage.getItem('2FA-Token')

      if (accessToken) {
        Object.assign(request.headers, {
          Authorization: `Bearer ${accessToken}`
        })
      }

      if (twoFaToken) {
        Object.assign(request.headers, {
          '2FA-Token': twoFaToken
        })
      }

      return request
    },
    error => {
      throw error
    }
  )
}

export default auth
