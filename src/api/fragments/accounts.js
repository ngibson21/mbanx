const currentAccount = `
  fragment currentAccount on SavingsAccount {
    id
    accountNumber
    minimumRequiredOpeningBalance
    overdraftLimit
    minimumRequiredBalanceEnforced
    onHoldFunds
    savingsOnHoldAmount
    product {
      name
    }
    currency {
      code
    }
    summary {
      accountBalance
    }
    status
  }
`

const currentAccountDetails = `
  fragment currentAccountDetails on SavingsAccount {
    id
    client {
      id
      firstName
      lastName
      displayName
    }
    currency {
      digitsAfterDecimal
      inMultiplesOf
    }
    approvedOnDate
    product {
      id
      shortName
    }
  }
`

const loanAccount = `
  fragment loanAccount on Loan {
    id
    accountNumber
    product {
      name
    }
    summary {
      totalOutstanding
    }
    productDetail {
      currency {
        code
      }
    }
    loanStatus
  }
`

const loanAccountDetails = `
  fragment loanAccountDetails on Loan {
    id
    product {
      shortName
    }
    actualDisbursementDate
    actualMaturityDate
    summary {
      totalFeeChargesCharged
    }
    charges {
      penaltyCharge
    }
    productDetail {
      annualNominalInterestRate
      numberOfRepayments
    }
  }
`

export {
  currentAccount,
  loanAccount,
  currentAccountDetails,
  loanAccountDetails
}
