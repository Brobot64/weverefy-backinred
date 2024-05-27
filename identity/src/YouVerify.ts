import { YouVerifyAPI } from "../utils/YouVerifyAPI";

export const verifyBVN = async (bnxn: string) => {
    const data = {
        id: bnxn,
        metadata: {
            requestId: "reandonTst"
        },
        isSubjectConsent: true,
        premiumBVN: true
    }
    
    const response = await YouVerifyAPI.post(`/v2/api/identity/ng/bvn`, data);
    return response.data;

}

export const verifyNIN = async (nimc: string) => {
    const data = {
        id: nimc,
        isSubjectConsent: true,
        premiumNin: true
    }
    
    const response = await YouVerifyAPI.post('/v2/api/identity/ng/nin ', data);
    return response.data;
}


export const verifyPhone = async (phone: string) => {
    const data = {
        mobile: phone,
        isSubjectConsent: true,
    }
    
    const response = await YouVerifyAPI.post('/v2/api/identity/ng/phone', data);
    return response.data;
}


export const verifyFacial = async (image1: string, image2: string) => {
    const data = {
        image1,
        image2,
        isSubjectConsent: true,
    };

    const response = await YouVerifyAPI.post('/v2/api/identity/compare-image', data);
    return response.data
}


export const verifyBusiness = async (reg_no: string, country_code: string) => {
    const data = {
        registrationNumber: reg_no,
        countryCode: country_code,
        isConsent: true
    }

    const response = await YouVerifyAPI.post('/v2/api/verifications/global/company-advance-check', data);
    return response.data;
}
