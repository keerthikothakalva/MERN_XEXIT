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
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).send({
        message: "username and password required"
      });
    }

    
    if (!isDBConnected()) {
      const exists = memoryStore.users.find(u => u.username === username);
      if (exists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      memoryStore.users.push({ username, password, role: 'employee' });
      return res.status(201).send({ message: 'User registered successfully' });
    }

    
    const existingUser = await allEmployeeLogics.getUserByName(username);
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    await allEmployeeLogics.registerUser({
  username,
  password,
  role: username === 'admin' ? 'HR' : 'employee'
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

    if (!isDBConnected()) {
      
    }

    
    await allEmployeeLogics.ensureAdminExists();

    const user = await allEmployeeLogics.getUserByName(username);

    if (!user) {
      return res.status(401).send({
        message: 'Invalid credentials'
      });
    }

    const isValid = await allEmployeeLogics.validatePassword(
      password,
      user.password
    );

    if (!isValid) {
      return res.status(401).send({
        message: 'Invalid credentials'
      });
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
    console.error('Login error:', err);

    return res.status(500).send({
      message: err.message
    });
  }
};
// =====================
// SUBMIT RESIGNATION
// =====================
const newUserResign = async (req, res) => {
  try {
    const { lwd } = req.body;

    console.log('DB CONNECTED:', isDBConnected());
    console.log('REQ USER:', req.user);
    console.log('LWD:', lwd);

    const resignation = await allEmployeeLogics.addResignOfEmployee({
      employeeId: req.user._id || req.user.id,
      lwd,
      status: 'pending'
    });

    console.log('SAVED RESIGNATION:', resignation);

    return res.status(200).send({
      data: {
        resignation: {
          _id: resignation._id
        }
      }
    });

  } catch (err) {
    console.error('RESIGN ERROR:', err);

    return res.status(400).send({
      message: err.message
    });
  }
};

// =====================
// SUBMIT EXIT RESPONSES
// =====================
const submitExitResponses = async (req, res) => {
  try {
    const response = {
      employeeId: req.user?.id || 'memory-user',
      responses: req.body.responses,  
      submittedAt: new Date()
    };

    
    memoryStore.exitResponses.push(response);

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
