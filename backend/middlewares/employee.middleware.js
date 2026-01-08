const {
    validateRegisterUser,
    validateLoginUser,
    validateResignData
} = require('../validators/user.validator.js');
const employeeLogics = require('../services/employee.service');
const allEmployeeLogics = new employeeLogics();

// Middleware for validating registration information
const validateRegInfo = async (req, res, next) => {
    try {
        const { error } = validateRegisterUser.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Middleware for validating login information
const validateLogInfo = async (req, res, next) => {
    try {
        const { error } = validateLoginUser.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Middleware for validating resignation information
const validateResignInfo = async (req, res, next) => {
    try {
        const { error } = validateResignData.validate({ empId: req.user.id, ...req.body });
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Authentication middleware
const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ message: 'Authorization header is missing' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send({ message: 'Token is missing' });
        }

        const user = await allEmployeeLogics.compareToken(token);
        if (!user) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        req.user = await allEmployeeLogics.findUserById(user);
        next();
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

module.exports = {
    validateRegInfo,
    validateLogInfo,
    validateResignInfo,
    auth
};
