/* @flow */

const PAYMENT_TOKEN_URL = '/payments/v1/payment-tokens'

type Card = {
    number: string,
    expMonth: string,
    expYear: string,
    cvc: string,
}

export type Response = {
    paymentTokenId: string,
    state:
        | 'AVAILABLE'
        | 'CURRENTLY_IN_USE'
        | 'USED'
        | 'EXPIRED'
        | 'PREVERIFICATION'
        | 'VERIFYING'
        | 'VERIFICATION_FAILED',
    createdAt: string,
    updatedAt: string,
    issuer: string,
}

export default (client: any) => (card: Card): Promise<Response> => {
    const options = {
        method: 'POST',
        url: PAYMENT_TOKEN_URL,
        data: {
            card,
        },
    }

    return client.request(options)
}
