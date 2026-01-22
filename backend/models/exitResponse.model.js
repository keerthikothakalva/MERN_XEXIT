const mongoose = require('mongoose');

const exitResponseSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    responses: {
      type: [
        {
          questionText: {
            type: String,
            required: true,
            trim: true
          },
          response: {
            type: String,
            required: true,
            trim: true
          }
        }
      ],
      required: true,
      validate: [
        arr => arr.length > 0,
        'At least one exit response is required'
      ]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ExitResponse', exitResponseSchema);
