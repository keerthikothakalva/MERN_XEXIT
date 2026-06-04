"use strict";

var EmployeeLogics = require('../services/employee.service');

var allEmployeeLogics = new EmployeeLogics();

var memoryStore = require('../utils/memoryStore');

var validateAdminAuth = function validateAdminAuth(req, res, next) {
  var authHeader, token, decoded, user;
  return regeneratorRuntime.async(function validateAdminAuth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          authHeader = req.headers.authorization;

          if (authHeader) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'No token provided'
          }));

        case 4:
          token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
          decoded = allEmployeeLogics.compareToken(token);

          if (!(!decoded || !decoded.id)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid token'
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(allEmployeeLogics.findUserById(decoded.id));

        case 10:
          user = _context.sent;

          if (!(!user || user.role !== 'HR')) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", res.status(403).json({
            message: 'Admin access required'
          }));

        case 13:
          req.admin = user;
          next();
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(401).json({
            message: 'Unauthorized'
          }));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

module.exports = {
  validateAdminAuth: validateAdminAuth
};
//# sourceMappingURL=adminAuth.dev.js.map
