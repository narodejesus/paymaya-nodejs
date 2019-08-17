/* @flow */

import {
    createCustomer,
    type CreateCustomerResponse,
    // createPayment,
    // createPaymentToken,
    type CustomerInformation,
    // deleteCard,
    // deleteCustomer,
    // getAllCards,
    // getCardDetails,
    // getCustomerDetails,
    // getPayment,
    // updateCard,
    // updateCustomerDetails,
    vaultCard,
    type VaultCardInput,
    type VaultCardResponse,
    // voidPayment,
} from './libs'
import axios from 'axios'

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

    privateClient: axios

    publicClient: axios

    constructor({publicKey, secretKey, isSandbox}: Config) {
        if (!publicKey && !secretKey) {
            throw new Error('Please define your public and secret key')
        }

        this.secretKey = secretKey
        this.publicKey = publicKey

        const baseURL = isSandbox ? PAYMAYA_SANDBOX_URL : PAYMAYA_URL

        this.privateClient = axios.create({
            baseURL,
            timeout: 1000,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${secretKey}`,
            },
        })

        this.privateClient.interceptors.response.use(this.modifySuccessInterceptor, this.modifyErrorInterceptor)

        this.publicClient = axios.create({
            baseURL,
            timeout: 1000,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${publicKey}`,
            },
        })

        this.publicClient.interceptors.response.use(this.modifySuccessInterceptor, this.modifyErrorInterceptor)

        this.initializeSDK()
    }

    modifySuccessInterceptor(response: {data: {}}) {
        return response.data || {}
    }

    modifyErrorInterceptor(error: any) {
        return Promise.reject(error)
    }

    initializeSDK() {
        // this.createPaymentToken = createPaymentToken(this.publicClient)
        this.createCustomer = createCustomer(this.privateClient)
        // this.createPayment = createPayment(this.privateClient)
        // this.deleteCard = deleteCard(this.privateClient)
        // this.deleteCustomer = deleteCustomer(this.privateClient)
        // this.getAllCards = getAllCards(this.privateClient)
        // this.getCardDetails = getCardDetails(this.privateClient)
        // this.getCustomerDetails = getCustomerDetails(this.privateClient)
        // this.getPayment = getPayment(this.privateClient)
        this.vaultCard = vaultCard(this.privateClient)
        // this.voidPayment = voidPayment(this.privateClient)
        // this.updateCard = updateCard(this.privateClient)
        // this.updateCustomerDetails = updateCustomerDetails(this.privateClient)
    }
}
