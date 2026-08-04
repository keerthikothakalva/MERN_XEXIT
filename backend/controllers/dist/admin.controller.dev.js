"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var AdminLogics = require('../services/admin.service');

var adminLogics = new AdminLogics();

var mongoose = require('mongoose');

var memoryStore = require('../utils/memoryStore');

var _require = require('../services/email.service'),
    sendResignationEmail = _require.sendResignationEmail;

var isDBConnected = function isDBConnected() {
  return mongoose.connection.readyState === 1;
};

var getAllResignations = function getAllResignations(req, res) {
  var resignations;
  return regeneratorRuntime.async(function getAllResignations$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (isDBConnected()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(200).send({
            data: memoryStore.employees || []
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(adminLogics.getAllResignations());

        case 5:
          resignations = _context.sent;
          return _context.abrupt("return", res.status(200).send({
            data: resignations || []
          }));

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error('GET RESIGNATIONS ERROR:', _context.t0);
          return _context.abrupt("return", res.status(500).send({
            message: _context.t0.message
          }));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var getRecentResignations = function getRecentResignations(req, res) {
  var _recentRequests, recentRequests;

  return regeneratorRuntime.async(function getRecentResignations$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;

          if (isDBConnected()) {
            _context2.next = 4;
            break;
          }

          _recentRequests = _toConsumableArray(memoryStore.employees || []).sort(function (a, b) {
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
          }).slice(0, 5);
          return _context2.abrupt("return", res.status(200).send({
            data: _recentRequests
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(adminLogics.getRecentResignations());

        case 6:
          recentRequests = _context2.sent;
          return _context2.abrupt("return", res.status(200).send({
            data: recentRequests || []
          }));

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error('GET RECENT RESIGNATIONS ERROR:', _context2.t0);
          return _context2.abrupt("return", res.status(500).send({
            message: _context2.t0.message
          }));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var concludeResignation = function concludeResignation(req, res) {
  var _req$body, resignationId, approved, exitDate, resignation, employee;

  return regeneratorRuntime.async(function concludeResignation$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, resignationId = _req$body.resignationId, approved = _req$body.approved, exitDate = _req$body.exitDate;

          if (resignationId) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'Resignation ID is required'
          }));

        case 4:
          if (!(typeof approved !== 'boolean')) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'Approval status is required'
          }));

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(adminLogics.concludeResignation(resignationId, approved, exitDate || null));

        case 8:
          resignation = _context3.sent;

          if (resignation) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Resignation request not found'
          }));

        case 11:
          _context3.prev = 11;
          _context3.next = 14;
          return regeneratorRuntime.awrap(resignation.populate('employeeId'));

        case 14:
          employee = _context3.sent;

          if (!(employee.employeeId && employee.employeeId.email)) {
            _context3.next = 20;
            break;
          }

          _context3.next = 18;
          return regeneratorRuntime.awrap(sendResignationEmail({
            employeeEmail: employee.employeeId.email,
            employeeName: employee.employeeId.username,
            approved: approved,
            exitDate: approved ? exitDate : null
          }));

        case 18:
          _context3.next = 21;
          break;

        case 20:
          console.log('EMAIL NOT SENT: Employee email is missing');

        case 21:
          _context3.next = 26;
          break;

        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](11);
          console.error('EMAIL ERROR:', _context3.t0.message);

        case 26:
          return _context3.abrupt("return", res.status(200).json({
            message: approved ? 'Resignation approved successfully' : 'Resignation rejected successfully',
            data: resignation
          }));

        case 29:
          _context3.prev = 29;
          _context3.t1 = _context3["catch"](0);
          console.error('CONCLUDE RESIGNATION ERROR:', _context3.t1);
          return _context3.abrupt("return", res.status(500).json({
            message: 'Unable to update resignation'
          }));

        case 33:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 29], [11, 23]]);
};

var getExitResponses = function getExitResponses(req, res) {
  var exitResponses;
  return regeneratorRuntime.async(function getExitResponses$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;

          if (isDBConnected()) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(200).send({
            data: memoryStore.exitResponses || []
          }));

        case 3:
          _context4.next = 5;
          return regeneratorRuntime.awrap(adminLogics.getAllExitResponses());

        case 5:
          exitResponses = _context4.sent;
          return _context4.abrupt("return", res.status(200).send({
            data: exitResponses || []
          }));

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error('GET EXIT RESPONSES ERROR:', _context4.t0);
          return _context4.abrupt("return", res.status(500).send({
            message: _context4.t0.message
          }));

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports = {
  getAllResignations: getAllResignations,
  getRecentResignations: getRecentResignations,
  concludeResignation: concludeResignation,
  getExitResponses: getExitResponses
};
//# sourceMappingURL=admin.controller.dev.js.map
