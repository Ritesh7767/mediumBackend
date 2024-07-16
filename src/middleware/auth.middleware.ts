import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken"

interface jwtPayload {
    id: string,
    username: string,
    email: string

}

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1]

        if(!token) throw new ApiError(400, "Something went wrong")

        const verifiedToken = jwt.verify(token, `${process.env.ACCESS_SECRET}`) as jwtPayload 
        req.id = verifiedToken.id
        next()

    } catch (error) {
        throw new ApiError(405, "Invalid token")
    }
}