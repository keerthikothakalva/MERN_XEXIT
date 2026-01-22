"use strict";

var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    "enum": ['employee', 'admin'],
    "default": 'employee'
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Employee', employeeSchema);
//# sourceMappingURL=employee.model.dev.js.map
