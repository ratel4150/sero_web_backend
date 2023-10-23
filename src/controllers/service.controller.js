import sequelize from "../config/db.config.js";

export const getPlaceServiceByUserId = async (req, res) => {
    try {
      const [serviceFound, metadata] = await sequelize.query(`execute sp_get_place_service_by_user_id '${req.params.user_id}'`)

      if(!serviceFound[0]) return res.status(400).json({
        message: "not found service"
      })      
    
      res.json(serviceFound)

    } catch (error) {
      console.log(error)
      return res.status(404).json({message: 'service not found'})
    }  
  }