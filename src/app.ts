import express, { Request, Response, NextFunction } from "express"
import cookieParser from 'cookie-parser'
import ApiError from "./utils/apiError"
import cors from 'cors'

const app = express()

app.use(cors({credentials: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

import userRouter from './routers/user.router'
app.use('/api/v1/user', userRouter)

import postRouter from './routers/post.router'
app.use('/api/v1/post', postRouter)

import commentRouter from './routers/comment.router'
app.use('/api/v1/comment', commentRouter)

import favouriteRouter from './routers/favourite.router'
app.use('/api/v1/favourite', favouriteRouter)

import likeRouter from './routers/like.router'
app.use('/api/v1/like', likeRouter)

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     if(err instanceof ApiError){
//         res.json({
//             status: err.status,
//             message: err.message,
//             success: false,
//             data: err.data,
//             errors: err.errors
//         })
//     }
//     else{
//         res.json({
//             status: 500, 
//             message: "Internal server error",
//             success: false, 
//             data: null,
//             error: []
//         })
//     }
// })

export default app