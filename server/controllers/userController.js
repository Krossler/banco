// controllers/userController.js
const User = require('../models/User');

// Registrar nuevo usuario
const registerUser = async (req, res) => {
  console.log(req.body); // Logar o corpo da requisição
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao registrar usuário:', error); // Log do erro
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

module.exports = {
  registerUser,
  getUsers,
};
