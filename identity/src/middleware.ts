import { Request, Response, NextFunction } from "express";
import { detokenizeUser } from "../utils/userToken";

export const getAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if(token === null) return res.sendStatus(401);

    const user = await detokenizeUser(token as string);

    if (!user) return res.sendStatus(403);

    //@ts-ignore
    req.user = user;

    next();
}