"use strict";

var router = require('express').Router();

var _require = require('../middlewares/employee.middleware'),
    validateRegInfo = _require.validateRegInfo,
    validateLogInfo = _require.validateLogInfo;

var _require2 = require('../controllers/employee.controller'),
    registerNewUser = _require2.registerNewUser,
    loginUser = _require2.loginUser; // AUTH ROUTES (ONLY)


router.post('/register', validateRegInfo, registerNewUser);
router.post('/login', validateLogInfo, loginUser);
module.exports = router;
//# sourceMappingURL=auth.route.dev.js.map
