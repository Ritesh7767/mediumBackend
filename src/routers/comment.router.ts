import { Router } from "express";
import { isAuth } from "../middleware/auth.middleware";
import { createComment, deleteComment, getComment, updateComment } from "../controllers/comment.controller";

const router = Router()

router.route('/createComment').post(isAuth, createComment)
router.route('/getComment').get(isAuth, getComment)
router.route('/updateComment').post(isAuth, updateComment)
router.route('/deleteComment').post(isAuth, deleteComment)

export default router