import {Router} from 'express'
import {getMenusUserId} from '../controllers/menu.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.middleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'

const router = Router()

router.get('/MenusUserId/:user_id', getMenusUserId)

export default router