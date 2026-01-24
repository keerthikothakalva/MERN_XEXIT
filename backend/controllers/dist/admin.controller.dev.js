"use strict";

var AdminLogics = require('../services/admin.service');

var adminLogics = new AdminLogics();

var mongoose = require('mongoose');

var memoryStore = require('../utils/memoryStore');

var isDBConnected = function isDBConnected() {
  return mongoose.connection.readyState === 1;
}; // =====================
// GET ALL RESIGNATIONS
// =====================


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
            data: memoryStore.employees
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
          return _context.abrupt("return", res.status(500).send({
            message: _context.t0.message
          }));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // =====================
// CONCLUDE RESIGNATION
// =====================


var concludeResignation = function concludeResignation(req, res) {
  var _req$body, resignationId, approved, resign, updated;

  return regeneratorRuntime.async(function concludeResignation$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, resignationId = _req$body.resignationId, approved = _req$body.approved;

          if (!(!resignationId || approved === undefined)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).send({
            message: 'Invalid request'
          }));

        case 4:
          if (isDBConnected()) {
            _context2.next = 10;
            break;
          }

          resign = memoryStore.employees.find(function (r) {
            return r._id === resignationId;
          });

          if (resign) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(404).send({
            message: 'Resignation not found'
          }));

        case 8:
          resign.status = approved ? 'approved' : 'rejected';
          return _context2.abrupt("return", res.status(200).send({
            message: 'Resignation updated successfully'
          }));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(adminLogics.concludeResignation(resignationId, approved));

        case 12:
          updated = _context2.sent;

          if (updated) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(404).send({
            message: 'Resignation not found'
          }));

        case 15:
          return _context2.abrupt("return", res.status(200).send({
            message: 'Resignation updated successfully'
          }));

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).send({
            message: _context2.t0.message
          }));

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 18]]);
}; // =====================
// GET EXIT RESPONSES
// =====================


var getExitResponses = function getExitResponses(req, res) {
  var responses;
  return regeneratorRuntime.async(function getExitResponses$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(adminLogics.getAllExitResponses());

        case 3:
          responses = _context3.sent;
          return _context3.abrupt("return", res.status(200).send({
            data: responses || []
          }));

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).send({
            message: _context3.t0.message
          }));

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = {
  getAllResignations: getAllResignations,
  concludeResignation: concludeResignation,
  getExitResponses: getExitResponses
};
//# sourceMappingURL=admin.controller.dev.js.map
