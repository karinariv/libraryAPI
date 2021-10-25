import { NextFunction, Request, RequestHandler, Response } from "express";
import JWT from 'jsonwebtoken';


export class AuthMiddleware {

    static authenticateJWT ( req: Request, res: Response, next: NextFunction): void | RequestHandler {
        const header: string = req.headers.authorization;
        if (header) {
            try{
            const token = header.split(" ")[2];
            /* console.log(token); */
            let user = JWT.verify(token, process.env.secret);
            req["user"] = user;
            next();
            } catch (err) { 
                console.log(err);
                res.status(404).json({ message: "Error" });
            };
        } else {
            res.status(404).json({ message: "You are not authenticated." });
        }
    }
}