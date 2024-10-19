// controllers/transactionController.js
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// Realizar una nueva transacción
const createTransaction = async (req, res) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;

    // Restar del saldo de la cuenta de origen
    const fromAccount = await Account.findById(fromAccountId);
    if (fromAccount.balance < amount) {
      return res.status(400).json({ message: 'Saldo insuficiente' });
    }

    fromAccount.balance -= amount;
    await fromAccount.save();

    // Sumar al saldo de la cuenta destino
    const toAccount = await Account.findById(toAccountId);
    toAccount.balance += amount;
    await toAccount.save();

    // Registrar la transacción
    const transaction = new Transaction({ fromAccountId, toAccountId, amount });
    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error al realizar la transacción', error });
  }
};

// Obtener todas las transacciones
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener transacciones', error });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
};
