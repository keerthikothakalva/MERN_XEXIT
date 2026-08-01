"use strict";

var EmployeeLogics = require('../services/employee.service');

var allEmployeeLogics = new EmployeeLogics();

var validateAdminAuth = function validateAdminAuth(req, res, next) {
  var authHeader, token, decoded;
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
          if (!(decoded.role !== 'admin')) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(403).json({
            message: 'Admin access required'
          }));

        case 10:
          req.admin = {
            _id: decoded.id,
            id: decoded.id,
            role: decoded.role
          };
          next();
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error('validateAdminAuth error:', _context.t0.message);
          return _context.abrupt("return", res.status(401).json({
            message: 'Unauthorized'
          }));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

module.exports = {
  validateAdminAuth: validateAdminAuth
};
//# sourceMappingURL=adminAuth.dev.js.map
