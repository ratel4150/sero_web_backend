import {Router} from 'express'
import {getPlaceServiceByUserId} from '../controllers/service.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.middleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'
import * as squareController from '../controllers/square.controller.js';
const router = Router()

// Ruta para obtener todas las plazas
router.get("/plazas", squareController.getAllPlazas);

// Ruta para obtener una plaza por su ID
router.get("/plazas/:id", squareController.getPlazaById);

// Ruta para actualizar una plaza por su ID
router.put("/plazas/:id", squareController.updatePlaza);

// Ruta para eliminar una plaza por su ID
router.delete("/plazas/:id", squareController.deletePlaza);

// Ruta para crear una nueva plaza
router.post("/plazas", squareController.createPlaza);


export default router