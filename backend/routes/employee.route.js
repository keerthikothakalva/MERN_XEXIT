const express = require('express');
const router = express.Router();

const {
  newUserResign,
  submitExitResponses,
  deleteResign
} = require('../controllers/employee.controller');

const {
  validateEmployeeAuth
} = require('../middlewares/employee.middleware');


router.post('/resign', validateEmployeeAuth, newUserResign);
router.post('/responses', validateEmployeeAuth, submitExitResponses);
router.delete('/resign', validateEmployeeAuth, deleteResign);

module.exports = router;
