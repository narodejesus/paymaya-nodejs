/* @flow */

const ROUTE = '/payments/v1/customers'

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

export default (client: any) => (id: string): Promise<Response> => {
    const options = {
        method: 'GET',
        url: `${ROUTE}/${id}`,
    }

    return client.request(options)
}
