import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { postValidation } from "../zod/post.zod";
import { PrismaClient } from "@prisma/client";

export const createPost = asyncHandler(async (req, res) => {

    const client = new PrismaClient()
    const {title, content, published} = req.body
    if([title, content, published].some(ele => ele.trim() == "")) throw new ApiError(401, "Please provide every mandatory field")
    
    const isDataCorrect = postValidation.safeParse(req.body)
    if(!isDataCorrect.success) throw new ApiError(402, "Invalid data provided")
    
    const post = await client.post.create({
        data: {
            title, 
            content,
            published,
            userId: req.id
        },
        select: {
            title: true,
            content: true,
            published: true
        }
    })

    res.json(new ApiResponse(201, post, "Post created successfully"))
})

export const getPost = asyncHandler(async (req, res) => {

    const client = new PrismaClient()
    const posts = await client.post.findMany({
        where: {
            userId: req.id
        }
    })

    res.json(new ApiResponse(200, posts, "Post data"))
})

export const updatePost = asyncHandler(async (req, res) => {

    try {
        const client = new PrismaClient()
        const postId = req.query.id as string
        const {title, content} = req.body
        
        if([title, content].some(ele => ele.trim() == "")) throw new ApiError(401, "Please provide every mandatory field")
    
        const updatedPost = await client.post.update({
            where: {
                id: postId
            }, 
            data: {
                title,
                content
            }
        })
    
        res.json(new ApiResponse(201, updatePost, "Post updated successfully"))
    
    } catch (error) {
        throw new ApiError(404, "Invalid request")
    }
})

export const deletePost = asyncHandler(async (req, res) => {

    const client = new PrismaClient()
    const id = req.query.id as string

    const deletePost = await client.post.delete({
        where: {
            id
        }
    })
})
