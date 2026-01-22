"use strict";

var router = require('express').Router();

var _require = require('../middlewares/admin.middleware'),
    validateAdminAuth = _require.validateAdminAuth,
    validateAdminActions = _require.validateAdminActions;

var _require2 = require('../controllers/admin.controller'),
    getAllResignations = _require2.getAllResignations,
    concludeResignation = _require2.concludeResignation,
    getExitResponses = _require2.getExitResponses; // View all resignations


router.get('/resignations', validateAdminAuth, getAllResignations); // Approve / Reject resignation

router.put('/conclude_resignation', validateAdminAuth, validateAdminActions, concludeResignation); // View exit questionnaire responses

router.get('/exit_responses', validateAdminAuth, getExitResponses);
module.exports = router;
//# sourceMappingURL=admin.route.dev.js.map
