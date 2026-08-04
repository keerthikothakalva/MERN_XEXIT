const express = require('express');
const router = express.Router();

const { validateEmployeeAuth } = require('../middlewares/employee.middleware');

const {
  newUserResign,
  submitExitResponses,
  deleteResign
} = require('../controllers/user.controller');

router.post('/resign', validateEmployeeAuth, newUserResign);

router.post('/responses', validateEmployeeAuth, submitExitResponses);


router.delete('/resign', validateEmployeeAuth, deleteResign);

module.exports = router;
