"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../middlewares/adminAuth'),
    validateAdminAuth = _require.validateAdminAuth,
    validateAdminActions = _require.validateAdminActions;

var _require2 = require('../controllers/admin.controller'),
    getAllResignations = _require2.getAllResignations,
    concludeResignation = _require2.concludeResignation,
    getExitResponses = _require2.getExitResponses;

router.get('/resignations', validateAdminAuth, getAllResignations);
router.post('/resignations/approve', validateAdminAuth, validateAdminActions, concludeResignation);
router.get('/exit-responses', validateAdminAuth, getExitResponses);
module.exports = router;
//# sourceMappingURL=admin.route.dev.js.map
