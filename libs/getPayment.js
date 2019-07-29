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
    isPaid: boolean,
    status: 'PENDING_PAYMENT' | 'PAYMENT_SUCCESS' | 'PAYMENT_FAILED' | 'PAYMENT_INVALID' | 'VOIDED' | 'REFUNDED',
    amount: number,
    currency: 'PHP',
    createdAt: string,
    updatedAt: string,
    description: string,
    requestReferenceNumber: string,
    paymentTokenId: string,
}

export default ({headers, endpoint}: Config) => (paymentId: string, refNumber?: string): Promise<Response> => {
    const ROUTE = refNumber ? `/payments/v1/payment-rrns/${refNumber}` : `/payments/v1/payments/${paymentId}`

    const options = {
        method: 'GET',
        uri: `${endpoint}${ROUTE}`,
        headers,
        json: true,
    }

    return requestPromise(options)
}
