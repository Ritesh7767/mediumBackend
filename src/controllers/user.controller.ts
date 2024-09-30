import ApiError from "../utils/apiError";
import {Request, Response} from 'express'
import asyncHandler from "../utils/asyncHandler";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from 'bcrypt'
import ApiResponse from "../utils/apiResponse";
import jwt from 'jsonwebtoken'
import { loginValidation, registerValidation } from "../zod/user.zod";

const generateAccessToken = ({id, username, email}: {id: string, username: string, email: string}) => {
    return jwt.sign({id, username, email}, `${process.env.ACCESS_SECRET}`, {expiresIn: process.env.ACCESS_EXPIRY})
}

const generateRefreshToken = ({id}: {id: string}) => {
    return jwt.sign({id}, `${process.env.REFRESH_SECRET}`, {expiresIn: process.env.REFRESH_EXPIRY})
}

export const registerUser = asyncHandler(async (req: Request, res: Response) => {

    const client = new PrismaClient().$extends(withAccelerate())
    const {username, email, password} = req.body
    if([username, email, password].some(ele => ele.trim() == "")) throw new ApiError(401, "Please provide mandatory data") 
    
    const isDataCorrect = registerValidation.safeParse(req.body)
    if(!isDataCorrect.success) throw new ApiError(403, "Invalid data provided")
    
    const existingUser = await client.user.findFirst({
        where: {
            OR: [{username}, {email}]
        },
        select: {
            id: true,
            username: true,
            email: true
        }
    })

    if(existingUser) throw new ApiError(402, "User already exist")
    
    const hashedPassword = await bcrypt.hash(password, 5)

    const createdUser = await client.user.create({
        data: {
            username,
            email, 
            password: hashedPassword
        }
    })

    const user = await client.user.findUnique({
        where: {
            id: createdUser.id
        },
        select: {
            id: true,
            username: true,
            email: true,
        }
    })

    if(!user) throw new ApiError(500, "Something went wrong while registering the user, please try again")

    res.json(new ApiResponse(201, user, "User registered successfully"))
})

export const loginUser = asyncHandler(async (req: Request, res: Response) => {

    const client = new PrismaClient().$extends(withAccelerate())
    const {email, password} = req.body

    if([email, password].some(ele => ele.trim() == "")) throw new ApiError(401, "Please provide every mandatory field")

    const isDataCorrect = loginValidation.safeParse(req.body)
    if(!isDataCorrect.success) throw new ApiError(403, "Invalid data provided")

    const user = await client.user.findUnique({
        where: {
            email
        },
        select: {
            id: true, 
            username: true,
            email: true,
        }
    })

    if(!user) throw new ApiError(404, "User does not exist")

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponse(200, user, "User logged in successfully"))

})


