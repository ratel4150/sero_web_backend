import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

export const Access = sequelize.define('acceso', {
    usuario: {
        type: DataTypes.STRING,        
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        primaryKey: true,        
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });