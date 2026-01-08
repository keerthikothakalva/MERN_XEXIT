const router = require('express').Router();
const {
    validateAdminAuth,
    validateAdminActions
} = require('../middlewares/admin.middleware.js');
const {
    getAllUsers,
    approveResignation,
    deleteUser
} = require('../controllers/admin.controller.js');

// Admin routes (Cypress compatible)
router.get('/users', validateAdminAuth, getAllUsers);

// FIX 1: must be PUT, not POST
router.put(
    '/resign/approve',
    validateAdminAuth,
    validateAdminActions,
    approveResignation
);

// FIX 2: consistent route path
router.delete(
    '/user/delete/:id',
    validateAdminAuth,
    validateAdminActions,
    deleteUser
);

module.exports = router;
