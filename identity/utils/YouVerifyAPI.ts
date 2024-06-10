import axios from "axios";

// const baseUrl = process.env.YOUVRFY_URL;

const baseUrl = process.env.NODE_ENV === 'development'
  ? 'https://api.sandbox.youverify.co'
  : process.env.YOUVRFY_URL;
  

export const YouVerifyAPI = axios.create({
    baseURL: `${baseUrl}/`,
    headers: {
        "token": `${process.env.YOUVRFY_TKN}`
    }
})