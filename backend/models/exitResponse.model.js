const mongoose = require('mongoose');

const exitResponseSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    responses: [
      {
        questionText: String,
        response: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('ExitResponse', exitResponseSchema);
