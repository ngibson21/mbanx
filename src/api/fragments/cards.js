const card = `
  fragment card on Card {
    id
    expiresOn
    primaryAccountNumber
    status
    embossedNames
    activatedAt
    account {
      id
      accountNumber
      minimumRequiredOpeningBalance
      overdraftLimit
      minimumRequiredBalanceEnforced
      onHoldFunds
      savingsOnHoldAmount
      summary {
        accountBalance
      }
      currency {
        code
      }
    }
    product {
      name
      network
      velocityRules{
        id
        value
        timeUnit
        controls
      }
    }
    onlinePaymentEnabled
    contactlessPaymentEnabled
    blockedCountries
    velocityRules{
      timeUnit
      value
      controls
      type
      timePeriod
      id
    }
  }
`

export {
  card
}
