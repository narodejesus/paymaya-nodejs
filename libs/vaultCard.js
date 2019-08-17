/* @flow */

export type Input = {
    paymentTokenId: string,
    isDefault: boolean,
    redirectUrl: {
        success: string,
        failure: string,
        cancel: string,
    },
}

export type Response = Promise<{
    state: 'PREVERIFICATION',
    cardTokenId: string,
    cardType: 'master-card' | 'visa-card',
    maskedPan: string,
    verificationUrl: string,
    default: boolean,
    createdAt: string,
    updatedAt: string,
    id: string,
}>

export default (client: any) => (customerId: string, cardToken: Input): Response => {
    const VAULT_CART_ROUTE = `/payments/v1/customers/${customerId}/cards`

    const options = {
        method: 'POST',
        url: VAULT_CART_ROUTE,
        data: cardToken,
    }

    return client.request(options)
}
