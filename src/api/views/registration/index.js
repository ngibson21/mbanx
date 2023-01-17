import {
  noAuth,
  withAuth,
  restApi
} from '@/api/request.js'

const requestNoAuth = noAuth()
const requestWithAuth = withAuth()
const requestRestApi = restApi()

const getConfiguration = () => {
  return requestWithAuth({
    data: {
      query: `
      {
        getOnBoardingTemplate (entityType: "Registration" ) {
          steps {
            stepId
            title
            description
            position
            isMultiRow
            isDataTable
            resourceIdentifier
            resourcePath
            groupName
            sections {
              id
              title
              description
              position
            }
          }
        }
      }
      `
    }
  })
}

const getStepConfiguration = (stepId) => {
  return requestWithAuth({
    data: {
      query: `
      {
        getStepDetails (stepId: ${stepId}) {
          title
          description
          isDataTable
          resourceIdentifier
          resourcePath
          position
          sections {
            id
            title
            description
            position
          }
          columnHeaders {
            columnName
            columnDisplayType
            columnDisplayName
            columnType
            sectionId
            columnCode
            columnLength
            columnValues {
              value
              id
            }
            isColumnNullable
            isColumnPrimaryKey
            regex
          }
          data
        }
      }
      `
    }
  })
}

const registerClient = (data) => {
  return requestNoAuth({
    data: {
      query: `
        mutation {
          registerUnverifiedOrgUser(input: {
            firstName: "${data.firstName}"
            lastName: "${data.lastName}"
            password: "${data.password}"
            email: "${data.email}"
          })
        }
      `
    }
  })
}

const createClient = (appUserId, fullname) => {
  return requestWithAuth({
    data: {
      query: `
      mutation {
        registerOnBoardingClient(appUserId:${appUserId} input:{
          fullname: "${fullname}"
        })
      }
      `
    }
  })
}

const getClientAddressTypes = () => {
  return requestWithAuth({
    data: {
      query: `
        {
          getClientAddressTypes { id label }
        }
      `
    }
  })
}

const getCountries = () => {
  return requestWithAuth({
    data: {
      query: `
      {
        getCountries{
          id
          label
        }
      }
      `
    }
  })
}

const getStates = (countryId) => {
  return requestWithAuth({
    data: {
      query: `
        {
          getStates(countryId: ${countryId}){
            id
            label
          }
        }
      `
    }
  })
}

const updateClient = (data) => {
  const clientAddresses = data.addressLine1 ? `
    addresses: [
      {
        addressTypeId: ${data.addressTypeId ? `"${data.addressTypeId}"` : null},
        addressLine1: ${data.addressLine1 ? `"${data.addressLine1}"` : null}
        addressLine2: ${data.addressLine2 ? `"${data.addressLine2}"` : null}
        countryId: ${data.countryId ? `"${data.countryId}"` : null}
        stateId: ${data.stateId ? `"${data.stateId}"` : null}
        postalCode: ${data.postalCode ? `"${data.postalCode}"` : null}
        city: ${data.city ? `"${data.city}"` : null}
        mobileNo: ${data.mobileNo ? `"${data.mobileNo}"` : null}
      }
    ]
  ` : ''

  return requestWithAuth({
    data: {
      query: `
        mutation {
          updateUnverifiedClient(input: {
            ${clientAddresses}
          })
        }
      `
    }
  })
}

const getOnboardingStatus = (clientId) => {
  return requestWithAuth({
    data: {
      query: `
      {
        getOnBoardingStatus(clientId: ${clientId}) {
          onBoardingStatus
          nextStep
        }
      }      
      `
    }
  })
}

const finishStaticStep = (stepId, clientId) => {
  return requestWithAuth({
    data: {
      query: `
        mutation {
          updateWorkFlowStatusForStaticTable (stepId: ${stepId}, clientId: ${clientId})
        }
      `
    }
  })
}

const addStepData = async ({ stepId, clientId, data, resourcePath, originalData }) => {
  if (resourcePath === 'SetCompanyName') {
    const companyName = originalData.company_name

    if (companyName) {
      await requestWithAuth({
        data: {
          query: `
          mutation{
            updateUnverifiedClient(input:{
              fullName: "${companyName}"
            })
          }
          `
        }
      })
    }
  }
  return requestWithAuth({
    data: {
      query: `
        mutation {
          createUnverifiedOnBoardingStep (input: {
            stepId: ${stepId}
            clientId: ${clientId}
            requestData: ${data}
          }) {
            changes
          }
        }
      `
    }
  })
}

const updateStepData = () => {

}

const uploadClientDocument = ({ clientId, formData }) => {
  const data = new FormData()
  data.append('name', formData.name)
  data.append('file', formData.file)

  return requestRestApi({
    method: 'post',
    url: `/clients/${clientId}/documents`,
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 20000,
    data
  })
}

export {
  registerClient,
  getConfiguration,
  getStepConfiguration,
  getOnboardingStatus,
  finishStaticStep,
  addStepData,
  updateStepData,
  uploadClientDocument,
  createClient,
  getClientAddressTypes,
  getCountries,
  getStates,
  updateClient
}
