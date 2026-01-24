const employeeLogics = require('../services/employee.service.js');
const allEmployeeLogics = new employeeLogics();
const mongoose = require('mongoose');
const memoryStore = require('../utils/memoryStore');

const isDBConnected = () => mongoose.connection.readyState === 1;


// =====================
// REGISTER
// =====================
const registerNewUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    
    if (!isDBConnected()) {
  const resignation = {
    _id: Date.now().toString(),
    employeeId: memoryStore.users[0]?._id,
    lwd,
    status: 'pending'
  };

  memoryStore.employees.push(resignation);

  return res.status(200).send({
    data: {
      resignation: {
        _id: resignation._id
      }
    }
  });
}

    
    const existingUser = await allEmployeeLogics.getUserByName(username);
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    await allEmployeeLogics.registerUser({
      username,
      password,
      role: 'employee'
    });

    return res.status(201).send({ message: 'User registered successfully' });
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

    // ✅ MEMORY MODE
    if (!isDBConnected()) {
      const user = memoryStore.users.find(
        u => u.username === username && u.password === password
      );

      if (!user) {
        return res.status(401).send({ message: 'Invalid credentials' });
      }

      return res.status(200).send({
        message: 'Login successful',
        token: 'dummy-token',
        role: user.role
      });
    }

    // ✅ DB MODE
    const user = await allEmployeeLogics.getUserByName(username);
    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const isValid = await allEmployeeLogics.validatePassword(
      password,
      user.password
    );

    if (!isValid) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const token = allEmployeeLogics.createToken({
      id: user._id,
      role: user.role
    });

    return res.status(200).send({
      message: 'Login successful',
      token,
      role: user.role
    });
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

    // ✅ MEMORY MODE
    if (!isDBConnected()) {
      const resignation = {
        _id: Date.now().toString(),
        employeeId: req.user?.id || 'memory-user',
        lwd,
        status: 'pending'
      };

      memoryStore.employees.push(resignation);

      return res.status(200).send({
        data: { resignation: { _id: resignation._id } }
      });
    }

    // ✅ DB MODE
    const resignation = await allEmployeeLogics.addResignOfEmployee({
      employeeId: req.user._id,
      lwd,
      status: 'pending'
    });

    return res.status(200).send({
      data: { resignation: { _id: resignation._id } }
    });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};


// =====================
// SUBMIT EXIT RESPONSES
// =====================
const submitExitResponses = async (req, res) => {
  try {
    const { responses } = req.body;

    if (!responses || !Array.isArray(responses)) {
      return res.status(400).send({ message: 'Invalid responses' });
    }

    return res.status(200).send({
      message: 'Exit questionnaire submitted successfully'
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
      message: 'Resignation deleted successfully'
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
