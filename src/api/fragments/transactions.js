const savingsTransaction = `
  fragment savingsTransaction on SavingsAccountTransaction {
    account {
      id
      currency {
        code
      }
    }
    amount
    createdAt
    typeOf
    paymentDetail {
      reference
    }
  }
`

const savingsTransactionDetails = `
  fragment savingsTransactionDetails on SavingsAccountTransaction {
    account {
      accountNumber
    }
    paymentDetail {
      creditor {
        name
        identifier
        address
        country
        city
        postalCode
      }
      debtor {
        name
        identifier
        address
        country
        city
        postalCode
      }
      paymentType {
        name
      }
    }
    bookingDate
  }
`

const loanTransaction = `
fragment loanTransaction on LoanTransaction {
  typeOf
  valueDate
  amount
  outstandingLoanBalance
  penaltyChargesPortion
  feeChargesPortion
  interestPortion
  principalPortion
  loan {
    id
    productDetail {
      currency {
        code
      }
    }
  }
}
`

export {
  savingsTransaction,
  savingsTransactionDetails,
  loanTransaction
}
