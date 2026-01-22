"use strict";

var employeeLogics = require('../services/employee.service.js');

var ExitResponse = require("../models/exitResponse.model");

var allEmployeeLogics = new employeeLogics(); // =====================
// REGISTER
// =====================

var registerNewUser = function registerNewUser(req, res) {
  var _req$body, username, password, existingUser;

  return regeneratorRuntime.async(function registerNewUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(allEmployeeLogics.getUserByName(username));

        case 4:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            message: 'User already exists'
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(allEmployeeLogics.registerUser({
            username: username,
            password: password
          }));

        case 9:
          return _context.abrupt("return", res.status(201).send({
            message: 'User registered successfully'
          }));

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).send({
            message: _context.t0.message
          }));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}; // =====================
// LOGIN
// =====================


var loginUser = function loginUser(req, res) {
  var _req$body2, username, password, user, isValid, token;

  return regeneratorRuntime.async(function loginUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(allEmployeeLogics.getUserByName(username));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).send({
            message: 'User not found'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(allEmployeeLogics.validatePassword(password, user.password));

        case 9:
          isValid = _context2.sent;

          if (isValid) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(401).send({
            message: 'Invalid password'
          }));

        case 12:
          token = allEmployeeLogics.createToken({
            id: user._id
          });
          return _context2.abrupt("return", res.status(200).send({
            token: token
          }));

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).send({
            message: _context2.t0.message
          }));

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
}; // =====================
// SUBMIT RESIGNATION
// =====================


var newUserResign = function newUserResign(req, res) {
  var lwd, resignation;
  return regeneratorRuntime.async(function newUserResign$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          lwd = req.body.lwd;
          _context3.next = 4;
          return regeneratorRuntime.awrap(allEmployeeLogics.addResignOfEmployee({
            employeeId: req.user._id,
            lwd: lwd,
            status: 'pending'
          }));

        case 4:
          resignation = _context3.sent;
          return _context3.abrupt("return", res.status(200).send({
            data: {
              resignation: {
                _id: resignation._id
              }
            }
          }));

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(400).send({
            message: _context3.t0.message
          }));

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // =====================
// SUBMIT EXIT QUESTIONNAIRE
// =====================


var submitExitResponses = function submitExitResponses(req, res) {
  var responses, saved;
  return regeneratorRuntime.async(function submitExitResponses$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          responses = req.body.responses;
          _context4.next = 4;
          return regeneratorRuntime.awrap(ExitResponse.create({
            employeeId: req.user._id,
            responses: responses
          }));

        case 4:
          saved = _context4.sent;
          return _context4.abrupt("return", res.status(200).send({
            data: saved
          }));

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(500).send({
            message: _context4.t0.message
          }));

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // =====================
// DELETE RESIGNATION
// =====================


var deleteResign = function deleteResign(req, res) {
  return regeneratorRuntime.async(function deleteResign$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(allEmployeeLogics.deleteResignData(req.user._id));

        case 3:
          return _context5.abrupt("return", res.status(200).send({
            message: 'Resignation deleted'
          }));

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(500).send({
            message: _context5.t0.message
          }));

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

module.exports = {
  registerNewUser: registerNewUser,
  loginUser: loginUser,
  newUserResign: newUserResign,
  submitExitResponses: submitExitResponses,
  deleteResign: deleteResign
};
//# sourceMappingURL=employee.controller.dev.js.map
