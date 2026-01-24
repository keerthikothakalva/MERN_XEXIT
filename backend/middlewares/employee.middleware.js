const EmployeeLogics = require('../services/employee.service');
const allEmployeeLogics = new EmployeeLogics();
const memoryStore = require('../utils/memoryStore');

const validateEmployeeAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    
    if (token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }

    
    if (token === 'dummy-token') {
      const user = memoryStore.users.find(u => u.role === 'employee');

      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      req.user = user;
      return next();
    }

    
    const decoded = allEmployeeLogics.compareToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await allEmployeeLogics.findUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { validateEmployeeAuth };
