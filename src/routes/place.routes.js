import {Router} from 'express'
import {getPlaceByUserId} from '../controllers/place.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.middleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'

const router = Router()

router.get('/PlaceByUserId/:user_id', getPlaceByUserId)

export default router