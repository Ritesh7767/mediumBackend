import {Router} from 'express'
import { addFavourite, getFavourite, removeFavourite } from '../controllers/favourite.controller'
import { isAuth } from '../middleware/auth.middleware'

const router = Router()

router.route('/addFavourite').post(isAuth, addFavourite)
router.route('/getFavourite').get(isAuth, getFavourite)
router.route('/removeFavourite').post(isAuth, removeFavourite)

export default router
