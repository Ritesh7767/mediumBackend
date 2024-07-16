import { Router } from "express";
import { isAuth } from "../middleware/auth.middleware";
import { createPost, deletePost, getPost, updatePost } from "../controllers/post.controller";

const router = Router()

router.route('/createPost').post(isAuth, createPost)
router.route('/getPost').get(isAuth, getPost)
router.route('/updatePost').post(isAuth, updatePost)
router.route('/deletePost').post(isAuth, deletePost)

export default router