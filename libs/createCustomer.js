/* @flow */

import requestPromise from 'request-promise'

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

type Config = {
    headers: {
        [configName: string]: string,
    },
    endpoint: string,
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

export default ({headers, endpoint}: Config) => (customerInformation: CustomerInformation): Response => {
    const options = {
        method: 'POST',
        uri: `${endpoint}${ROUTE}`,
        body: customerInformation,
        headers,
        json: true,
    }

    return requestPromise(options)
}
