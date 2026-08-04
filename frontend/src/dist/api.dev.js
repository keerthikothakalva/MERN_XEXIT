"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = _axios["default"].create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(function (config) {
  var token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = "Bearer ".concat(token);
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});
var _default = api;
exports["default"] = _default;
//# sourceMappingURL=api.dev.js.map
