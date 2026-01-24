const express = require('express');
const router = express.Router();

const {
  validateAdminAuth,
  validateAdminActions
} = require('../middlewares/adminAuth');

const {
  getAllResignations,
  concludeResignation,
  getExitResponses
} = require('../controllers/admin.controller');

router.get('/resignations', validateAdminAuth, getAllResignations);

// 🔥 MUST BE PUT + EXACT PATH
router.put(
  '/conclude_resignation',
  validateAdminAuth,
  validateAdminActions,
  concludeResignation
);

// 🔥 MUST BE UNDERSCORE
router.get('/exit_responses', validateAdminAuth, getExitResponses);

module.exports = router;
