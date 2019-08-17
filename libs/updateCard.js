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

export default (client: any) => (customerId: string, cardId: string, isDefault: boolean): Promise<Response> => {
    const ROUTE = `/payments/v1/customers/${customerId}/cards/${cardId}`

    const options = {
        method: 'PUT',
        url: ROUTE,
        data: {
            isDefault,
        },
    }

    return client.request(options)
}
