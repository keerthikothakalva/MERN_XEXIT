"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Employee = require('../models/employee.model');

var ResignInfo = require('../models/resign.model');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var EmployeeLogics =
/*#__PURE__*/
function () {
  function EmployeeLogics() {
    _classCallCheck(this, EmployeeLogics);
  }

  _createClass(EmployeeLogics, [{
    key: "ensureAdminExists",
    // ---------- AUTH ----------
    value: function ensureAdminExists() {
      var admin, hashedPassword;
      return regeneratorRuntime.async(function ensureAdminExists$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(Employee.findOne({
                username: 'admin'
              }));

            case 2:
              admin = _context.sent;

              if (admin) {
                _context.next = 9;
                break;
              }

              _context.next = 6;
              return regeneratorRuntime.awrap(bcrypt.hash('admin', 10));

            case 6:
              hashedPassword = _context.sent;
              _context.next = 9;
              return regeneratorRuntime.awrap(Employee.create({
                username: 'admin',
                password: hashedPassword,
                role: 'admin'
              }));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "registerUser",
    value: function registerUser(payload) {
      var hashedPassword;
      return regeneratorRuntime.async(function registerUser$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.ensureAdminExists());

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(bcrypt.hash(payload.password, 10));

            case 4:
              hashedPassword = _context2.sent;
              return _context2.abrupt("return", Employee.create({
                username: payload.username,
                password: hashedPassword,
                role: 'employee'
              }));

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getUserByName",
    value: function getUserByName(username) {
      return Employee.findOne({
        username: username
      });
    }
  }, {
    key: "validatePassword",
    value: function validatePassword(text, hashedPassword) {
      return bcrypt.compare(text, hashedPassword);
    }
  }, {
    key: "createToken",
    value: function createToken(payload) {
      return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });
    }
  }, {
    key: "compareToken",
    value: function compareToken(token) {
      return jwt.verify(token, process.env.JWT_SECRET);
    }
  }, {
    key: "findUserById",
    value: function findUserById(id) {
      return Employee.findById(id);
    } // ---------- RESIGNATION ----------

  }, {
    key: "addResignOfEmployee",
    value: function addResignOfEmployee(payload) {
      return ResignInfo.create({
        employeeId: payload.employeeId,
        lwd: payload.lwd,
        status: 'pending'
      });
    }
  }, {
    key: "findResignData",
    value: function findResignData(employeeId) {
      return ResignInfo.findOne({
        employeeId: employeeId
      });
    }
  }, {
    key: "deleteResignData",
    value: function deleteResignData(employeeId) {
      return ResignInfo.findOneAndDelete({
        employeeId: employeeId
      });
    }
  }, {
    key: "modifyResignation",
    value: function modifyResignation(payload) {
      return ResignInfo.findByIdAndUpdate(payload.resignationId, {
        status: payload.approved ? 'approved' : 'rejected',
        lwd: payload.lwd
      }, {
        "new": true
      });
    }
  }]);

  return EmployeeLogics;
}();

module.exports = EmployeeLogics;
//# sourceMappingURL=employee.service.dev.js.map
