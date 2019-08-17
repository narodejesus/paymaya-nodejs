/* @flow */

const ROUTE = '/payments/v1/customers'

export type CustomerInformation = {
    firstName: string,
    middleName: string,
    lastName: string,
    birthDay?: string,
    sex?: string,
    contact?: {
        phone: string,
        email?: string,
    },
    billingAddress?: {
        line: string,
        line2: string,
        city: string,
        state: string,
        zipCode: string,
        countryCode: string,
    },
    metadata?: {},
}

export type Response = Promise<{
    id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    birthDay: string,
    sex: string,
    contact: {
        phone: string,
        email: string,
    },
    billingAddress: {
        line: string,
        line2: string,
        city: string,
        state: string,
        zipCode: string,
        countryCode: string,
    },
    createdAt: string,
    updatedAt: string,
}>

export default (client: any) => (customerInformation: CustomerInformation): Response => {
    const options = {
        method: 'POST',
        url: ROUTE,
        data: customerInformation,
    }

    return client.request(options)
}
