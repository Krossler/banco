// routes/users.js
const express = require('express');
const cors = require('cors');
const { registerUser, getUsers } = require('../controllers/userController');
const router = express.Router();

router.options('/register', cors());
router.post('/register', registerUser);
router.get('/', getUsers);

module.exports = router;
