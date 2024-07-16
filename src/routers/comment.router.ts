import { Router } from "express";
import { isAuth } from "../middleware/auth.middleware";
import { createComment, deleteComment, updateComment } from "../controllers/comment.controller";

const router = Router()

router.route('/createComment').post(isAuth, createComment)
router.route('/getComment').get(isAuth, createComment)
router.route('/updateComment').post(isAuth, updateComment)
router.route('/deleteComment').post(isAuth, deleteComment)

export default router