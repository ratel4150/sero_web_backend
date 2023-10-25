import sequelize from "../config/db.config.js";

export const getPlaceServiceProcessByUserId = async (req, res) => {
    try {
      const [processFound, metadata] = await sequelize.query(`execute sp_get_place_service_process_by_user_id '${req.params.user_id}'`)

      if(!processFound[0]) return res.status(400).json({
        message: "not found process"
      })      
    
      res.json(processFound)

    } catch (error) {
      console.log(error)
      return res.status(404).json({message: 'process not found'})
    }  
  }