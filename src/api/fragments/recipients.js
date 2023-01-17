const recipient = `
  fragment recipient on Beneficiary {
    name
    email
    creditor {
      name
      identifier  
    }
  }
`

export {
  recipient
}
