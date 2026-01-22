"use strict";

var router = require('express').Router();

var _require = require('../middlewares/employee.middleware'),
    validateResignInfo = _require.validateResignInfo,
    auth = _require.auth;

var _require2 = require('../controllers/employee.controller'),
    newUserResign = _require2.newUserResign,
    deleteResign = _require2.deleteResign,
    submitExitResponses = _require2.submitExitResponses; // EMPLOYEE ROUTES ONLY


router.post('/resign', auth, validateResignInfo, newUserResign);
router["delete"]('/resign', auth, deleteResign);
router.post('/responses', auth, submitExitResponses);
module.exports = router;
//# sourceMappingURL=employee.route.dev.js.map
