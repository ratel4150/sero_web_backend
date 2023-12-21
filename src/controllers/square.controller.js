import { getDatabaseInstance } from "../config/dbManager.config.js";
import Joi from "joi";

// Esquema de validación para la creación de una plaza
const createPlazaSchema = Joi.object({
    id: Joi.number(),
    nombre: Joi.string().required(),
    imagen: Joi.string(),
    activo: Joi.boolean(),
    orden: Joi.number(),
    fecha_ingreso: Joi.date(),
    id_horario: Joi.number(),
    latitud: Joi.number(),
    longitud: Joi.number(),
    estado_republica: Joi.string(),
    radius: Joi.number(),
});

// Función para obtener todas las plazas
export const getAllPlazas = async (req, res) => {
    try {
        const place_id = 0;
        const sequelize = getDatabaseInstance(place_id);

        // Ejecuta la consulta para obtener todas las plazas
        const [plazas, metadata] = await sequelize.query(`
            SELECT id_plaza, nombre, imagen, activo, orden, fecha_ingreso, id_horario, latitud, longitud, estado_republica, radius
            FROM db_prueba.dbo.plaza;
        `);

        // Envía las plazas recuperadas como una respuesta JSON
        res.json(plazas);
    } catch (error) {
        // Registra el error y envía un estado 500 con una respuesta JSON
        console.error(error);
        res.status(500).json({ message: "Error al recuperar las plazas" });
    }
};

// Función para obtener una plaza específica por su ID
export const getPlazaById = async (req, res) => {
    const plazaId = req.params.id;

    try {
        const place_id = 0;
        const sequelize = getDatabaseInstance(place_id);

        // Ejecuta la consulta para obtener una plaza específica por su ID
        const [plaza, metadata] = await sequelize.query(
            `
            SELECT id_plaza, nombre, imagen, activo, orden, fecha_ingreso, id_horario, latitud, longitud, estado_republica, radius
            FROM db_prueba.dbo.plaza WHERE id_plaza = :id;
        `,
            {
                replacements: { id: plazaId },
            }
        );

        // Verifica si se encontró la plaza
        if (plaza && plaza.length > 0) {
            // Envía la plaza recuperada como una respuesta JSON
            res.json(plaza[0]);
        } else {
            res.status(404).json({ message: "Plaza no encontrada" });
        }
    } catch (error) {
        // Registra el error y envía un estado 500 con una respuesta JSON
        console.error(error);
        res.status(500).json({ message: "Error al recuperar la plaza" });
    }
};

// Función para actualizar una plaza específica por su ID en la base de datos
export const updatePlaza = async (req, res) => {
    const plazaId = req.params.id;
    const updatedPlazaData = extractPlazaData(req.body);

    try {
        const place_id = 0;
        const sequelize = getDatabaseInstance(place_id);

        // Ejecuta la consulta para actualizar una plaza específica por su ID
        const [updatedPlaza, metadata] = await sequelize.query(
            `
            UPDATE db_prueba.dbo.plaza
            SET
                nombre = :nombre,
                imagen = :imagen,
                activo = :activo,
                orden = :orden,
                fecha_ingreso = :fecha_ingreso,
                id_horario = :id_horario,
                latitud = :latitud,
                longitud = :longitud,
                estado_republica = :estado_republica,
                radius = :radius
            WHERE id_plaza = :id ;
        `,
            {
                replacements: { id: plazaId, ...updatedPlazaData },
            }
        );

      // Verifica si la plaza se actualizó con éxito
      if (!metadata || metadata.length === 0 || metadata[1] && metadata[1].rowCount === 0) {
        res.status(404).json({ message: "Plaza no encontrada" });
    } else {
        // Envía una respuesta de éxito o datos adicionales según sea necesario
        res.json({ message: "Plaza actualizada con éxito" });
    }
    } catch (error) {
        // Registra el error y envía un estado 500 con una respuesta JSON
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la plaza" });
    }
};

// Función para eliminar una plaza específica por su ID de la base de datos
export const deletePlaza = async (req, res) => {
    const plazaId = req.params.id;

    try {
        const place_id = 0;
        const sequelize = getDatabaseInstance(place_id);

        // Ejecuta la consulta para eliminar una plaza específica por su ID
        const [deletedPlaza, metadata] = await sequelize.query(
            `
            DELETE FROM db_prueba.dbo.plaza WHERE id_plaza = :id;
        `,
            {
                replacements: { id: plazaId },
            }
        );

        // Verifica si la plaza se eliminó con éxito
        if (deletedPlaza && deletedPlaza.length > 0) {
            // Envía una respuesta de éxito o datos adicionales según sea necesario
            res.json({ message: "Plaza eliminada con éxito" });
        } else {
            res.status(404).json({ message: "Plaza no encontrada" });
        }
    } catch (error) {
        // Registra el error y envía un estado 500 con una respuesta JSON
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la plaza" });
    }
};

// Función para crear una nueva plaza utilizando los datos proporcionados
export const createPlaza = async (req, res) => {
    try {
        // Valida los datos del cuerpo de la solicitud con el esquema
        const { error, value } = createPlazaSchema.validate(req.body);

        if (error) {
            // Si hay errores de validación, responde con un estado 400 y los detalles del error
            return res
                .status(400)
                .json({ message: "Cuerpo de solicitud no válido", error: error.details });
        }

        const plazaData = extractPlazaData(value);

        await insertPlazaToDatabase(plazaData);

        // Envía una respuesta de éxito o datos adicionales según sea necesario
        res.json({ message: "Plaza creada con éxito" });
    } catch (error) {
        // Registra el error y envía un estado 500 con una respuesta JSON
        console.error(error);
        res.status(500).json({ message: "Error al crear la plaza" });
    }
};

// Función para insertar datos de plaza en la base de datos
const extractPlazaData = (requestBody) => {
    const {
        nombre,
        imagen,
        activo,
        orden,
        fecha_ingreso,
        id_horario,
        latitud,
        longitud,
        estado_republica,
        radius,
    } = requestBody;

    // Verifica si algún dato requerido está ausente en el cuerpo de la solicitud
    if (!nombre) {
        throw new Error('Invalid request body. Missing required properties.');
    }

    // Retorna un objeto con los datos extraídos
    return {
        nombre,
        imagen,
        activo,
        orden,
        fecha_ingreso,
        id_horario,
        latitud,
        longitud,
        estado_republica,
        radius,
    };
};

// Función para insertar datos de plaza en la base de datos
const insertPlazaToDatabase = async (plazaData) => {
    try {
        const place_id = 0;
        const sequelize = getDatabaseInstance(place_id);

        // Ejecuta la consulta para insertar una nueva plaza en la base de datos
        const [newPlaza, metadata] = await sequelize.query(
            `
            INSERT INTO db_prueba.dbo.plaza
            (nombre, imagen, activo, orden, fecha_ingreso, id_horario, latitud, longitud, estado_republica, radius)
            VALUES
            (:nombre, :imagen, :activo, :orden, :fecha_ingreso, :id_horario, :latitud, :longitud, :estado_republica, :radius);
        `,
            {
                replacements: plazaData,
            }
        );

        return newPlaza;
    } catch (error) {
        throw error;
    }
};
