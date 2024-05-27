import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { verifyUserByBVN } from "./customVerifyService";



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