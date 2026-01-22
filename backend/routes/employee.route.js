const router = require('express').Router();

const {
  validateRegInfo,
  validateLogInfo,
  validateResignInfo,
  auth
} = require('../middlewares/employee.middleware');

const {
  registerNewUser,
  loginUser,
  newUserResign,
  deleteResign,
  submitExitResponses     
} = require('../controllers/employee.controller');

// ---------- AUTH ROUTES ----------
router.post('/register', validateRegInfo, registerNewUser);
router.post('/login', validateLogInfo, loginUser);

// ---------- EMPLOYEE ROUTES ----------
router.post('/resign', auth, validateResignInfo, newUserResign);
router.delete('/resign', auth, deleteResign);

// ---------- EXIT QUESTIONNAIRE ----------
router.post(
  '/responses',
  auth,
  submitExitResponses
);

module.exports = router;
