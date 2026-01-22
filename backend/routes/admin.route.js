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
router.post('/resignations/approve', validateAdminAuth, validateAdminActions, concludeResignation);
router.get('/exit-responses', validateAdminAuth, getExitResponses);

module.exports = router;
