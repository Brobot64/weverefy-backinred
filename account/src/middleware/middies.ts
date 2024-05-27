import { Request, Response, NextFunction } from "express";


export const timeOutMiddleWare = (ms: any) => {
    const timeout = ms || 5000;
    return (req: Request, res: Response, next: NextFunction) => {
        req.setTimeout(timeout, () => {
            console.log("Request TimeOut");
            res.status(504).send({ error: "Request Timeout" })
        })
        next();
    };
}

export default timeOutMiddleWare;