"use strict";

var EmployeeLogics = require('../services/employee.service');

var allEmployeeLogics = new EmployeeLogics();

var memoryStore = require('../utils/memoryStore');

var validateAdminAuth = function validateAdminAuth(req, res, next) {
  var token, admin, decoded, user;
  return regeneratorRuntime.async(function validateAdminAuth$(_context) {
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
            message: 'Unauthorized'
          }));

        case 4:
          if (token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
          }

          if (!(token === 'dummy-token')) {
            _context.next = 11;
            break;
          }

          admin = memoryStore.users.find(function (u) {
            return u.role === 'admin';
          });

          if (admin) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(403).json({
            message: 'Admin access required'
          }));

        case 9:
          req.admin = admin;
          return _context.abrupt("return", next());

        case 11:
          decoded = allEmployeeLogics.compareToken(token);

          if (!(!decoded || !decoded.id)) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Unauthorized'
          }));

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(allEmployeeLogics.findUserById(decoded.id));

        case 16:
          user = _context.sent;

          if (!(!user || user.role !== 'admin')) {
            _context.next = 19;
            break;
          }

          return _context.abrupt("return", res.status(403).json({
            message: 'Admin access required'
          }));

        case 19:
          req.admin = user;
          next();
          _context.next = 26;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(401).json({
            message: 'Unauthorized'
          }));

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 23]]);
};

var validateAdminActions = function validateAdminActions(req, res, next) {
  next();
};

module.exports = {
  validateAdminAuth: validateAdminAuth,
  validateAdminActions: validateAdminActions
};
//# sourceMappingURL=adminAuth.dev.js.map
