"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.submitExitInterview = exports.submitResignation = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = _axios["default"].create({
  baseURL: 'http://localhost:8080',
  timeout: 1000
});

var submitResignation = function submitResignation(data) {
  return api.post('/api/resignation', data);
};

exports.submitResignation = submitResignation;

var submitExitInterview = function submitExitInterview(data) {
  return api.post('/api/exit-interview', data);
};

exports.submitExitInterview = submitExitInterview;
var _default = api;
exports["default"] = _default;
//# sourceMappingURL=api.dev.js.map
