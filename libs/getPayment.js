/* @flow */

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

export default (client: any) => (paymentId: string, refNumber?: string): Promise<Response> => {
    const ROUTE = refNumber ? `/payments/v1/payment-rrns/${refNumber}` : `/payments/v1/payments/${paymentId}`

    const options = {
        method: 'GET',
        url: ROUTE,
    }

    return client.request(options)
}
