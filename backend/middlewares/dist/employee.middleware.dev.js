"use strict";

var EmployeeLogics = require('../services/employee.service');

var allEmployeeLogics = new EmployeeLogics();

var validateEmployeeAuth = function validateEmployeeAuth(req, res, next) {
  var token, decoded, user;
  return regeneratorRuntime.async(function validateEmployeeAuth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.headers.authorization;

          if (token) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid token'
          }));

        case 4:
          decoded = allEmployeeLogics.compareToken(token);

          if (!(!decoded || !decoded.id)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid token'
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(allEmployeeLogics.findUserById(decoded.id));

        case 9:
          user = _context.sent;

          if (user) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid token'
          }));

        case 12:
          req.user = user;
          next();
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid token'
          }));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

module.exports = {
  validateEmployeeAuth: validateEmployeeAuth
};
//# sourceMappingURL=employee.middleware.dev.js.map
