const express = require('express');
const router = express.Router();

const {
  registerNewUser,
  loginUser
} = require('../controllers/employee.controller');

router.post('/register', registerNewUser);
router.post('/login', loginUser);

module.exports = router;
