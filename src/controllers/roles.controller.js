import { getDatabaseInstance } from "../config/dbManager.config.js";
import Joi from "joi";


const createRolSchema = Joi.object({
  
    id:Joi.number(),
    id_tarea: Joi.number(),
    nombre: Joi.string().required(),

   
  });

// Función para obtener todos los roles
export const getAllRoles = async (req, res) => {
  try {
    const place_id = 0;
    const sequelize = getDatabaseInstance(place_id);

    // Ejecuta la consulta para obtener todos los roles
    const [roles, metadata] = await sequelize.query(`
      SELECT id_rol, nombre, activo FROM dbo.rol;
    `);

    // Envía los roles recuperados como una respuesta JSON
    res.json(roles);
  } catch (error) {
    // Registra el error y envía un estado 500 con una respuesta JSON
    console.error(error);
    res.status(500).json({ message: "Error al recuperar los roles" });
  }
};

// Función para obtener un rol específico por su ID
export const getRoleById = async (req, res) => {
  const roleId = req.params.id;

  try {
    const place_id = 0;
    const sequelize = getDatabaseInstance(place_id);

    // Ejecuta la consulta para obtener un rol específico por su ID
    const [role, metadata] = await sequelize.query(
      `
      SELECT id_rol, nombre, activo FROM db_prueba.dbo.rol WHERE id_rol = :id;
    `,
      {
        replacements: { id: roleId },
      }
    );

    // Verifica si se encontró el rol
    if (role && role.length > 0) {
      // Envía el rol recuperado como una respuesta JSON
      res.json(role[0]);
    } else {
      res.status(404).json({ message: "Rol no encontrado" });
    }
  } catch (error) {
    // Registra el error y envía un estado 500 con una respuesta JSON
    console.error(error);
    res.status(500).json({ message: "Error al recuperar el rol" });
  }
};

// Función para actualizar un rol específico por su ID en la base de datos
export const updateRole = async (req, res) => {
  const roleId = req.params.id;
  const updatedRoleData = extractRoleData(req.body);

  try {
    const place_id = 0;
    const sequelize = getDatabaseInstance(place_id);

    // Ejecuta la consulta para actualizar un rol específico por su ID
    const [updatedRole, metadata] = await sequelize.query(
      `
      UPDATE db_prueba.dbo.rol
      SET
        nombre = :nombre,
        activo = :activo
      WHERE id_rol = :id ;
    `,
      {
        replacements: { id: roleId, ...updatedRoleData },
      }
    );

    // Verifica si el rol se actualizó con éxito
    if (updatedRole && updatedRole.length > 0) {
      // Envía una respuesta de éxito o datos adicionales según sea necesario
      res.json({ message: "Rol actualizado con éxito" });
    } else {
      res.status(404).json({ message: "Rol no encontrado" });
    }
  } catch (error) {
    // Registra el error y envía un estado 500 con una respuesta JSON
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el rol" });
  }
};

// Función para eliminar un rol específico por su ID de la base de datos
export const deleteRole = async (req, res) => {
  const roleId = req.params.id;

  try {
    const place_id = 0;
    const sequelize = getDatabaseInstance(place_id);

    // Ejecuta la consulta para eliminar un rol específico por su ID
    const [deletedRole, metadata] = await sequelize.query(
      `
      DELETE FROM db_prueba.dbo.rol WHERE id_rol = :id;
    `,
      {
        replacements: { id: roleId },
      }
    );

    // Verifica si el rol se eliminó con éxito
    if (deletedRole && deletedRole.length > 0) {
      // Envía una respuesta de éxito o datos adicionales según sea necesario
      res.json({ message: "Rol eliminado con éxito" });
    } else {
      res.status(404).json({ message: "Rol no encontrado" });
    }
  } catch (error) {
    // Registra el error y envía un estado 500 con una respuesta JSON
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el rol" });
  }
};

// Función para crear un nuevo rol utilizando los datos proporcionados
export const createRole = async (req, res) => {
  try {
    // Valida los datos del cuerpo de la solicitud con el esquema
    const { error, value } = createRolSchema.validate(req.body);

    if (error) {
      // Si hay errores de validación, responde con un estado 400 y los detalles del error
      return res
        .status(400)
        .json({ message: "Cuerpo de solicitud no válido", error: error.details });
    }

    const roleData = extractRoleData(value);

    await insertRoleToDatabase(roleData);

    // Envía una respuesta de éxito o datos adicionales según sea necesario
    res.json({ message: "Rol creado con éxito" });
  } catch (error) {
    // Registra el error y envía un estado 500 con una respuesta JSON
    console.error(error);
    res.status(500).json({ message: "Error al crear el rol" });
  }
};

// Función para insertar datos de rol en la base de datos
const extractRolData = (requestBody) => {
    
    console.log("***********");
    console.log(requestBody);
    console.log("***********");

    const { nombre, activo } = requestBody;
 
    
 
  
    if (!nombre ) {
      throw new Error('Invalid request body. Missing required properties.');
    }
  
    return { nombre, activo };
  };