import { Request, Response } from "express";
import { signUpUser } from "./accountServices";
import { errorResponse, successResponse } from "./utils/handleResponse";

export const createAccount = async (req:Request, res:Response) => {
    try {
        const body = req.body;
        const { usertype } = req.params;
        const response = await signUpUser(body, usertype);

        return successResponse(res, 201, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}