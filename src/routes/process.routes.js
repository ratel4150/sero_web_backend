import {Router} from 'express'
import {getPlaceServiceProcessByUserId} from '../controllers/process.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.middleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'

const router = Router()

router.get('/PlaceServiceProcessByUserId/:user_id', getPlaceServiceProcessByUserId)

export default router