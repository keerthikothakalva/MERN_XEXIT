"use strict";

var router = require('express').Router();

var _require = require('../middlewares/employee.middleware'),
    validateRegInfo = _require.validateRegInfo,
    validateLogInfo = _require.validateLogInfo,
    validateResignInfo = _require.validateResignInfo,
    auth = _require.auth;

var _require2 = require('../controllers/employee.controller'),
    registerNewUser = _require2.registerNewUser,
    loginUser = _require2.loginUser,
    newUserResign = _require2.newUserResign,
    deleteResign = _require2.deleteResign,
    submitExitResponses = _require2.submitExitResponses; // ---------- AUTH ROUTES ----------


router.post('/register', validateRegInfo, registerNewUser);
router.post('/login', validateLogInfo, loginUser); // ---------- EMPLOYEE ROUTES ----------

router.post('/resign', auth, validateResignInfo, newUserResign);
router["delete"]('/resign', auth, deleteResign); // ---------- EXIT QUESTIONNAIRE ----------

router.post('/responses', auth, submitExitResponses);
module.exports = router;
//# sourceMappingURL=employee.route.dev.js.map
