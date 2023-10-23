//import db from "../config.js";
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

export const User = sequelize.define('usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
},
  nombre: {
      type: DataTypes.STRING,        
      allowNull: false
  },
  apellido_paterno: {
      type: DataTypes.STRING,      
  }
}, {
  timestamps: false,
  freezeTableName: true
});