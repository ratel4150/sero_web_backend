import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.middleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'
import * as rolController from '../controllers/roles.controller.js';


const router = Router()
// Ruta para obtener todos los roles
router.get('/roles', rolController.getAllRoles);

// Ruta para obtener un rol por su ID
router.get('/roles/:id', rolController.getRoleById);

// Ruta para actualizar un rol por su ID
router.put('/roles/:id', rolController.updateRole);

// Ruta para eliminar un rol por su ID
router.delete('/roles/:id', rolController.deleteRole);

// Ruta para crear un nuevo rol
router.post('/roles', rolController.createRole);


export default router
