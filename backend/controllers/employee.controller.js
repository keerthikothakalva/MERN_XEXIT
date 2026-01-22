const employeeLogics = require('../services/employee.service.js');
const ExitResponse = require("../models/exitResponse.model");
const allEmployeeLogics = new employeeLogics();

// =====================
// REGISTER
// =====================
const registerNewUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await allEmployeeLogics.getUserByName(username);
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    await allEmployeeLogics.registerUser({ username, password });

    return res.status(201).send({
      message: 'User registered successfully'
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// =====================
// LOGIN
// =====================
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await allEmployeeLogics.getUserByName(username);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isValid = await allEmployeeLogics.validatePassword(
      password,
      user.password
    );

    if (!isValid) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    const token = allEmployeeLogics.createToken({ id: user._id });

    return res.status(200).send({ token });
  } catch (err) {
    return res.status(500).send({ message: err.message });
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

    return res.status(200).send({
      data: {
        resignation: {
          _id: resignation._id
        }
      }
    });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

// =====================
// SUBMIT EXIT QUESTIONNAIRE
// =====================
const submitExitResponses = async (req, res) => {
  try {
    const { responses } = req.body;

    const saved = await ExitResponse.create({
      employeeId: req.user._id,
      responses
    });

    return res.status(200).send({
      data: saved
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
// =====================
// DELETE RESIGNATION
// =====================
const deleteResign = async (req, res) => {
  try {
    await allEmployeeLogics.deleteResignData(req.user._id);

    return res.status(200).send({
      message: 'Resignation deleted'
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  registerNewUser,
  loginUser,
  newUserResign,
  submitExitResponses,
  deleteResign
};
