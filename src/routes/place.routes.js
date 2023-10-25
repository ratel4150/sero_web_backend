import {Router} from 'express'
import { getPlaceByUserId, getPlaceById } from '../controllers/place.controller.js'


const router = Router()

router
    .get('/PlaceByUserId/:user_id', getPlaceByUserId)
    .get('/PlaceById/:place_id', getPlaceById)
    

export default router