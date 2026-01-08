const Employee = require('../models/employee.model');
const ResignInfo = require('../models/resign.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class EmployeeLogics {
    async registerUser(payload) {
        const hashedPassword = await this.hashPassword(payload.password);
        return Employee.create({ ...payload, password: hashedPassword });
    }

    hashPassword(password) {
        return bcrypt.hash(password, 10);
    }

    validatePassword(text, password) {
        return bcrypt.compare(text, password);
    }

    getUserByName(name) {
        return Employee.findOne({ username: name });
    }

    createToken(payload) {
        return jwt.sign(payload, process.env.SECREATE_KEY);
    }

    compareToken(token) {
        return jwt.verify(token, process.env.SECREATE_KEY);
    }

    addResignOfEmployee(payload) {
        return ResignInfo.create(payload);
    }

    findUserById(id) {
        return Employee.findById(id);
    }

    findResignData(id) {
        return ResignInfo.findOne({ empId: id });
    }

    deleteResignData(id) {
        return ResignInfo.findOneAndDelete({ empId: id });
    }

    modifyResignation(payload) {
        return ResignInfo.findOneAndUpdate(
            { _id: payload.resignationId },
            { $set: { status: payload.approved } },
            { new: true }
        );
    }
}

module.exports = EmployeeLogics;
