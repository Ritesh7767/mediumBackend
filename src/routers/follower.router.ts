import { Router } from "express";
import { isAuth } from "../middleware/auth.middleware";
import { acceptFollowRequest, getFollowers, getFollowRequest, rejectFollowRequest, sendFollowRequest } from "../controllers/follower.controller";

const router = Router()

router.route('/sendFollowRequest').post(isAuth, sendFollowRequest )
router.route('/acceptFollowRequest').post(isAuth, acceptFollowRequest)
router.route('/rejectFollowRequest').post(isAuth, rejectFollowRequest)
router.route('/getFollowRequest').get(isAuth, getFollowRequest)
router.route('/getFollowers').get(isAuth, getFollowers)

export default router

