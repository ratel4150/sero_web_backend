import { getDatabaseInstance } from "../config/dbManager.config.js";

export const getAccountHistoryByCount = async (req, res) => {
  const place_id = 2;
  const sequelize = getDatabaseInstance(place_id);

  try {
    const [account, metadata] = await sequelize.query(`execute sp_get_account_history '${req.params.account}'`)
    // Verifica si accountHistory es undefined o tiene algún valor
    if(!account[0]) return res.status(400).json({
      message: "not found account"
    })      
  
    res.json(account)

  } catch (error) {
    console.log(error)
    return res.status(404).json({message: 'account not found'})
  }  
};


