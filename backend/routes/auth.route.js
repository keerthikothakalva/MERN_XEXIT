const router = require('express').Router();

const {
  validateRegInfo,
  validateLogInfo
} = require('../middlewares/employee.middleware');

const {
  registerNewUser,
  loginUser
} = require('../controllers/employee.controller');

// AUTH ROUTES ONLY
router.post('/register', validateRegInfo, registerNewUser);
router.post('/login', validateLogInfo, loginUser);

module.exports = router;
