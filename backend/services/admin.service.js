
const jwt = require('jsonwebtoken');

class adminService {
    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.SECREATE_KEY);
        } catch (err) {
            return null;
        }
    }
}

module.exports = adminService;
