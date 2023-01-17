const authenticationDetail = `
  fragment authenticationDetail on AuthenticationDetail {
    isMFARequired,
    isPasswordExpired
    isSelfServiceUser
    mfaDeliveryMethods
  }
`

export {
  authenticationDetail
}
