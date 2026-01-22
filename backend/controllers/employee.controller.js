
const employeeLogics = require('../services/employee.service.js');
const ExitResponse = require("../models/exitResponse.model");
const memoryStore = require('../utils/memoryStore');

const allEmployeeLogics = new employeeLogics();

// =====================
// REGISTER EMPLOYEE
// =====================
const registerNewUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await allEmployeeLogics.getUserByName(username);
    if (existingUser) {
      return res.status(400).json({
        message: 'Employee already exists'
      });
    }

    await allEmployeeLogics.registerUser({
      username,
      password,
      role: 'employee'
    });

    return res.status(201).json({
      message: 'Employee registered successfully'
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// =====================
// LOGIN (EMPLOYEE / ADMIN)
// =====================
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await allEmployeeLogics.getUserByName(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await allEmployeeLogics.validatePassword(
      password,
      user.password
    );

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = allEmployeeLogics.createToken({
      id: user._id,
      role: user.role
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// =====================
// SUBMIT RESIGNATION
// =====================
const newUserResign = async (req, res) => {
  try {
    const { lwd } = req.body;

    const resignation = await allEmployeeLogics.addResignOfEmployee({
      employeeId: req.user._id,
      lwd,
      status: 'pending'
    });

    return res.status(201).json({
      message: 'Resignation submitted successfully',
      data: {
        resignationId: resignation._id
      }
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// =====================
// SUBMIT EXIT QUESTIONNAIRE
// =====================
const submitExitResponses = async (req, res) => {
  try {
    const { responses } = req.body;

    const payload = {
      employeeId: req.user._id,
      responses
    };

    try {
      await ExitResponse.create(payload);
    } catch {
      memoryStore.exitResponses.push(payload);
    }

    return res.status(200).json({
      message: 'Exit questionnaire submitted successfully'
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// =====================
// DELETE RESIGNATION
// =====================
const deleteResign = async (req, res) => {
  try {
    await allEmployeeLogics.deleteResignData(req.user._id);

    return res.status(200).json({
      message: 'Resignation deleted successfully'
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  registerNewUser,
  loginUser,
  newUserResign,
  submitExitResponses,
  deleteResign
};

