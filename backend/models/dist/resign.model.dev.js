"use strict";

var mongoose = require('mongoose');

var resignSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  // Cypress sends LWD as STRING: "YYYY-MM-DD"
  lwd: {
    type: String,
    required: true
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
