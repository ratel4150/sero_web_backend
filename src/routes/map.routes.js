import { Router } from "express"
import { getServiceMapByIdPlaza, getLayersMapByIdPlaza } from '../controllers/map.controller.js'

const router = Router()

router
    .get('/ServiceMapByIdPlaza/:place_id', getServiceMapByIdPlaza)
    .get('/LayersMapByIdPlaza/:place_id', getLayersMapByIdPlaza)
    

export default router