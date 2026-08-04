const Employee = require('../models/employee.model');
const ResignInfo = require('../models/resign.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class EmployeeLogics {

async ensureAdminExists() {
  const admin = await Employee.findOne({
    username: 'admin'
  });

  if (!admin) {
    const hashedPassword = await bcrypt.hash(
      'admin',
      10
    );

    await Employee.create({
      username: 'admin',
      email: 'admin@xexit.com',
      password: hashedPassword,
      role: 'hr'
    });
  }
}
async registerUser(payload) {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    10
  );

  return Employee.create({
    username: payload.username,
    email: payload.email || null,
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
      status:

        payload.approved
          ? 'approved'
          : 'rejected',

      exitDate:
        payload.exitDate
    },

    {
      new: true,
      runValidators: true
    }

  );

}
}

module.exports = EmployeeLogics;