/* @flow */

import requestPromise from 'request-promise'

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

export default ({headers, endpoint}: Config) => (
    customerId: string,
    cardId: string,
    isDefault: boolean
): Promise<Response> => {
    const ROUTE = `/payments/v1/customers/${customerId}/cards/${cardId}`

    const options = {
        method: 'PUT',
        uri: `${endpoint}${ROUTE}`,
        headers,
        body: {
            isDefault,
        },
        json: true,
    }

    return requestPromise(options)
}