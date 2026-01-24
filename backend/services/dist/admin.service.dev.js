"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var jwt = require('jsonwebtoken');

var ResignInfo = require('../models/resign.model');

var ExitResponse = require('../models/exitResponse.model');

var AdminService =
/*#__PURE__*/
function () {
  function AdminService() {
    _classCallCheck(this, AdminService);
  }

  _createClass(AdminService, [{
    key: "verifyToken",
    // =====================
    // VERIFY ADMIN TOKEN
    // =====================
    value: function verifyToken(token) {
      try {
        return jwt.verify(token, process.env.SECREATE_KEY);
      } catch (err) {
        return null;
      }
    } // =====================
    // GET ALL RESIGNATIONS
    // =====================

  }, {
    key: "getAllResignations",
    value: function getAllResignations() {
      return regeneratorRuntime.async(function getAllResignations$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(ResignInfo.find().populate('employeeId'));

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    } // =====================
    // CONCLUDE RESIGNATION
    // =====================

  }, {
    key: "concludeResignation",
    value: function concludeResignation(resignationId, approved, lwd) {
      return regeneratorRuntime.async(function concludeResignation$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (resignationId) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", null);

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(ResignInfo.findByIdAndUpdate(resignationId, {
                status: approved ? 'approved' : 'rejected',
                lwd: lwd
              }, {
                "new": true
              }));

            case 4:
              return _context2.abrupt("return", _context2.sent);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    } // =====================
    // GET ALL EXIT RESPONSES
    // =====================

  }, {
    key: "getAllExitResponses",
    value: function getAllExitResponses() {
      return regeneratorRuntime.async(function getAllExitResponses$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(ExitResponse.find().populate('employeeId'));

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }]);

  return AdminService;
}();

module.exports = AdminService;
//# sourceMappingURL=admin.service.dev.js.map
