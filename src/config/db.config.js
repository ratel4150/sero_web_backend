import {Sequelize} from "sequelize";

const sequelize = new Sequelize ('db_prueba','sa','Erpp123.',{
    host:'172.25.3.114',
    dialect:'mssql',
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    },
  })

export default sequelize