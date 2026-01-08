const router = require('express').Router();
const {
    validateRegInfo,
    validateLogInfo,
    validateResignInfo,
    auth
} = require('../middlewares/employee.middleware.js');
const {
    registerNewUser,
    loginUser,
    newUserResign,
    deleteResign
} = require('../controllers/employee.controller.js');

// Auth routes
router.post('/auth/register', validateRegInfo, registerNewUser);
router.post('/auth/login', validateLogInfo, loginUser);

// Resignation routes
router.post(
    '/user/resign',
    auth,
    (req, res, next) => {
        // FIX: ensure empId exists for validator
        req.body.empId = req.user._id;
        next();
    },
    validateResignInfo,
    newUserResign
);

router.delete('/user/resign', auth, deleteResign);

// Exit questionnaire (Cypress requires this)
router.post('/user/responses', auth, async (req, res) => {
    return res.status(200).send({ message: 'Responses saved' });
});

module.exports = router;
