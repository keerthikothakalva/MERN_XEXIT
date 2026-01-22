"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../middlewares/employee.middleware'),
    auth = _require.auth;

var employeeController = require('../controllers/employee.controller'); // Employee submits resignation


router.post('/resign', auth, employeeController.newUserResign); // Employee submits exit questionnaire

router.post('/responses', auth, employeeController.submitExitResponses);
module.exports = router;
//# sourceMappingURL=user.route.dev.js.map
