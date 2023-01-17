import vuetify from 'vuetify/es5/locale/en.js'

export default {
  $vuetify: vuetify,
  apiResponses: {
    errors: {
      invalidGrant: 'Incorrect login details',
      timeout: 'Request timeout',
      failedToConnect: 'The was a problem connecting to the server. Please try again.',
      otp: {
        token: {
          invalid: 'Invalid token',
          incorrectOtp: 'Incorrect OTP'
        }
      },
      noPermissions: 'User has no sufficient permissions to log in to web banking',
      sessionExpired: 'Session has expired'
    }
  },
  transactionType: {
    0: 'Invalid',
    1: 'Deposit',
    2: 'Withdrawal',
    3: 'Interest Posting',
    4: 'Withdrawal Fee',
    5: 'Annual Fee',
    6: 'Waive Charges',
    7: 'Pay Charge',
    8: 'Dividend Payout',
    12: 'Initiate Transfer',
    13: 'Approve Transfer',
    14: 'Withdraw Transfer',
    15: 'Reject Transfer',
    16: 'Written Off',
    17: 'Overdraft Interest',
    18: 'Withhold Tax',
    19: 'Escheat',
    20: 'Amount Hold',
    21: 'Amount Release',
    transfer: 'Transfer between account',
    pending: 'Pending Transaction'
  },
  loanTransactionType: {
    0: 'Invalid',
    1: 'Disbursement',
    2: 'Repayment',
    3: 'Contra',
    4: 'Waive interest',
    5: 'Repayment at disbursement',
    6: 'Writeoff',
    7: 'Marked for rescheduling',
    8: 'Recovery repayment',
    9: 'Waive charges',
    10: 'Accrual',
    12: 'Initiate transfer',
    13: 'Approve transfer',
    14: 'Withdraw transfer',
    15: 'Reject transfer',
    16: 'Refund',
    17: 'Charge payment',
    18: 'Refund for active loan',
    19: 'Income posting'
  },
  transferType: {
    SWIFT: 'Swift',
    INTERNAL_TRANSFER: 'Internal'
  },
  components: {
    login: {
      title: 'Login',
      submitButton: 'Login'
    },
    menu: {
      dashboard: 'Dashboard',
      accounts: 'Accounts',
      transactions: 'Transactions',
      standingOrders: 'Standing orders',
      products: 'Products',
      cards: 'Cards',
      recipients: 'Recipients',
      communications: 'Messages',
      home: 'Home',
      transfer: 'Transfer'
    },
    toolBar: {
      profile: {
        dropdown: {
          settings: 'My settings',
          darkMode: 'Dark mode',
          logout: 'Logout'
        }
      }
    },
    loadingScreen: {
      loading: 'Getting ready'
    },
    dashboard: {
      intro: {
        overallBalance: 'Balance of all your {currency} accounts',
        lastLogin: 'Last logged in',
        date: 'Date',
        browser: 'Browser',
        location: 'Location',
        chart: {
          thisMonth: 'this month',
          lastMonth: 'last month'
        }
      }
    },
    transactions: {
      searchFilters: {
        search: 'Search',
        fromDate: 'Form date',
        toDate: 'To date',
        moreFilters: 'More filters',
        clear: 'Clear',
        applyFilter: 'Apply filter',
        datePicker: {
          toDate: 'To',
          fromDate: 'From'
        },
        invalidDateFormat: 'Please enter a valid date format'
      },
      list: {
        account: 'Account',
        noData: 'No transactions data',
        noSelectAcc: 'You must select at least one account',
        loading: 'Loading transactions...'
      },
      detail: {
        receiver: 'Receiver',
        txDetail: 'Transaction Details',
        accDetails: 'Account Details',
        nameAndAddress: 'Name and Address',
        subject: 'Subject',
        booking: 'Booking',
        type: 'Type',
        amount: 'Amount',
        fromAcc: 'From Account'
      },
      accountSelection: {
        includeClosedAccounts: 'Include closed accounts'
      }
    },
    accounts: {
      list: {
        savings: {
          title: 'Savings Accounts',
          balance: 'Available balance'
        },
        loan: {
          title: 'Loan Accounts',
          balance: 'Loan amount'
        }
      },
      lastTransactions: {
        title: 'Latest transactions'
      },
      headers: {
        savings: {
          balance: 'Available balance'
        },
        loan: {
          balance: 'Loan amount'
        }
      },
      details: {
        title: 'Account details',
        branch: 'Branch',
        openingDate: 'Opening Date',
        accountNo: 'Account Number',
        holder: 'Account Holder',
        status: 'Account Status',
        type: 'Account Type',
        accountCurrency: 'Account Currency',
        overdraftAmount: 'Ovedraft Amount',
        interestRate: 'Interest Rate',
        availableBalance: 'Available Balance',
        currentBalance: 'Current Balance',
        iban: 'IBAN',
        swiftCode: 'Swift Code',
        savingsAccountStatusType: {
          active: 'Active'
        },
        accountType: {
          individual: 'Individual'
        },
        productName: 'Product Name',
        loanAmount: 'Loan Amount',
        diburseDate: 'Disbursement date',
        matureOn: 'Matures on',
        fees: 'Fees',
        noOfRepay: 'No. of repayments',
        penalties: 'Panalties'
      },
      savingAccountStatus: {
        100: 'Created',
        200: 'Approved',
        300: 'Activated',
        400: 'Withdrawn',
        500: 'Rejected',
        600: 'Closed'
      }
    },
    transfers: {
      recent: {
        recentTransfers: 'Create new transfer from recent ones',
        noRecentTransfer: 'No recent transfer'
      },
      recipients: {
        recipients: 'Create new transfer to one of your beneficiaries'
      },
      internal: 'Internal',
      domestic: 'Domestic',
      initiate: 'Initiate Transfer',
      confirmation: {
        title: 'Transfer Confirmation',
        submitTransfer: 'Submit Transfer',
        recipient: {
          subtitle: 'Recipient',
          branch: 'Account Number - Branch',
          accountHolder: 'Account Holder',
          iban: 'IBAN'
        },
        sender: {
          subtitle: 'Sender'
        },
        details: {
          firstName: 'First Name',
          lastName: 'Last Name',
          nickName: 'Nick Name',
          subtitle: 'Transfer Details',
          account: 'Account',
          type: 'Transfer Type',
          amount: 'Amount',
          availableBalance: 'Available Balance',
          title: 'Transfer Title',
          reference: 'Transfer Description'
        }
      },
      form: {
        title: 'Details',
        agree: 'Agree to T&C',
        amount: 'Amount',
        subject: 'Subject',
        reference: 'Reference',
        optional: 'Optional',
        subjectLength: 'Must be less than 120 characters',
        subjectRequired: 'Subject is required',
        amountRequired: 'Amount is required',
        termAgree: 'You must agree to T&C',
        submit: 'Submit',
        clear: 'Clear',
        accountSelectRule: 'Please select Account and Transfer Type'
      },
      transferType: {
        title: 'Select transfer type',
        internalTransfer: 'Internal transfer to:',
        domesticTransfer: 'Domestic transfer to:',
        sepaTransfer: 'SEPA transfer to:',
        changeType: 'Change Type'
      },
      accountSelection: {
        title: 'From account',
        changeAccount: 'Change Account',
        debtor: 'From account'
      },
      searchList: {
        makeTransfer: 'Make a transfer to',
        noMatch: `We haven't found any matching recipient or transaction for {user}`,
        search: 'Use search to initiate a transfer',
        wouldYouLike: 'Would you like to create a new transfer?',
        newTransfer: 'New transfer'
      },
      new: {
        specialCharactersAllow: `Allowed special characters: / ? : ( ) . , ' + -`,
        form: {
          enterRecipientDetails: 'Enter recipient details',
          amount: 'Enter amount to transfer',
          subject: 'Subject',
          next: 'Next',
          requiredRule: 'Field is required',
          limitChar: 'Cannot be longer than 120 characters',
          minValue: 'Amount must be greater than 0',
          update: 'Update'
        },
        transferTypes: {
          recipientName: 'Recipient name',
          accountNo: 'Account number',
          iban: 'IBAN',
          bankCode: 'Bank Code',
          bic: 'BIC',
          email: 'Email'
        },
        recipient: {
          required: 'Field is required',
          minLength: 'Must be more than 2 characters'
        },
        accountSelection: {
          title: 'Select account to transfer money from'
        },
        preview: {
          updateRecipient: 'Update recipient data'
        },
        summaryPage: {
          confirmNewTransfer: 'Confirm new transfer',
          remainBalance: 'At your account will remain',
          debitBalance: 'Your account will be debited with',
          confirm: 'Confirm Transfer',
          exceededBalance: 'There is not enough money on your account to make this transfer. You have {accountAmount} on your account.'
        },
        successPage: {
          success: 'Your transfer to {recipientName} was successful',
          transferred: 'transferred',
          noAdditionalCharges: 'no additional charges were applied',
          returnToDashboard: 'return to dashboard',
          saveAsPdf: 'save as pdf',
          saveAsRecipient: 'save as Recipient'
        },
        panel: {
          title: 'New Transfer',
          recipientDetailsInfoTitle: 'Recipient Details',
          transferDetailsInfoTitle: 'Transfer Details',
          debitAccountInfoTitle: 'Debit Account',
          transferTypeInfoTitle: 'Transfer Type'
        },
        paymentType: {
          normalTransferTitle: 'Up to couple of days',
          instantTransferTitle: 'Instant Transfer'
        }
      },
      creation: {
        domesticType: {
          recipientAddressTitle: 'Recipient Address',
          fullName: 'Recipient full name',
          nickname: 'Nickname',
          accountNo: 'Account Number',
          sortCode: 'Sort Code',
          routingNumber: 'Routing Number',
          country: 'Country',
          city: 'City',
          postalCode: 'Postal Code',
          streetAddressLine: 'Street Address Line {lineNumber}'
        },
        emailType: {
          nickname: 'Nickname',
          fullName: 'Recipient full name',
          email: 'Recipient email'
        },
        sepaType: {
          nickname: 'Nickname',
          fullName: 'Recipient full name',
          iban: 'IBAN',
          bic: 'BIC'
        },
        minLength: 'Must be {length} characters or more',
        maxLength: 'Must be less than {length} characters',
        required: 'This field is required',
        invalidEmail: 'Invalid email',
        success: {
          message: 'Your new recipient {nickname} was successfully stored',
          accountNo: 'Account No.',
          sortCode: 'Sort code',
          iban: 'IBAN',
          bic: 'BIC',
          email: 'Email',
          returnToDashboard: 'return to dashboard'
        }
      }
    },
    shared: {
      formElement: {
        inputFile: {
          upload: 'Upload a document',
          uploaded: 'Uploaded',
          uploadHelper: '* Support file type: jpg, png, pdf. Max 10Mb'
        },
        inputDate: {
          cancel: 'Cancel',
          confirm: 'Confirm'
        }
      },
      confirmation: {
        default: {
          title: 'Confirm your action with OTP',
          description: 'To verify your request, enter the token that was sent to your email address.',
          descriptionTOTP: 'To verify your request, enter token from two-factor app on your mobile device.',
          subDescription: 'You can cancel this OTP confirmation. Action will be canceled.',
          confirm: 'Confirm',
          cancel: 'Cancel',
          fieldRequired: 'OTP is required'
        },
        submitTransfer: {
          title: 'Confirm new transfer',
          description: 'Verify your transfer. Enter token that was sent to your email address.',
          descriptionTOTP: 'Verify your transfer. enter token from two-factor app on your mobile device.',
          subDescription: 'You can cancel this confirmation, no new transfer will be created.'
        }
      },
      greetings: {
        night: 'Good night,',
        morning: 'Good morning,',
        afternoon: 'Good afternoon,',
        evening: 'Good evening,',
        whatTime: 'What time is it?'
      },
      messages: {
        noData: 'No data available',
        fieldRequired: 'This field is required',
        emailInvalid: 'Invalid Email',
        phoneNumberInvalid: 'Invalid phone number',
        pinLengthInvalid: 'PIN must be {length} digits',
        pinNotMatch: 'PIN not match',
        patternNotMatch: 'Invalid value.'
      },
      dateFormat: {
        today: 'Today',
        yesterday: 'Yesterday'
      }
    },
    cards: {
      title: 'Cards',
      replacement: 'Replacement',
      renewedNotify: 'of your card is on the way. Once you will receive your new card please activate it.',
      expiredNotify: 'Your card has expired.',
      confirmation: {
        viewPin: {
          title: 'Confirm view pin'
        },
        activate: {
          title: 'Confirm card activation'
        },
        blocked: {
          title: 'Confirm card block'
        }
      },
      security: {
        title: 'Security',
        onlinePayments: 'Online payments',
        contactlessPayments: 'Contactless payments'
      },
      details: {
        validTo: 'Valid To',
        validThru: 'valid',
        cvc: 'cvc',
        blocked: 'Card is blocked',
        block: 'Block card',
        freeze: 'Freeze card',
        showPin: 'Show PIN',
        showDetails: 'Card details',
        replace: 'Replace card',
        activate: 'Activate card',
        pin: {
          sec: 'sec',
          title: 'Card PIN'
        }
      },
      limits: {
        note: {
          note: 'Note:',
          details: 'Your card spend is limited to default limits. You can define your own limits. By doing so default limits will be disabled, and only your limits will be in use.',
          extra: 'Deleting new limits will reset to default limits.'
        },
        title: 'Limits',
        cardPayments: 'Card payments',
        cashWithDrawals: 'Cash withdrawals',
        maxRule: 'Excess maximum amount',
        secondsLimit: 'Single limit',
        daysLimit: 'Daily limit',
        monthsLimit: 'Monthly limit',
        weeksLimit: 'Weekly limit',
        amountCannotBeHigher: 'Amount cannot be higher than {amount}',
        amountCannotBeLower: 'Amount cannot be lower than {amount}',
        limitCannotBeADecimalNumber: 'Limit cannot be a decimal number',
        limitCannotBeEqualToZero: 'Limit cannot be equal to 0',
        defaultLimit: 'default {amount}',
        cancel: 'Cancel',
        save: 'Save'
      },
      regions: {
        title: 'Regions',
        blockedRegion: 'Blocked regions',
        cancel: 'Cancel',
        save: 'Save',
        success: 'Block regions updated'
      },
      mobileList: {
        selectCard: 'Select card'
      },
      notification: {
        msg: {
          cardGetOrdered: 'Your {cardProductName} order is being processed now. You will be notified when status of your order will change.',
          cardGetActivated: 'Your new {cardProductName} is ready to be activated. Once you will receive your card you can activate it and start using it.'
        },
        alert: {
          activatedSuccess: 'You have activated your new card'
        },
        btn: {
          activate: 'Activate your new card'
        }
      }
    },
    settings: {
      general: {
        languages: 'Languages',
        languagesDescription: 'Choose display language',
        dateFormat: 'Date Format',
        dateFormatDescription: 'Choose display date format',
        mainCurrency: 'Main Currency',
        mainCurrencyDescription: 'Choose main currency',
        information: 'Information',
        help: 'Help',
        accounts: 'Accounts',
        save: 'Save'
      },
      notification: {
        newOutgoingTransaction: 'New outgoing transaction',
        newOutgoingTransactionDescription: 'Change new outgoing transaction',
        newIncomingTransaction: 'New incoming transaction',
        newIncomingTransactionDescription: 'Change new incoming transaction',
        upcomingStandingOrder: 'Upcoming standing order',
        upcomingStandingOrderDescription: 'Change upcoming standing order',
        executionStandingOrder: 'Execution standing order',
        executionStandingOrderDescription: 'Change execution standing order',
        insufficientFundStandingOrder: 'Insufficient fund standing order',
        insufficientFundStandingOrderDescription: 'change insufficient fund standing order',
        newMonthlyStatement: 'New monthly statement',
        newMonthlyStatementDescription: 'Change new monthly statement',
        newMessage: 'New message',
        newMessageDescription: 'Change new message',
        save: 'Save'
      },
      security: {
        pinTitle: 'PIN',
        pinDescription: 'Change your PIN',
        currentPin: 'Current PIN',
        newPin: 'New PIN',
        confirmPin: 'Confirm PIN',
        changePinButton: 'Change PIN',
        passwordTitle: 'Password',
        passwordDescription: 'Change your password',
        currentPassword: 'Current Password',
        currentPasswordInfo: 'Please remember and keep it confidential',
        newPassword: 'Input New Password',
        newPasswordInfo: 'Keep your password confidential',
        confirmPassword: 'Confirm Password',
        confirmPasswordInfo: 'Please re-enter your new password',
        changePasswordButton: 'Change Password',
        passwordChanged: 'Password has been changed successfully',
        totpTitle: 'Register Two-Factor Authenticator',
        totpDescription: `Increase your account's security by enabling Two-Factor Authentication (2FA)`,
        totpEnabled: `You've already enabled two-factor authentication using one time password authenticators. In order to register a different device, you must first disable two-factor authentication.`,
        totpScanQr: 'Install an authenticator app such as Google, Microsoft or any other on your mobile device and use the app to scan this QR code.',
        totpCantScanQr: `Can't scan the code?`,
        totpManualKey: 'To add the entry manually, provide the following details to the application on your phone.',
        totpManualKeyMobile: 'Open your authentication app and enter the code below.',
        totpKey: 'Key:',
        totpConfirmation: 'Confirm activation of 2FA with generated token',
        totpConfirm: 'Confirm activation',
        totpDisableStatus: 'Status: Disabled',
        totpEnable: 'Enable 2FA',
        totpDisable: 'Disable 2FA',
        token: 'Token',
        confirmWithtwoFactorApp: 'Confirm with two-factor app',
        disableTwoFactorAuthentication: 'Disable two-factor authentication?',
        invalidateRegisteredApplications: 'This will invalidate your registered applications.',
        doNotDisable: 'Do Not Disable',
        disableItForNow: 'Disable it for now',
        confirm: 'Confirm',
        recoveryCodesTitle: 'Two-factor Authentication Recovery codes',
        recoveryCodesDescription: 'Should you ever lose your phone or access to your one time password secret, each of these recovery codes can be used one time each to regain access to your account. Please save them in a safe place, or you will lose access to your account.',
        back: 'Back',
        downloadKey: 'Download Key',
        copiedSuccess: 'Copied',
        copiedFail: 'Cannot copy, please try again'
      }
    },
    communications: {
      all: 'All Messages',
      markAsResolved: 'Mark as resolved',
      status: 'Status',
      inProcess: 'In process',
      opened: 'Opened',
      closed: 'Closed',
      received: 'Received',
      download: 'Download',
      created: 'Created',
      inputMessage: 'Input message',
      itemsPerPage: 'Items per page:',
      noDataText: 'No data available',
      date: 'Date',
      statementOfAccount: 'Statement of account',
      ofAccount: 'of account',
      fileName: 'File name',
      newCommunication: {
        header: 'Create new message',
        categoryLabel: 'Message category',
        categories: {
          asset: 'My assets',
          bug: 'Report a bug'
        },
        titleLabel: 'Message title',
        messageLabel: 'Message',
        attachFile: 'Attach files',
        send: 'Send message',
        required: 'This field is required',
        minChar: 'Min {minChar} characters'
      },
      emptyMessages: {
        title: 'You have no messages',
        body1: 'Your message box is empty.',
        body2: 'We will let you know once you will have your first message.'
      }
    },
    recipients: {
      list: {
        search: 'Search',
        allRecipients: 'All recipients',
        accountNumber: 'Account number',
        bankCode: 'Bank code',
        nickname: 'Nickname',
        fullName: 'Full name',
        details: 'Details'
      },
      details: {
        details: 'Details',
        sendMoney: 'Send Money',
        title: 'Recipients Details',
        transactionList: 'Transaction history to recipient',
        accountNo: 'Account No',
        nickname: 'Nickname',
        fullName: 'Full Name',
        sortCode: 'Sort Code',
        deleteRecipient: 'Delete Recipient?',
        deleteRecipientDescription: 'Delete recipient will permanently remove it from your recipient list',
        delete: 'confirm',
        cancel: 'cancel',
        recipientHasBeenDeleted: 'Recipient has been deleted'
      },
      new: {
        title: 'Add new recipient',
        baseInfo: 'Base Information',
        additionalInfo: 'Additional Information (Optional)',
        save: 'Save recipient',
        email: 'Email address',
        mobile: 'Mobile number',
        transferReference: 'Transfer reference',
        maxAmount: 'Maximum single transaction',
        success: {
          message: 'Your recipient {nickname} was successfully stored',
          returnToDashboard: 'Return to dashboard',
          accountNo: 'Account No',
          bankCode: 'Bank Code'
        },
        validation: {
          email: 'Invalid Email',
          alreadyExist: 'Recipient already exist.'
        }
      }
    },
    registration: {
      header: 'Registration',
      step: 'Step: {step}',
      backToLogin: 'Back to login page',
      noWorkflow: {
        oops: 'Oops...',
        message: 'We currently unable to show you registration form. This is usually because we are making change on ourside. We appreciate your patience and understanding with this matter.'
      },
      accountTypeSelection: {
        header: 'Account type',
        personal: 'Personal',
        corporate: 'Corporate',
        welcomeMessage: 'Hi {name}',
        welcomeQuestion: 'which account would you like to open',
        backButton: 'Back'
      },
      customerCreation: {
        header: 'Get Started',
        fields: {
          firstName: {
            label: 'First name'
          },
          lastName: {
            label: 'Last name'
          },
          email: {
            label: 'Email address'
          },
          mobileNumber: {
            label: 'Mobile number'
          },
          password: {
            label: 'Choose a password'
          },
          repeatPassword: {
            label: 'Repeat the password'
          },
          consentMarketingEmails: {
            label: 'yes, send me news'
          },
          acceptanceOfTC: {
            label: 'I accept general terms and conditions'
          }
        },
        backButton: 'Back',
        nextButton: 'Next'
      },
      personalInformation: {
        header: 'Personal Information',
        fields: {
          firstName: {
            label: 'First name'
          },
          familyName: {
            label: 'Family name'
          },
          dateOfBirth: {
            label: 'Date of birth'
          },
          gender: {
            label: 'Gender'
          },
          nationality: {
            label: 'Nationality'
          },
          usCitizen: {
            label: 'US citizen (FATCA Compliance)'
          },
          termAgree: {
            label: 'I accept term of use & privacy policy'
          }
        },
        backButton: 'Back',
        nextButton: 'Next'
      },
      companyInformation: {
        header: 'Corporate Information',
        fields: {
          name: {
            label: 'Company Name'
          },
          email: {
            label: 'Email Address'
          },
          notRegistered: {
            label: 'Company not registered'
          },
          legalEntity: {
            label: 'Legal Entity'
          },
          founded: {
            label: 'When Founded'
          },
          countryRegistration: {
            label: 'Country of Entity Registration'
          },
          mobileNumber: {
            label: 'Mobile Number'
          },
          taxIdentification: {
            label: 'Tax Identification'
          }
        },
        backButton: 'Back',
        nextButton: 'Next'
      },
      residenceAddress: {
        header: 'Address Of Residence',
        fields: {
          addressTypeId: {
            label: 'Address Type'
          },
          address1: {
            label: 'Address 1'
          },
          address2: {
            label: 'Address 2'
          },
          country: {
            label: 'Country'
          },
          zipCode: {
            label: 'Zip Code'
          },
          state: {
            label: 'State'
          },
          postal: {
            label: 'Postal Code'
          },
          city: {
            label: 'City'
          }
        },
        backButton: 'Back',
        nextButton: 'Next'
      },
      identityVerification: {
        header: 'Identity Verification',
        fields: {
          documentType: {
            label: 'Document Type'
          },
          documentKey: {
            label: 'Document Key',
            exist: 'Document key is already used'
          }
        },
        backButton: 'Back',
        nextButton: 'Next'
      },
      pinCreation: {
        header: 'Create security PIN',
        fields: {
          Pin: {
            label: 'PIN'
          },
          confirmPin: {
            label: 'Confirm PIN'
          }
        },
        backButton: 'Back',
        nextButton: 'Create security PIN'
      },
      cardSelection: {
        header: 'Card Selection',
        cardType: {
          classic: 'Classic',
          platinum: 'Platinum'
        },
        yourPin: 'Your PIN',
        changePinQuestion: 'Do you want to change the PIN?',
        changePinAnswer: 'Yes',
        fields: {
          pin: {
            label: 'PIN'
          },
          confirmPin: {
            label: 'Confirm PIN'
          }
        },
        agreeOrder: 'I agree and order',
        noCard: `No, I don't need a card`,
        pleaseSelectCard: 'Please select card type',
        pleaseSelectAccountText: 'Please select account type to connect with this card:',
        pelaseSelectAccount: 'Please select account type',
        backButton: 'Back'
      },
      confirmation: {
        thanks: 'Thanks ',
        verifyingId: 'we are now verifying your ID.',
        details: 'Thank you for opening a bank account with us. Your identity is being now verified. Once we will be finished we will let you know.'
      },
      backToSignIn: 'Back to sign in',
      back: 'back',
      next: 'next'
    }
  },
  views: {
    error: {
      somethingwentwrong: 'Uppps, something went wrong.',
      technicalDifficulties: 'We are experiencing some technical difficulties.',
      tryAgainLater: 'Please try again later.',
      goBack: 'Go back',
      cannotFetch: 'Cannot retrive data from {resourceName}'
    },
    login: {
      welcomeMessage: 'The smartest way to bank',
      OtpMessage: {
        header: '{info} {action}',
        info: 'just one more step,',
        action: 'confirm it is you!',
        description: 'To access web banking,',
        deliveryMethod: {
          email: 'enter token that was sent to your {emailAddress}',
          totpMobile: 'enter token from {twoFacetorApp} on your mobile device.'
        },
        emailAddress: 'email address',
        twoFacetorApp: 'two-factor app',
        configMfa: 'Alternatively you can now configure your {mfa} to log in',
        mfa: 'MFA',
        enableTOTPSuccessfully: 'Enable TOTP successfully! Please log in again!'
      },
      form: {
        fields: {
          username: {
            label: 'User Identifier',
            placeholder: 'jon-snow',
            validation: {
              required: 'User Identifier is required'
            }
          },
          password: {
            label: 'Password',
            placeholder: 'Enter 6 characters or more',
            validation: {
              required: 'Password is required',
              characterCount: 'Enter {charLength} characters or more'
            }
          },
          otp: {
            label: 'Token',
            validation: {
              required: 'Token is required'
            }
          }
        },
        buttons: {
          signIn: 'Login',
          submitOtp: 'Confirm with token',
          confirm: 'Confirm'
        }
      },
      links: {
        forgotPassword: 'Forgot password?',
        needHelp: 'Need help?',
        needHelpLink: 'Click here',
        noAccount: `Don't have an account?`,
        noAccountLink: 'Create one here',
        backToLogin: 'Back'
      },
      notifications: {
        successfulLogin: 'Login successful',
        successfulLogout: 'Logout successful',
        accountNotReady: 'Your account is not ready, please try again later'
      },
      resetPassword: {
        success: {
          header: 'Your password has been changed successfully',
          description: 'You can now sign in to web banking using your new password',
          login: 'Log in to banking'
        },
        header: 'Your password has expired',
        description: 'To continue with web banking you will have to define your new password.',
        newPassword: 'Enter your new password',
        currentPassword: 'Enter your current password',
        confirmPassword: 'Confirm your new password',
        fieldRequired: 'Field is required',
        notMatch: 'Password does not match',
        changePassword: 'Change password'
      },
      forgotPassword: {
        header: 'Set your new password',
        description: 'To continue with web banking you will have to define your new password.',
        newPassword: 'Enter your new password',
        confirmPassword: 'Confirm your new password',
        fieldRequired: 'Field is required',
        changePassword: 'Change password',
        notMatch: 'Password do not match',
        backToLogin: 'Back',
        request: {
          header: 'Request password reset',
          description: 'Enter your username used to login to web banking',
          user: 'Enter your username',
          submit: 'Submit',
          backToLogin: 'Back',
          success: {
            title: 'Reset link has been sent',
            reset: {
              description: 'To reset your password, please follow instructions sent to your {emailAddress}',
              deliveryMethod: {
                email: 'email address'
              }
            }
          },
          required: 'Field is required',
          error: 'Service is temporarily unavailable, please try again later'
        }
      }
    },
    dashboard: {
      header: 'Dashboard',
      financialBreakdown: {
        title: '{monthlyOrWeekly} breakdown',
        titleOptions: {
          weekly: 'weekly',
          monthly: 'monthly'
        },
        settings: {
          showWeekly: 'show weekly',
          showMonthly: 'show monthly'
        }
      },
      accounts: {
        title: 'Accounts',
        availableBalance: 'Available balance'
      },
      lastTransactions: {
        title: 'Last transactions'
      },
      standingOrders: {
        title: 'Standing orders'
      },
      frequentTransfers: {
        title: 'Most Frequent Transfers'
      },
      analytics: {
        title: 'Analytics'
      },
      cards: {
        title: 'Cards'
      }
    },
    accounts: {
      header: 'My Accounts',
      closeDetails: 'Close details',
      details: {
        header: 'Account Details'
      },
      loan: {
        header: 'Loans'
      }
    },
    recipients: {
      header: 'Recipients',
      searchPlaceholder: 'Search by nickname, account number, subject, etc.',
      add: 'Create recipient',
      new: {
        header: 'Create Recipient',
        title: 'Enter Recipient Details '
      }
    },
    transactions: {
      header: 'Transactions',
      search: 'Search',
      accountsFilter: {
        filter: 'Filter by accounts'
      }
    },
    transfers: {
      header: 'Create Transfer',
      recipientTitle: 'Browse recipients and history',
      confirmation: {
        title: 'Transfer Confirmation',
        success: 'Transfer Success'
      }
    },
    transfer: {
      header: 'Create new transfer'
    },
    cards: {
      header: 'Card Center',
      noCard: {
        title: `You don't have any cards`,
        description: 'Order your first card, and start using all benefits that it gives you',
        benefits: {
          contactlessPayments: 'Contactless payments',
          onlinePayments: 'Secure online transactions',
          geoSupport: 'GEO location support'
        },
        selectCard: 'select your card'
      }
    },
    settings: {
      header: 'Settings',
      tabs: {
        general: 'General',
        notification: 'Notification',
        security: 'Security'
      }
    },
    communications: {
      header: 'Messages'
    },
    a2hs: {
      greeting: 'Hey {name}, ',
      message: 'did you know you can install banking as standalone application?',
      installWebBanking: 'Install WebBanking',
      ios: {
        message: 'Install this application',
        subMessage: 'Tap {image} and then {subMessageBold}',
        subMessageBold: 'add to Home Screen'
      },
      chrome: {
        title: 'Add to home screen',
        message: 'Install Web Banking on your device as a standalone application',
        subMessage: 'On your home screen new icon for Web Banking will be created. You will be able to use this icon to get instant access to Web banking',
        install: 'Install'
      },
      others: {
        title: 'Add to home screen',
        message: 'Please use Google Chrome to install Web Banking application on your device.'
      }
    },
    errorCodes: {
      notMatch: 'Your current password is incorrect',
      differentNewPassword: 'New password must be different from current password',
      invalidToken: 'Your reset password token is invalid',
      tokenExpired: 'Your reset password token has expired',
      error: 'Error',
      noActiveSavings: 'User has no active savings account'
    }
  }
}
