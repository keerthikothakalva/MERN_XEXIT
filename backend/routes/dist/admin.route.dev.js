"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../middlewares/adminAuth'),
    validateAdminAuth = _require.validateAdminAuth,
    validateAdminActions = _require.validateAdminActions;

var _require2 = require('../controllers/admin.controller'),
    getAllResignations = _require2.getAllResignations,
    getRecentResignations = _require2.getRecentResignations,
    concludeResignation = _require2.concludeResignation,
    getExitResponses = _require2.getExitResponses;

router.get('/resignations', validateAdminAuth, getAllResignations);
router.get('/recent-resignations', validateAdminAuth, getRecentResignations);
router.put('/conclude_resignation', validateAdminAuth, concludeResignation);
router.get('/exit_responses', validateAdminAuth, getExitResponses);
module.exports = router;
//# sourceMappingURL=admin.route.dev.js.map
