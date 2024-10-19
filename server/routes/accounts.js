// routes/accounts.js
const express = require('express');
const { createAccount, getAccounts } = require('../controllers/accountController');
const router = express.Router();

router.post('/create', createAccount);
router.get('/', getAccounts);

module.exports = router;
