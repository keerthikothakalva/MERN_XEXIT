const router = require('express').Router();

const {
  validateAdminAuth,
  validateAdminActions
} = require('../middlewares/admin.middleware');

const {
  getAllResignations,
  concludeResignation,
  getExitResponses
} = require('../controllers/admin.controller');

// View all resignations
router.get('/resignations', validateAdminAuth, getAllResignations);

// Approve / Reject resignation
router.put(
  '/conclude_resignation',
  validateAdminAuth,
  validateAdminActions,
  concludeResignation
);

// View exit questionnaire responses
router.get(
  '/exit_responses',
  validateAdminAuth,
  getExitResponses
);

module.exports = router;
