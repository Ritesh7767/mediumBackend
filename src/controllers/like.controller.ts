import { PrismaClient } from "@prisma/client";
import ApiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/apiResponse";

export const likePost = asyncHandler(async (req, res) => {

    const client = new PrismaClient()
    const id = req.query.id as string
    if(!id) throw new ApiError(400, "Invalid operation")

    const alreadyLiked = await client.likes.findUnique({
        where: {
            userId_postId: {
                userId: req.id,
                postId: id
            }
        }
    })

    if(alreadyLiked) throw new ApiError(400, "User already liked this post")

    const addLike = await client.likes.create({
        data: {
            userId: req.id,
            postId: id
        }
    })

    res.json(new ApiResponse(200, addLike, "Post liked"))
})

export const getLikedPost = asyncHandler(async (req, res) => {

    const client = new PrismaClient()

    const getLikedPost = await client.likes.findMany({
        where: {
            userId: req.id
        },
        select: {
            post: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    owner: {
                        select: {
                            id: true,
                            username: true
                        }
                    }
                }
            }
        }
    })

    res.json(new ApiResponse(201, getLikedPost, "Liked Posts"))
}) 

export const unLikePost = asyncHandler(async (req, res) => {

    try {
        const client = new PrismaClient()
        const id = req.query.id as string
    
        if(!id) throw new ApiError(400, "Invalid operations")
    
        const removedLike = await client.likes.delete({
            where: {
                userId_postId: {
                    userId: req.id,
                    postId: id
                }
            }
        })
    
        res.json(new ApiResponse(201, removedLike, "Post unlike"))
    } catch (error) {
        throw new ApiError(400, "Invalid request")
    }
})