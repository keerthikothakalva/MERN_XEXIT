"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/employee.controller'),
    registerNewUser = _require.registerNewUser,
    loginUser = _require.loginUser;

router.post('/register', registerNewUser);
router.post('/login', loginUser);
module.exports = router;
//# sourceMappingURL=auth.route.dev.js.map
