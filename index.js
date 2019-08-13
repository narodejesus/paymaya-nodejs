/* @flow */

import {
    createCustomer,
    type CreateCustomerResponse,
    createPayment,
    createPaymentToken,
    type CustomerInformation,
    deleteCard,
    deleteCustomer,
    getAllCards,
    getCardDetails,
    getCustomerDetails,
    getPayment,
    updateCard,
    updateCustomerDetails,
    vaultCard,
    type VaultCardInput,
    type VaultCardResponse,
    voidPayment,
} from './libs'

const PAYMAYA_SANDBOX_URL = 'https://pg-sandbox.paymaya.com'
const PAYMAYA_URL = 'https://pg.paymaya.com'

type Config = {
    publicKey: string,
    secretKey: string,
    isSandbox: boolean,
}

export default class PaymayaNode {
    secretKey: string
    publicKey: string
    isSandbox: boolean
    endpoint: string

    createCustomer: (CustomerInformation: CustomerInformation) => CreateCustomerResponse
    createPayment: Function
    createPaymentToken: Function
    deleteCard: Function
    deleteCustomer: Function
    getAllCards: Function
    getCardDetails: Function
    getCustomerDetails: Function
    getPayment: Function
    updateCard: Function
    updateCustomerDetails: Function
    vaultCard: (customerId: string, token: VaultCardInput) => VaultCardResponse
    voidPayment: Function

    publicHeaders: {
        [configName: string]: string,
    }

    privateHeaders: {
        [configName: string]: string,
    }

    constructor({publicKey, secretKey, isSandbox}: Config) {
        if (!publicKey && !secretKey) {
            throw new Error('Please define your public and secret key')
        }

        this.secretKey = secretKey
        this.publicKey = publicKey
        this.publicHeaders = {
            'Content-Type': 'application/json',
            Authorization: `Basic ${publicKey}`,
        }
        this.privateHeaders = {
            'Content-Type': 'application/json',
            Authorization: `Basic ${secretKey}`,
        }

        this.endpoint = isSandbox ? PAYMAYA_SANDBOX_URL : PAYMAYA_URL
        this.initializeSDK()
    }

    initializeSDK() {
        this.createPaymentToken = createPaymentToken({headers: this.publicHeaders, endpoint: this.endpoint})
        this.createCustomer = createCustomer({headers: this.privateHeaders, endpoint: this.endpoint})
        this.createPayment = createPayment({headers: this.privateHeaders, endpoint: this.endpoint})
        this.deleteCard = deleteCard({headers: this.privateHeaders, endpoint: this.endpoint})
        this.deleteCustomer = deleteCustomer({headers: this.privateHeaders, endpoint: this.endpoint})
        this.getAllCards = getAllCards({headers: this.privateHeaders, endpoint: this.endpoint})
        this.getCardDetails = getCardDetails({headers: this.privateHeaders, endpoint: this.endpoint})
        this.getCustomerDetails = getCustomerDetails({headers: this.privateHeaders, endpoint: this.endpoint})
        this.getPayment = getPayment({headers: this.privateHeaders, endpoint: this.endpoint})
        this.vaultCard = vaultCard({headers: this.privateHeaders, endpoint: this.endpoint})
        this.voidPayment = voidPayment({headers: this.privateHeaders, endpoint: this.endpoint})
        this.updateCard = updateCard({headers: this.privateHeaders, endpoint: this.endpoint})
        this.updateCustomerDetails = updateCustomerDetails({headers: this.privateHeaders, endpoint: this.endpoint})
    }
}
