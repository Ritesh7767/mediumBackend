import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { PrismaClient } from "@prisma/client";

export const sendFollowRequest = asyncHandler(async (req, res) => {

    const client = new PrismaClient()
    const id = req.query.id as string
    const followerData = await client.followRequest.create({
        data: {
            userId: id,
            requestedId: req.id
        }
    })

    if(!followerData) throw new ApiError(500, "Internal server error, please send the follow request again")
    res.json(new ApiResponse(500, followerData, "Follow request sent"))
})

export const acceptFollowRequest = asyncHandler(async (req, res) => {

    const client = new PrismaClient()
    const requestedId = req.query.id as string

    if(!requestedId) throw new ApiError(400, "Invalid request")

    await client.followRequest.update({
        where: {
            userId_requestedId: {
                userId: req.id,
                requestedId: requestedId
            }
        },
        data: {
            status: "accepted"
        }
    })

    const addFollower = await client.followers.create({
        data: {
            userId: req.id,
            followerId: requestedId
        }
    })

    res.json(new ApiResponse(201, addFollower, "Follower added"))

})

export const rejectFollowRequest = asyncHandler(async (req, res) => {

    const client = new PrismaClient()
    const id = req.query.id as string

    const followRequestStatus = await client.followRequest.update({
        where: {
            userId_requestedId: {
                userId: req.id,
                requestedId: id
            }
        },
        data: {
            status: "rejected"
        }
    })

    res.json(new ApiResponse(201, followRequestStatus, "Follow request reject"))

})

export const getFollowRequest = asyncHandler(async (req, res) => {

    const client = new PrismaClient()
    
    const followRequest = await client.followRequest.findFirst({
        where: {
            userId: req.id
        }
    })
    // const followRequest = await client.followRequest.findMany({
    //     where: {
    //         userId: req.id
    //     },
    //     select: {
    //         requestedUser: {
    //             select: {
    //                 id: true,
    //                 username: true
    //             }
    //         }
    //     }
    if(!followRequest) throw new ApiError(200, "empty")
    res.json(new ApiResponse(200, followRequest, "Follower Request list"))
})

export const getFollowers = asyncHandler(async (req, res) => {

    const client = new PrismaClient()

    const followers = await client.followers.findMany({
        where: {
            userId: req.id
        },
        select: {
            follower: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })
})


