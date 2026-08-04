"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../middlewares/employee.middleware'),
    validateEmployeeAuth = _require.validateEmployeeAuth;

var _require2 = require('../controllers/user.controller'),
    newUserResign = _require2.newUserResign,
    submitExitResponses = _require2.submitExitResponses,
    deleteResign = _require2.deleteResign;

router.post('/resign', validateEmployeeAuth, newUserResign);
router.post('/responses', validateEmployeeAuth, submitExitResponses);
router["delete"]('/resign', validateEmployeeAuth, deleteResign);
module.exports = router;
//# sourceMappingURL=user.routes.dev.js.map
