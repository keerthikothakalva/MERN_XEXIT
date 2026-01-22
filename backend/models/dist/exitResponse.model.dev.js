"use strict";

var mongoose = require('mongoose');

var exitResponseSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  responses: [{
    questionText: String,
    response: String
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model('ExitResponse', exitResponseSchema);
//# sourceMappingURL=exitResponse.model.dev.js.map
