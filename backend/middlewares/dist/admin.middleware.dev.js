"use strict";

var EmployeeLogics = require('../services/employee.service');

var allEmployeeLogics = new EmployeeLogics();
/* ======================
   ADMIN AUTH MIDDLEWARE
====================== */

var validateAdminAuth = function validateAdminAuth(req, res, next) {
  var token, decoded, user;
  return regeneratorRuntime.async(function validateAdminAuth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Cypress sends RAW token (no "Bearer")
          token = req.headers.authorization;

          if (token) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(401).send({
            message: 'Token is missing'
          }));

        case 4:
          decoded = allEmployeeLogics.compareToken(token);

          if (!(!decoded || !decoded.id)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(401).send({
            message: 'Unauthorized'
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(allEmployeeLogics.findUserById(decoded.id));

        case 9:
          user = _context.sent;

          if (!(!user || user.role !== 'admin')) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(403).send({
            message: 'Admin access required'
          }));

        case 12:
          req.admin = user;
          next();
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(401).send({
            message: 'Invalid token'
          }));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};
/* ======================
   ADMIN ACTIONS
====================== */


var validateAdminActions = function validateAdminActions(req, res, next) {
  next();
};

module.exports = {
  validateAdminAuth: validateAdminAuth,
  validateAdminActions: validateAdminActions
};
//# sourceMappingURL=admin.middleware.dev.js.map
