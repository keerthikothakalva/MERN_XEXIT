const EmployeeLogics = require('../services/employee.service');
const allEmployeeLogics = new EmployeeLogics();
const memoryStore = require('../utils/memoryStore');

const validateAdminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;

    const decoded = allEmployeeLogics.compareToken(token);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await allEmployeeLogics.findUserById(decoded.id);

    if (!user || user.role !== 'HR') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    req.admin = user;
    next();

  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};



module.exports = {
  validateAdminAuth,
  validateAdminActions
};
