import {Router} from 'express'
import {getPlaceServiceProcessByUserId} from '../controllers/process.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.middleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'
import * as processController from '../controllers/process.controller.js';

const router = Router()

router.get('/PlaceServiceProcessByUserId/:user_id',processController.getPlaceServiceProcessByUserId)

// Ruta para obtener todos los procesos
router.get('/processes', processController.getAllProcesses);

// Ruta para obtener un proceso por su ID
router.get('/processes/:id', processController.getProcessById);

// Ruta para actualizar un proceso por su ID
router.put('/processes/:id', processController.updateProcess);

// Ruta para eliminar un proceso por su ID
router.delete('/processes/:id', processController.deleteProcess);

// Ruta para crear un nuevo proceso
router.post('/processes', processController.createProcess);


export default router