/* @flow */

type Response = {
    id: string,
    payment: string,
    status: 'SUCCESS' | 'FAILED',
    reason: string,
    createdAt: string,
    updatedAt: string,
}

export default (client: any) => (paymentId: string, reason: string): Promise<Response> => {
    const ROUTE = `/payments/v1/payments/${paymentId}`

    const options = {
        method: 'DELETE',
        url: ROUTE,
        data: {
            reason,
        },
    }

    return client.request(options)
}
