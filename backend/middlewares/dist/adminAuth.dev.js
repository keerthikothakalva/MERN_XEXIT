"use strict";

var EmployeeLogics = require('../services/employee.service');

var allEmployeeLogics = new EmployeeLogics();

var validateAdminAuth = function validateAdminAuth(req, res, next) {
  var authHeader, token, decoded, role;
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
          console.log('DECODED HR TOKEN:', decoded);

          if (!(!decoded || !decoded.id)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid token'
          }));

        case 9:
          role = String(decoded.role || '').toLowerCase();

          if (!(role !== 'hr')) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(403).json({
            message: 'HR access denied'
          }));

        case 12:
          req.admin = {
            _id: decoded.id,
            id: decoded.id,
            role: 'hr'
          };
          next();
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error('validateAdminAuth error:', _context.t0.message);
          return _context.abrupt("return", res.status(401).json({
            message: 'Unauthorized'
          }));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

module.exports = {
  validateAdminAuth: validateAdminAuth
};
//# sourceMappingURL=adminAuth.dev.js.map
