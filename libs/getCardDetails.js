/* @flow */

import requestPromise from 'request-promise-native'

type Config = {
    headers: {
        [configName: string]: string,
    },
    endpoint: string,
}

type Response = {
    state:
        | 'AVAILABLE'
        | 'CURRENTLY_IN_USE'
        | 'USED'
        | 'EXPIRED'
        | 'PREVERIFICATION'
        | 'VERIFYING'
        | 'VERIFICATION_FAILED',
    cardTokenId: string,
    cardType: 'master-card' | 'visa-card',
    maskedPan: string,
    default: boolean,
    createdAt: string,
    updatedAt: string,
}

export default ({headers, endpoint}: Config) => (customerId: string, cardId: string): Promise<Response> => {
    const ROUTE = `/payments/v1/customers/${customerId}/cards/${cardId}`

    const options = {
        method: 'GET',
        uri: `${endpoint}${ROUTE}`,
        headers,
        json: true,
    }

    return requestPromise(options)
}
