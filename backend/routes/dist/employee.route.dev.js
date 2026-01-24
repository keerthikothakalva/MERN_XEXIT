"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/employee.controller'),
    newUserResign = _require.newUserResign,
    submitExitResponses = _require.submitExitResponses,
    deleteResign = _require.deleteResign;

var _require2 = require('../middlewares/employee.middleware'),
    validateEmployeeAuth = _require2.validateEmployeeAuth; // 🔥 THESE MUST BE FUNCTIONS


router.post('/resign', validateEmployeeAuth, newUserResign);
router.post('/responses', validateEmployeeAuth, submitExitResponses);
router["delete"]('/resign', validateEmployeeAuth, deleteResign);
module.exports = router;
//# sourceMappingURL=employee.route.dev.js.map
