import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { PrismaClient } from "@prisma/client";

export const addFavourite = asyncHandler(async (req, res) => {

    try {
        const client = new PrismaClient()
        const id = req.query.id as string
    
        if(!id) throw new ApiError(401, "Invalid request")
        const favourite = await client.favourites.create({
            data: {
                userId: req.id,
                postId: id
            }
        })
    
        res.json(new ApiResponse(201, favourite, "Add to favourite"))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while adding to favourite, please try again")
    }
})

export const getFavourite = asyncHandler(async (req, res) => {

    try {
        const client = new PrismaClient()
        const favouritePost = await client.favourites.findMany({
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
        
        res.json(new ApiResponse(200, favouritePost, "favourite Post"))
    } catch (error) {
        throw new ApiError(500, "Internal server error, please try again")
    }
})

export const removeFavourite = asyncHandler(async (req, res) => {

    try {
        const client = new PrismaClient()
        const id = req.query.id as string
    
        if(!id) throw new ApiError(401, "Invalid request")
        const removedFavourite = await client.favourites.delete({
            where: {
                userId_postId: {
                    userId: req.id,
                    postId: id
                }
            }
        })
    
        res.json(new ApiResponse(201, removedFavourite, "Removed from favourite"))
    
    } catch (error) {
        throw new ApiError(400, "Invalid request")
    }
})
