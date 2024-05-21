export interface PayStackCreateCustomer {
    email: string,
    first_name: string,
    last_name: string,
    phone: string
}

export interface PayStackValidateCustomer {
    country: "NG",
    type: "bank_account",
    account_number: string,
    bvn: string,
    bank_code: string,
    first_name: string,
    last_name: string,
}

export interface PayStackCreateDVA {
    customer: number, 
    preferred_bank: "wema-bank"
}