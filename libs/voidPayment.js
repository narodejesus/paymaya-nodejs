/* @flow */

import requestPromise from 'request-promise'

type Config = {
    headers: {
        [configName: string]: string,
    },
    endpoint: string,
}

type Response = {
    id: string,
    payment: string,
    status: 'SUCCESS' | 'FAILED',
    reason: string,
    createdAt: string,
    updatedAt: string,
}

export default ({headers, endpoint}: Config) => (paymentId: string, reason: string): Promise<Response> => {
    const ROUTE = `/payments/v1/payments/${paymentId}`

    const options = {
        method: 'DELETE',
        uri: `${endpoint}${ROUTE}`,
        body: {
            reason,
        },
        headers,
        json: true,
    }

    return requestPromise(options)
}
