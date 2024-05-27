import { Request, Response } from "express";
import { getUserInfo, resendTempToken, resendVerification, signInUser, signUpUser, verifyAccountEmail } from "./accountServices";
import { errorResponse, successResponse } from "./utils/handleResponse";
import { initiateSignUp } from "../tokenservice";

export const createAccount = async (req:Request, res:Response) => {
    try {
        const body = req.body;
        const { usertype, token } = req.params;
        const response = await signUpUser(body, token, usertype);

        return successResponse(res, 201, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}

export const loginAccount = async (req: Request, res:Response) => {
    try {
        const body = req.body;
        const response = await signInUser(body);

        return errorResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}

export const verifyContact = async (req: Request, res:Response) => {
    try {
        const { token, otp } = req.params;
        const response = await verifyAccountEmail(token, otp);

        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}

export const resendVerificationToken = async (req: Request, res: Response) => {
    try {
       const { token } = req.params; 
       const response = await resendVerification(token);
       return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}

export const getAccountInfo = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const response = await getUserInfo(token);
        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}






// Seperate
export const createTempToken = async (req: Request, res: Response) => {
    try {
        const { email, phone_number } = req.body;
        const response = await initiateSignUp(email, phone_number);
        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}


export const sendReTempToken = async (req: Request, res: Response) => {
    try {
        const { email, phone_number } = req.body;
        const response = await resendTempToken({email, phone_number});
        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}