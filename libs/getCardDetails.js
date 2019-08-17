/* @flow */

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

export default (client: any) => (customerId: string, cardId: string): Promise<Response> => {
    const ROUTE = `/payments/v1/customers/${customerId}/cards/${cardId}`

    const options = {
        method: 'GET',
        url: ROUTE,
    }

    return client.request(options)
}
