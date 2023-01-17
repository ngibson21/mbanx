import { withAuth } from '@/api/request.js'
import { card } from '@/api/fragments/index.js'

const request = withAuth()

const updateOnlinePayment = (cardId, value) => {
  return request({
    data: {
      query: `
        mutation {
          updateCard (
            id: ${cardId}, 
            input: {
              onlinePaymentEnabled: ${value}
            }
          ) {
            id
          }
        }
      `
    }
  })
}

const updateContactlessPayment = (cardId, value) => {
  return request({
    data: {
      query: `
        mutation {
          updateCard (
            id: ${cardId}, 
            input: {
              contactlessPaymentEnabled: ${value}
            }
          ) {
            id
          }
        }
      `
    }
  })
}

const updateStatus = (cardId, value) => {
  return request({
    data: {
      query: `
        mutation{
          handleCardEvent(id:${cardId},
          input: {event: ${value}}){
            id
            status
          }
        }
      `
    }
  })
}

const cardsList = () => {
  return request({
    data: {
      query: `
        {
          Cards (where: {status:{NIN:[TERMINATED, REJECTED]}}) {
            select {
              ...card
            }
          }
        }
        ${card}
      `
    }
  })
}

const getPin = (id) => {
  return request({
    data: {
      query: `
        {
          pin:getPin(id: ${id} )
        }
      `
    }
  })
}

const getCvv = (id) => {
  return request({
    data: {
      query: `
        {
          cvv:getCsc(id: ${id} )
        }
      `
    }
  })
}

const updateRegion = (cardId, value) => {
  return request({
    data: {
      query: `
        mutation {
          updateCard (
            id: ${cardId}, 
            input: {
              blockedCountries: [${value.map(i => `"${i}"`).join(',')}]
            }
          ) {
            id
          }
        }
      `
    }
  })
}

const updateCardLimit = (cardId, velocityRules) => {
  return request({
    data: {
      query: `
      mutation {
        updateCard (id: ${cardId}, input: {
          velocityRules: [${velocityRules.map(item => `{
            controls: [${item.controls[0]}],
            type: ${item.type},
            timePeriod: ${item.timePeriod},
            timeUnit: ${item.timeUnit.toUpperCase()},
            value: ${item.value}
          }`).join(',')}]
        }) {
          id
        }
      }
      `
    }
  })
}

export {
  cardsList,
  updateOnlinePayment,
  updateContactlessPayment,
  updateStatus,
  getPin,
  getCvv,
  updateRegion,
  updateCardLimit
}
