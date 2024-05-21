import { PaymentAPI } from "../utils/PaystackAPI";

export const createCustomers = async () => {
    const response = await PaymentAPI.get('/bank');
    return response.data;
}