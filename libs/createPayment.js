/* @flow */

import requestPromise from 'request-promise'

const ROUTE = '/payments/v1/payments'

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
    // eslint-disable-next-line max-len
    // "verificationUrl": "https://sandbox-checkout-v2.paymaya.com/checkout?id=a5f5ba1a-13c4-40e4-af2a-872c9888e148&auto=Y&ct=68aKLAN64CXK7XWDA1HwSE6COo"
    verificationUrl: string,
}

type PaymentInformationRequest = {
    paymentTokenId: string,
    totalAmount: {
        amount: number,
        currency: string,
    },
    buyer: {
        firstName: string,
        middleName: string,
        lastName: string,
        contact: {
            phone: string,
            email: string,
        },
        billingAddress?: {
            line1?: string,
            line2?: string,
            city: string,
            state: string,
            zipCode?: string,
            countryCode: 'PH',
        },
    },
    requestReferenceNumber: string,
    redirectUrl: {
        success: string,
        failure: string,
        cancel: string,
    },
}

export default ({headers, endpoint}: Config) => (paymentInformation: PaymentInformationRequest): Promise<Response> => {
    const options = {
        method: 'POST',
        uri: `${endpoint}${ROUTE}`,
        body: paymentInformation,
        headers,
        json: true,
    }

    return requestPromise(options)
}
