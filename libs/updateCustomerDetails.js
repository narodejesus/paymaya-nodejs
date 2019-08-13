/* @flow */

import requestPromise from 'request-promise-native'

const ROUTE = '/payments/v1/customers'

type CustomerInformation = {
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
    metadata: {},
}

type Config = {
    headers: {
        [configName: string]: string,
    },
    endpoint: string,
}

type Response = {
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
}

export default ({headers, endpoint}: Config) => (
    id: string,
    customerInformation: CustomerInformation
): Promise<Response> => {
    const options = {
        method: 'PUT',
        uri: `${endpoint}${ROUTE}/${id}`,
        headers,
        body: customerInformation,
        json: true,
    }

    return requestPromise(options)
}
