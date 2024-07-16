import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { PrismaClient } from "@prisma/client";

export const createComment = asyncHandler(async (req, res) => {

    try {
        const client = new PrismaClient()
        const postId = req.query.id as string
        const {comment} = req.body
    
        if([comment, postId].some(ele => ele.trim() == "")) throw new ApiError(401, "Please provide every mandatory fields")
        
        const createdComment = await client.comments.create({
            data: {
                comment, 
                userId: req.id,
                postId
            }
        })
    
        res.json(new ApiResponse(201, createdComment))
    } catch (error) {
        throw new ApiError(403, "Invalid id")
    }
})

export const getComment = asyncHandler(async (req, res) => {

    const client = new PrismaClient()
    const commentsWithPost = await client.user.findMany({
        where: {    
            id: req.id
        },
        include: {
            comment: {
                include: {
                    post: true
                }
            }
        }
    })
    res.json(new ApiResponse(200, commentsWithPost, "comments"))
})

export const updateComment = asyncHandler(async (req, res) => {

    try {
        const client = new PrismaClient()
        const {comment} = req.body
        const id = req.query.id as string
        if(!comment || !id) throw new ApiError(401, "Please provide every mandatory fields")
    
        const updatedComment = await client.comments.update({
            where: {
                id
            },
            data: {
                comment
            }
        })
    
        res.json(new ApiResponse(201, updatedComment, "comment updated successfully"))
        
    } catch (error) {
        throw new ApiError(400, "Invalid request")
    }
})

export const deleteComment = asyncHandler(async (req, res) => {

    try {
        const client = new PrismaClient()
        const id = req.query.id as string
    
        if(!id) throw new ApiError(400, "Invalid request")
    
        const deletedComment = await client.comments.delete({
            where: {
                id
            }
        })
    
        res.json(new ApiResponse(201, deletedComment, "Comment deleted successfully"))
    } catch (error) {
        throw new ApiError(400, "Invalid request")
    }
})


