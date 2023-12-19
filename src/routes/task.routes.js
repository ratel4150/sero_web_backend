import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.middleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'
import * as taskController from '../controllers/task.controller.js';


const router = Router()
// Ruta para obtener todas las tareas
router.get('/services/:id', taskController.getAllTasks);

// Ruta para obtener una tarea por su ID
router.get('/tasks/:id', taskController.getTaskById);

// Ruta para actualizar una tarea por su ID
router.put('/tasks/:id', taskController.updateTask);

// Ruta para eliminar una tarea por su ID
router.delete('/tasks/:id', taskController.deleteTask);

// Ruta para crear una nueva tarea

router.post('/task', taskController.createTask);
router.post('/task/check-name', taskController.isTaskWithNameExists);


export default router
