const adminService = require('../services/admin.service.js');
const adminAuth = new adminService();

const validateAdminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ message: 'Authorization header is missing' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send({ message: 'Token is missing' });
        }

        const admin = await adminAuth.verifyToken(token);
        if (!admin) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        req.admin = admin;
        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const validateAdminActions = async (req, res, next) => {
    try {
        // Add specific checks based on admin role/permissions here
        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = {
    validateAdminAuth,
    validateAdminActions
};
