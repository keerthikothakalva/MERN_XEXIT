const express = require('express');
const router = express.Router();

const { validateEmployeeAuth } = require('../middlewares/employee.middleware');

const {
  newUserResign,
  submitExitResponses,
  deleteResign
} = require('../controllers/user.controller');

// Employee resign
router.post('/resign', validateEmployeeAuth, newUserResign);

// 🔥 THIS WAS FAILING
router.post('/responses', validateEmployeeAuth, submitExitResponses);

// Delete resignation
router.delete('/resign', validateEmployeeAuth, deleteResign);

module.exports = router;
