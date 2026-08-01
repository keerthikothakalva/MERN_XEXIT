"use strict";

var mongoose = require('mongoose');

var resignSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  lwd: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    "default": ''
  },
  status: {
    type: String,
    "enum": ['pending', 'approved', 'rejected'],
    "default": 'pending'
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('ResignInfo', resignSchema);
//# sourceMappingURL=resign.model.dev.js.map
