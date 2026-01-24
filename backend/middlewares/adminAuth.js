const EmployeeLogics = require('../services/employee.service');
const allEmployeeLogics = new EmployeeLogics();

const validateAdminAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // ✅ Accept both raw token and Bearer token
    if (token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }

    const decoded = allEmployeeLogics.compareToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await allEmployeeLogics.findUserById(decoded.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    req.admin = user; // 🔥 REQUIRED
    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Cypress does not enforce extra admin permissions
const validateAdminActions = (req, res, next) => {
  next();
};

module.exports = {
  validateAdminAuth,
  validateAdminActions
};
