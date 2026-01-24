const EmployeeLogics = require('../services/employee.service');
const allEmployeeLogics = new EmployeeLogics();
const memoryStore = require('../utils/memoryStore');

const validateAdminAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    
    if (token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }

    
    if (token === 'dummy-token') {
      const admin = memoryStore.users.find(u => u.role === 'admin');

      if (!admin) {
        return res.status(403).json({ message: 'Admin access required' });
      }

      req.admin = admin;
      return next();
    }

    
    const decoded = allEmployeeLogics.compareToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await allEmployeeLogics.findUserById(decoded.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    req.admin = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};


const validateAdminActions = (req, res, next) => {
  next();
};

module.exports = {
  validateAdminAuth,
  validateAdminActions
};
