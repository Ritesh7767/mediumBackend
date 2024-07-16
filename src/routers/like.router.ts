import { Router } from "express";
import { getLikedPost, likePost, unLikePost } from "../controllers/like.controller";
import { isAuth } from "../middleware/auth.middleware";

const router = Router()

router.route('/likePost').post(isAuth, likePost)
router.route('/getLikedPost').get(isAuth, getLikedPost)
router.route('/unlikePost').post(isAuth, unLikePost)

export default router