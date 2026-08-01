const Employee = require('../models/employee.model');
const ResignInfo = require('../models/resign.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class EmployeeLogics {

  // ---------- AUTH ----------

  async ensureAdminExists() {
    const admin = await Employee.findOne({
      username: 'admin'
    });

    const hashedPassword = await bcrypt.hash('admin', 10);

    if (!admin) {
      await Employee.create({
        username: 'admin',
        password: hashedPassword,
        role: 'admin'
      });
    } else {
      admin.password = hashedPassword;
      admin.role = 'admin';

      await admin.save();
    }
  }

  async registerUser(payload) {
    await this.ensureAdminExists();

    const hashedPassword = await bcrypt.hash(
      payload.password,
      10
    );

    return Employee.create({
      username: payload.username,
      password: hashedPassword,
      role: 'employee'
    });
  }

  getUserByName(username) {
    return Employee.findOne({ username });
  }

  validatePassword(text, hashedPassword) {
    return bcrypt.compare(text, hashedPassword);
  }

  createToken(payload) {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );
  }

  compareToken(token) {
    return jwt.verify(
      token,
      process.env.JWT_SECRET
    );
  }

  findUserById(id) {
    return Employee.findById(id);
  }

  // ---------- RESIGNATION ----------

  addResignOfEmployee(payload) {
  return ResignInfo.create({
    employeeId: payload.employeeId,
    lwd: payload.lwd,
    reason: payload.reason || '',
    status: 'pending'
  });
}

  findResignData(employeeId) {
    return ResignInfo.findOne({
      employeeId
    });
  }

  deleteResignData(employeeId) {
    return ResignInfo.findOneAndDelete({
      employeeId
    });
  }

  modifyResignation(payload) {
    return ResignInfo.findByIdAndUpdate(
      payload.resignationId,
      {
        status: payload.approved
          ? 'approved'
          : 'rejected',

        lwd: payload.lwd
      },
      {
        new: true
      }
    );
  }
}

module.exports = EmployeeLogics;