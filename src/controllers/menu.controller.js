import sequelize from "../config/db.config.js";

export const getMenusUserId = async (req, res) => {
    try {
      const [menuFound, metadata] = await sequelize.query(`execute sp_get_menu_sub_menu_profile_user '${req.params.user_id}'`)

      console.log("este es el param:" + req.params.user_id)

      if(!menuFound[0]) return res.status(400).json({
        message: "not found menu"
      })      
    
      res.json(menuFound)

    } catch (error) {
      console.log(error)
      return res.status(404).json({message: 'menu not found'})
    }  
  }