const EmployeeLogics = require('../services/employee.service');
const allEmployeeLogics = new EmployeeLogics();

/* ======================
   ADMIN AUTH MIDDLEWARE
====================== */
const validateAdminAuth = async (req, res, next) => {
  try {
    // Cypress sends RAW token (no "Bearer")
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ message: 'Token is missing' });
    }

    const decoded = allEmployeeLogics.compareToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const user = await allEmployeeLogics.findUserById(decoded.id);

  
    if (!user || user.role !== 'admin') {
      return res.status(403).send({ message: 'Admin access required' });
    }

    req.admin = user;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Invalid token' });
  }
};

/* ======================
   ADMIN ACTIONS
====================== */
const validateAdminActions = (req, res, next) => {
  next();
};

module.exports = {
  validateAdminAuth,
  validateAdminActions
};
