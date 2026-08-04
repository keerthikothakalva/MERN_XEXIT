const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: null
    },
    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ['employee', 'hr'],
      default: 'employee'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);
