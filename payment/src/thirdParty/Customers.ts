import { PaymentAPI } from "../utils/PaystackAPI";
import { PayStackCreateCustomer, PayStackCreateDVA, PayStackValidateCustomer } from "../interfaces";

export const createCustomers = async (data: PayStackCreateCustomer) => {
    const response = await PaymentAPI.post('/customer', data);
    return response.data;
}

export const validateCustomers = async (data: PayStackValidateCustomer, code: string) => {
    const response = await PaymentAPI.post(`/customer/${code}/identification`, data);
    return response.data;
}

export const createDedicatedVirtualAccount = async (data: PayStackCreateDVA) => {
    const response = await PaymentAPI.post(`/dedicated_account`, data);
    return response.data;
}


