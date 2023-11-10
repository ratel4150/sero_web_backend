import { getDatabaseInstance } from "../config/dbManager.config.js";

export const getAccountHistoryByCount = async (req, res) => {
  const place_id = 2;
  const sequelize = getDatabaseInstance(place_id);

  try {
    const account = req.params.account; // Obtén el valor del parámetro desde req.params
    const [accountHistory, metadata] = await sequelize.query(
      'execute sp_get_account_history @account=:account', // Usa el nombre del parámetro
      { replacements: { account } } // Pasa los parámetros aquí
    );
    
    // Verifica si accountHistory es undefined o tiene algún valor
    if (!accountHistory) {
      return res.status(404).json({ message: 'account not found' });
    }
     
   /*  res.json(accountHistory); */
  } catch (error) {
    console.log(error);
    // Maneja el error de la base de datos aquí, puedes personalizar según tus necesidades.
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Llamada de prueba
getAccountHistoryByCount({ params: { account: "00000007-00000007" } });
