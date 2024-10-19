// controllers/accountController.js
const Account = require('../models/Account');

// Crear una nueva cuenta
const createAccount = async (req, res) => {
  try {
    const { userId, balance } = req.body;

    const newAccount = new Account({ userId, balance });
    await newAccount.save();

    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear cuenta', error });
  }
};

// Obtener todas las cuentas
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cuentas', error });
  }
};

module.exports = {
  createAccount,
  getAccounts,
};
