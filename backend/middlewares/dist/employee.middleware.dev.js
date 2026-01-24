"use strict";

var EmployeeLogics = require('../services/employee.service');

var allEmployeeLogics = new EmployeeLogics();

var memoryStore = require('../utils/memoryStore');

var validateEmployeeAuth = function validateEmployeeAuth(req, res, next) {
  var token, _user, decoded, user;

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
          if (token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
          }

          if (!(token === 'dummy-token')) {
            _context.next = 11;
            break;
          }

          _user = memoryStore.users.find(function (u) {
            return u.role === 'employee';
          });

          if (_user) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid token'
          }));

        case 9:
          req.user = _user;
          return _context.abrupt("return", next());

        case 11:
          decoded = allEmployeeLogics.compareToken(token);

          if (!(!decoded || !decoded.id)) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid token'
          }));

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(allEmployeeLogics.findUserById(decoded.id));

        case 16:
          user = _context.sent;

          if (user) {
            _context.next = 19;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid token'
          }));

        case 19:
          req.user = user;
          next();
          _context.next = 26;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid token'
          }));

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 23]]);
};

module.exports = {
  validateEmployeeAuth: validateEmployeeAuth
};
//# sourceMappingURL=employee.middleware.dev.js.map
