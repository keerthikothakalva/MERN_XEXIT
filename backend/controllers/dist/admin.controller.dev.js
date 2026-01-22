"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ResignInfo = require('../models/resign.model');

var ExitResponse = require("../models/exitResponse.model");

var memoryStore = require('../utils/memoryStore'); // =====================
// GET ALL RESIGNATIONS
// =====================


var getAllResignations = function getAllResignations(req, res) {
  var resignations;
  return regeneratorRuntime.async(function getAllResignations$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(ResignInfo.find());

        case 3:
          resignations = _context.sent;
          return _context.abrupt("return", res.status(200).json(resignations.map(function (r) {
            return {
              _id: r._id,
              employeeId: r.employeeId || r.empId,
              lwd: r.lwd,
              status: r.status
            };
          })));

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            message: 'Internal server error'
          }));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // =====================
// APPROVE / REJECT RESIGNATION
// =====================


var concludeResignation = function concludeResignation(req, res) {
  var _req$body, resignationId, approved, lwd;

  return regeneratorRuntime.async(function concludeResignation$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, resignationId = _req$body.resignationId, approved = _req$body.approved, lwd = _req$body.lwd;
          _context2.next = 4;
          return regeneratorRuntime.awrap(ResignInfo.findByIdAndUpdate(resignationId, _objectSpread({
            status: approved ? 'approved' : 'rejected'
          }, approved && lwd && {
            lwd: lwd
          })));

        case 4:
          return _context2.abrupt("return", res.status(201).json({
            message: 'Resignation approved successfully'
          }));

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            message: 'Internal server error'
          }));

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // =====================
// GET EXIT QUESTIONNAIRE RESPONSES
// =====================


var getExitResponses = function getExitResponses(req, res) {
  var responses;
  return regeneratorRuntime.async(function getExitResponses$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(ExitResponse.find());

        case 4:
          responses = _context3.sent;
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](1);
          responses = memoryStore.exitResponses;

        case 10:
          return _context3.abrupt("return", res.status(200).json({
            responses: responses
          }));

        case 13:
          _context3.prev = 13;
          _context3.t1 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).json({
            message: 'Internal server error'
          }));

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13], [1, 7]]);
};

module.exports = {
  getAllResignations: getAllResignations,
  concludeResignation: concludeResignation,
  getExitResponses: getExitResponses
};
//# sourceMappingURL=admin.controller.dev.js.map
