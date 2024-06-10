import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { verifyAccountBusiness, verifyUserByBVN, verifyUserByNIN } from "./customVerifyService";
import { verifyNIN } from "./YouVerify";



export const verifyWithBVN = async (req:Request, res:Response) => {
    try {
        // @ts-ignore
        const user = req.user;
        const response = await verifyUserByBVN(user);
        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}

export const verifyWithNIN = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const user = req.user;
        const response = await verifyUserByNIN(user);
        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}

export const verifyBusinessWithId = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const user = req.user;
        const response = await verifyAccountBusiness(user);
        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}