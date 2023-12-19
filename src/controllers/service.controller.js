import { getDatabaseInstance } from "../config/dbManager.config.js";
/**
 * Joi schema for creating a service.
 * @typedef {Object} CreateServiceSchema
 * @property {string} name - The name of the service. Required.
 * @property {string} image - The image URL of the service.
 * @property {boolean} active - Indicates whether the service is active. Required.
 * @property {number} order - The order of the service (integer).
 * @property {string} mobile_app_icon - The icon URL for the mobile app.
 */
import Joi from "joi";

/**
 * Define the validation schema for creating a service.
 * @type {Joi.ObjectSchema<CreateServiceSchema>}
 */
const createServiceSchema = Joi.object({
  nombre: Joi.string(),
  imagen: Joi.string(),
  activo: Joi.boolean(),
  orden: Joi.number().integer(),
  icono_app_movil: Joi.string(),
});
/* nombre,
    imagen,
    activo,
    orden,
    icono_app_movil, */
/* name,
    image,
    active,
    order,
    mobile_app_icon, */

export const getPlaceServiceByUserId = async (req, res) => {
  const place_id = 0;
  const sequelize = getDatabaseInstance(place_id);

  try {
    const [serviceFound, metadata] = await sequelize.query(
      `execute sp_get_place_service_by_user_id '${req.params.user_id}','${req.params.place_id}'`
    );

    if (!serviceFound[0])
      return res.status(400).json({
        message: "not found service",
      });

    res.json(serviceFound);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "service not found" });
  }
};

/**
 * Service Service: Handles business logic for services.
 */

/**
 * Retrieves all services from the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of services.
 * @throws {Error} Throws an error if the retrieval fails.
 */

export const getAllServices = async (req,res) => {
  console.log("entrando la funcion");
  try {
    const place_id = 0;
    const sequelize = getDatabaseInstance(place_id);
    console.log(sequelize);

    // Execute query to get all services
    const [services, metadata] = await sequelize.query(`
      SELECT * FROM dbo.servicio;
    `);
  
     res.json({services});
  } catch (error) {
    console.log(error);
    throw new Error("Failed to retrieve services");
  }
};

/**
 * Retrieves a specific service by its ID from the database.
 *
 * @param {number} serviceId - The ID of the service to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the retrieved service or null if not found.
 * @throws {Error} Throws an error if the retrieval fails.
 */
export const getServiceById = async (serviceId) => {
  try {
    const place_id = 0;
    const sequelize = getDatabaseInstance(place_id);

    // Execute query to get a specific service by ID
    const [service, metadata] = await sequelize.query(
      `
      SELECT [id_servicio], [nombre], [imagen], [activo], [orden], [fecha_ingreso], [icono_app_movil]
      FROM [sero_prueba].[dbo].[servicio] WHERE [id_servicio] = :id;
    `,
      {
        replacements: { id: serviceId },
      }
    );

    return service && service.length > 0 ? service[0] : null;
  } catch (error) {
    throw new Error("Failed to retrieve service");
  }
};

/**
 * Updates a specific service by its ID in the database.
 *
 * @param {number} serviceId - The ID of the service to update.
 * @param {Object} updatedServiceData - The updated service data.
 * @returns {Promise<void>} A promise that resolves once the service is updated.
 * @throws {Error} Throws an error if the update fails.
 */
export const updateService = async (req, res) => {
  const serviceId = req.params.id_service;
  const updatedServiceData = req.body
  console.log("******");
  console.log(updateService);
  console.log("******");
  try {
    const place_id = 0;
    const sequelize = getDatabaseInstance(place_id);

    // Execute query to update a specific service by ID
    const [updatedService, metadata] = await sequelize.query(
      `
      UPDATE [dbo].[servicio]
      SET [nombre] = :nombre, [imagen] = :imagen, [activo] = :activo, [orden] = :orden, [fecha_ingreso] = :fecha_ingreso, [icono_app_movil] = :icono_app_movil
      OUTPUT inserted.*
      WHERE id_servicio = :id;
    `,
      {
        replacements: { id: serviceId, ...updatedServiceData },
      }
    );
/* "id_servicio": 1,
      "nombre": "Regularización agua",
      "imagen": "imagen_no_disponible.jpg",
      "activo": true,
      "orden": 0,
      "fecha_ingreso": "2021-12-09T22:23:31.730Z",
      "icono_app_movil": "water" */
        console.log(updatedService);
    if (updatedService && updatedService.length > 0) {
      res.json({ message: 'Service updated successfully', updatedService });
    } else {
      res.status(404).json({ message: 'Task not found or not updated' });
    }
  } catch (error) {
 
   
    console.error(error);
    res.status(500).json({ message: 'Failed to update service' });
  }
};
/*
 **
 * Deletes a specific service by its ID from the database.
 *
 * @param {number} serviceId - The ID of the service to delete.
 * @returns {Promise<void>} A promise that resolves once the service is deleted.
 * @throws {Error} Throws an error if the deletion fails.
 */
export const deleteService = async (serviceId) => {
  try {
    const place_id = 0;
    const sequelize = getDatabaseInstance(place_id);

    // Execute query to delete a specific service by ID
    const [deletedService, metadata] = await sequelize.query(
      `
      DELETE FROM [dbo].[servicio] WHERE [id_servicio] = :id;
    `,
      {
        replacements: { id: serviceId },
      }
    );

    console.log(deletedService);

/*     if (!(deletedService && deletedService.length > 0)) {
      throw new Error("Service not found");
    } */
  } catch (error) {
    throw new Error("Failed to delete service");
  }
};
/**
 * Creates a new service using the provided data.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 * @throws {Error} Throws an error if the service creation fails.
 */
export const createService = async (req, res) => {
  try {
    // Validate the request body data with the schema
    const { error, value } = createServiceSchema.validate(req.body);

    if (error) {
      // If there are validation errors, respond with a 400 error and the error details
      return res
        .status(400)
        .json({ message: "Invalid request body", error: error.details });
    }

    const serviceData = extractServiceData(value);

    await insertServiceToDatabase(serviceData);

    // Send a success response or additional data as needed
    res.json({ message: "Service created successfully" });
  } catch (error) {
    // Log the error and send a 500 status with a JSON response
    console.error(error);
    res.status(500).json({ message: "Failed to create service" });
  }
};

// Define the function to insert service data into the database
const insertServiceToDatabase = async (serviceData) => {
  const place_id = 0;
  const sequelize = getDatabaseInstance(place_id);

  // Execute stored procedure or perform actions to create a new service
  const [serviceCreated, metadata] = await sequelize.query(
    `
    INSERT INTO [dbo].[servicio] (nombre, imagen, activo, orden, icono_app_movil)
  VALUES (:nombre, :imagen, :activo, :orden, :icono_app_movil);
  SELECT SCOPE_IDENTITY() AS newServiceId;
  `,
    {
      replacements: serviceData,
    }
  );

  console.log(serviceCreated);

  // Check if the service was created successfully
  if (!(serviceCreated && serviceCreated.length > 0)) {
    // If the service creation was not successful, throw an error
    throw new Error("Failed to create service");
  }
};

// Define the function to extract service data from the request body
const extractServiceData = (requestBody) => {
  const { nombre, imagen, activo, orden, icono_app_movil } = requestBody;

  if (!nombre || !imagen || !activo || !orden || !icono_app_movil) {
    throw new Error("Invalid request body. Missing required properties.");
  }

  return {
    nombre,
    imagen,
    activo,
    orden,
    icono_app_movil,
  };
};
