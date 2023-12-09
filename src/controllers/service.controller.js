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
  name: Joi.string().required(),
  image: Joi.string(),
  active: Joi.boolean().required(),
  order: Joi.number().integer(),
  mobile_app_icon: Joi.string(),
});

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

export const getAllServices = async () => {
  try {
    const place_id = 0;
    const sequelize = getDatabaseInstance(place_id);

    // Execute query to get all services
    const [services, metadata] = await sequelize.query(`
      SELECT * FROM dbo.servicio;
    `);

    return services;
  } catch (error) {
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
      FROM [sero_central].[dbo].[servicio] WHERE [id_servicio] = :id;
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
export const updateService = async (serviceId, updatedServiceData) => {
  try {
    const place_id = 0;
    const sequelize = getDatabaseInstance(place_id);

    // Execute query to update a specific service by ID
    const [updatedService, metadata] = await sequelize.query(
      `
      UPDATE [sero_central].[dbo].[servicio]
      SET [nombre] = :name, [imagen] = :image, [activo] = :active, [orden] = :order, [fecha_ingreso] = :date, [icono_app_movil] = :icon
      WHERE [id_servicio] = :id;
    `,
      {
        replacements: { id: serviceId, ...updatedServiceData },
      }
    );

    if (!(updatedService && updatedService.length > 0)) {
      throw new Error("Service not found");
    }
  } catch (error) {
    throw new Error("Failed to update service");
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
      DELETE FROM [sero_central].[dbo].[servicio] WHERE [id_servicio] = :id;
    `,
      {
        replacements: { id: serviceId },
      }
    );

    if (!(deletedService && deletedService.length > 0)) {
      throw new Error("Service not found");
    }
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
    INSERT INTO [sero_central].[dbo].[servicio] (nombre, imagen, activo, orden, icono_app_movil)
    VALUES (:nombre, :imagen, :activo, :orden, :icono_app_movil);
  `,
    {
      replacements: serviceData,
    }
  );

  // Check if the service was created successfully
  if (!(serviceCreated && serviceCreated.length > 0)) {
    // If the service creation was not successful, throw an error
    throw new Error("Failed to create service");
  }
};

// Define the function to extract service data from the request body
const extractServiceData = (requestBody) => {
  const { name, image, active, order, mobile_app_icon } = requestBody;

  if (!name || !image || !active || !order || !mobile_app_icon) {
    throw new Error("Invalid request body. Missing required properties.");
  }

  return {
    name,
    image,
    active,
    order,
    mobile_app_icon,
  };
};
