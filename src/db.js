import sequelize from "./config/db.config.js"

export const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log('>>> DB is connected')
    } catch (error) {
        console.log(error)
    }    
}