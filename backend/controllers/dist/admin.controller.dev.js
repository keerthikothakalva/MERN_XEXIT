"use strict";

var Employee = require('../models/employee.model');

var ResignInfo = require('../models/resign.model');

var ExitResponse = require("../models/exitResponse.model"); // =====================
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
          return _context.abrupt("return", res.status(200).send({
            data: resignations.map(function (r) {
              return {
                _id: r._id,
                empId: r.empId,
                lwd: r.lwd,
                status: r.status
              };
            })
          }));

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).send({
            message: _context.t0.message
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
  var _req$body, resignationId, approved, lwd, updatePayload;

  return regeneratorRuntime.async(function concludeResignation$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, resignationId = _req$body.resignationId, approved = _req$body.approved, lwd = _req$body.lwd;
          updatePayload = {
            status: approved ? 'approved' : 'rejected'
          };

          if (approved && lwd) {
            updatePayload.lwd = lwd;
          }

          _context2.next = 6;
          return regeneratorRuntime.awrap(ResignInfo.findByIdAndUpdate(resignationId, updatePayload));

        case 6:
          return _context2.abrupt("return", res.status(200).send({
            message: 'Resignation updated successfully'
          }));

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).send({
            message: _context2.t0.message
          }));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // =====================
// GET EXIT QUESTIONNAIRE RESPONSES
// =====================


var memoryStore = require('../utils/memoryStore');

var getExitResponses = function getExitResponses(req, res) {
  var responses;
  return regeneratorRuntime.async(function getExitResponses$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          responses = [];
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(ExitResponse.find());

        case 5:
          responses = _context3.sent;
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](2);
          responses = memoryStore.exitResponses;

        case 11:
          return _context3.abrupt("return", res.status(200).send({
            data: responses
          }));

        case 14:
          _context3.prev = 14;
          _context3.t1 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).send({
            message: _context3.t1.message
          }));

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 14], [2, 8]]);
};

module.exports = {
  getAllResignations: getAllResignations,
  concludeResignation: concludeResignation,
  getExitResponses: getExitResponses
};
//# sourceMappingURL=admin.controller.dev.js.map
