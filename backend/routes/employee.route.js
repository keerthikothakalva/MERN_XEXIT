const router = require('express').Router();

const {
  validateResignInfo,
  auth
} = require('../middlewares/employee.middleware');

const {
  newUserResign,
  deleteResign,
  submitExitResponses
} = require('../controllers/employee.controller');

// EMPLOYEE ACTIONS ONLY
router.post('/resign', auth, validateResignInfo, newUserResign);
router.delete('/resign', auth, deleteResign);
router.post('/responses', auth, submitExitResponses);

module.exports = router;
