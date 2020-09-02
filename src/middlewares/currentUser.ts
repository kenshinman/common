import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPaylod {
	email: string;
	id: string;
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPaylod;
		}
	}
}

export const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session?.jwt) {
		return next();
	}

	//verify user's jwt
	try {
		const payload = jwt.verify(
			req.session.jwt,
			process.env.JWT_KEY!
		) as UserPaylod;
		req.currentUser = payload;
	} catch (error) {}

	next();
};
