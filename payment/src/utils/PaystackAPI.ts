import axios from "axios";

const baseURL = process.env.PYSTK_BASE_URL;
const apiAuth = process.env.PYSTK_SEC_KEY;

export const PaymentAPI = axios.create({
    baseURL: `${baseURL}`,
    headers: {
        "Authorization": `Bearer ${apiAuth}`
    }
})