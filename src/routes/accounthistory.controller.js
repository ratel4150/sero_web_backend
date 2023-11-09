import {Router} from 'express'
import {getAccountHistoryByCount} from '../controllers/acounthistory.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.middleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'

const router = Router()

router.get('/AccountHistoryByCount/:account/', getAccountHistoryByCount)

export default router