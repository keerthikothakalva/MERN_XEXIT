"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../middlewares/employee.middleware'),
    validateEmployeeAuth = _require.validateEmployeeAuth;

var _require2 = require('../controllers/user.controller'),
    newUserResign = _require2.newUserResign,
    submitExitResponses = _require2.submitExitResponses,
    deleteResign = _require2.deleteResign; // Employee resign


router.post('/resign', validateEmployeeAuth, newUserResign); // 🔥 THIS WAS FAILING

router.post('/responses', validateEmployeeAuth, submitExitResponses); // Delete resignation

router["delete"]('/resign', validateEmployeeAuth, deleteResign);
module.exports = router;
//# sourceMappingURL=user.routes.dev.js.map
