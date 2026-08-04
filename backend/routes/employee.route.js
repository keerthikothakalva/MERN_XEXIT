const express = require('express');
const router = express.Router();

const {
  newUserResign,
  submitExitResponses,
  deleteResign,
  getMyResignation
} = require('../controllers/employee.controller');

const {
  validateEmployeeAuth
} = require('../middlewares/employee.middleware');

router.post(
  '/resign',
  validateEmployeeAuth,
  newUserResign
);


router.get(
  '/resignation',
  validateEmployeeAuth,
  getMyResignation
);


router.post(
  '/responses',
  validateEmployeeAuth,
  submitExitResponses
);


router.delete(
  '/resign',
  validateEmployeeAuth,
  deleteResign
);


module.exports = router;