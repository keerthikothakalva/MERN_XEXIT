"use strict";

var _require = require('../validators/user.validator.js'),
    validateRegisterUser = _require.validateRegisterUser,
    validateLoginUser = _require.validateLoginUser,
    validateResignData = _require.validateResignData;

var EmployeeLogics = require('../services/employee.service');

var allEmployeeLogics = new EmployeeLogics();
/* ======================
   REGISTER VALIDATION
====================== */

var validateRegInfo = function validateRegInfo(req, res, next) {
  var _validateRegisterUser = validateRegisterUser.validate(req.body),
      error = _validateRegisterUser.error;

  if (error) {
    return res.status(400).send({
      message: error.details[0].message
    });
  }

  next();
};
/* ======================
   LOGIN VALIDATION
====================== */


var validateLogInfo = function validateLogInfo(req, res, next) {
  var _validateLoginUser$va = validateLoginUser.validate(req.body),
      error = _validateLoginUser$va.error;

  if (error) {
    return res.status(400).send({
      message: error.details[0].message
    });
  }

  next();
};
/* ======================
   AUTH MIDDLEWARE
====================== */


var auth = function auth(req, res, next) {
  var token, decoded, user;
  return regeneratorRuntime.async(function auth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
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

          if (user) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(401).send({
            message: 'User not found'
          }));

        case 12:
          req.user = user;
          req.user.isAdmin = user.role === 'admin';
          next();
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(401).send({
            message: 'Invalid token'
          }));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17]]);
};
/* ======================
   RESIGN VALIDATION
====================== */


var validateResignInfo = function validateResignInfo(req, res, next) {
  // ✅ Cypress sends ONLY { lwd }
  var _validateResignData$v = validateResignData.validate(req.body),
      error = _validateResignData$v.error;

  if (error) {
    return res.status(400).send({
      message: error.details[0].message
    });
  }

  next();
};

module.exports = {
  validateRegInfo: validateRegInfo,
  validateLogInfo: validateLogInfo,
  validateResignInfo: validateResignInfo,
  auth: auth
};
//# sourceMappingURL=employee.middleware.dev.js.map
