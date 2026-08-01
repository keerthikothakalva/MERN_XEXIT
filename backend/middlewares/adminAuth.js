const EmployeeLogics = require('../services/employee.service');

const allEmployeeLogics = new EmployeeLogics();

const validateAdminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: 'No token provided'
      });
    }

   
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;

    const decoded = allEmployeeLogics.compareToken(token);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        message: 'Invalid token'
      });
    }

    
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        message: 'Admin access required'
      });
    }

    
    req.admin = {
      _id: decoded.id,
      id: decoded.id,
      role: decoded.role
    };

    next();

  } catch (err) {
    console.error('validateAdminAuth error:', err.message);

    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
};

module.exports = {
  validateAdminAuth
};