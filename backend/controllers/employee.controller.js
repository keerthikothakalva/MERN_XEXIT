const employeeLogics = require('../services/employee.service.js');
const allEmployeeLogics = new employeeLogics();
const mongoose = require('mongoose');
const memoryStore = require('../utils/memoryStore');
const axios = require('axios');
const ExitResponse = require(
  '../models/exitResponse.model'
);
const ResignInfo = require(
  '../models/resign.model'
);

const isDBConnected = () => mongoose.connection.readyState === 1;

// =====================
// LWD VALIDATION
// =====================

const validateLastWorkingDay =
  async (lwd) => {

    const selectedDate =
      new Date(`${lwd}T00:00:00`);

    // Check invalid date
    if (
      Number.isNaN(
        selectedDate.getTime()
      )
    ) {
      return {
        valid: false,
        message:
          'Please select a valid date'
      };
    }

    // Check Saturday and Sunday
    const day =
      selectedDate.getDay();

    if (
      day === 0 ||
      day === 6
    ) {
      return {
        valid: false,
        message:
          'Last working day cannot be Saturday or Sunday'
      };
    }

    try {

      const year =
        selectedDate.getFullYear();

      const month =
        selectedDate.getMonth() + 1;

      const date =
        selectedDate.getDate();

      const response =
        await axios.get(
          'https://calendarific.com/api/v2/holidays',
          {
            params: {
              api_key:
                process.env
                  .CALENDARIFIC_API_KEY,

              country:
                'IN',

              year,

              month,

              day:
                date
            }
          }
        );

      const holidays =
        response.data
          ?.response
          ?.holidays || [];

      if (
        holidays.length > 0
      ) {
        return {
          valid: false,

          message:
            `Last working day cannot be a public holiday: ${holidays[0].name}`
        };
      }

      return {
        valid: true
      };

    } catch (error) {

      console.error(
        'CALENDARIFIC ERROR:',
        error.response?.data ||
        error.message
      );

      return {
        valid: false,

        message:
          'Unable to validate the selected date'
      };

    }

  };
const registerNewUser = async (req, res) => {
  try {

    const {
      username,
      email,
      password
    } = req.body || {};


    // Email is optional for now
    // so existing Cypress tests remain compatible.

    if (!username || !password) {

      return res.status(400).send({

        message:
          'Username and password required'

      });

    }


    // =====================
    // MEMORY STORE
    // =====================

    if (!isDBConnected()) {

      const exists =
        memoryStore.users.find(

          (user) =>
            user.username === username

        );


      if (exists) {

        return res.status(400).json({

          message:
            'User already exists'

        });

      }


      memoryStore.users.push({

        username,

        email:
          email || null,

        password,

        role:
          'employee'

      });


      return res.status(201).send({

        message:
          'User registered successfully'

      });

    }


    // =====================
    // MONGODB
    // =====================

    const existingUser =
      await allEmployeeLogics
        .getUserByName(

          username

        );


    if (existingUser) {

      return res.status(400).send({

        message:
          'User already exists'

        });

    }


    await allEmployeeLogics
      .registerUser({

        username,

        email:
          email || null,

        password,

        role:
          username === 'admin'
            ? 'admin'
            : 'employee'

      });


    return res.status(201).send({

      message:
        'User registered successfully'

    });


  } catch (err) {

    console.error(

      'REGISTER ERROR:',

      err

    );


    return res.status(500).send({

      message:
        err.message

    });

  }

};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    await allEmployeeLogics.ensureAdminExists();

    const user =
      await allEmployeeLogics.getUserByName(
        username
      );

    if (!user) {
      return res.status(401).send({
        message: 'Invalid credentials'
      });
    }

    const isValid =
      await allEmployeeLogics.validatePassword(
        password,
        user.password
      );

    if (!isValid) {
      return res.status(401).send({
        message: 'Invalid credentials'
      });
    }

    const token =
      allEmployeeLogics.createToken({
        id: user._id,
        role: user.role
      });

    return res.status(200).send({
      message: 'Login successful',
      token,
      role: user.role
    });

  } catch (err) {
    console.error(
      'Login error:',
      err
    );

    return res.status(500).send({
      message: err.message
    });
  }
};

const newUserResign = async (req, res) => {
  try {
    const { lwd, reason } = req.body;

    if (!lwd) {
      return res.status(400).send({
        message: 'Last working day is required'
      });
    }
    const validation =
  await validateLastWorkingDay(lwd);

if (!validation.valid) {
  return res.status(400).send({
    message:
      validation.message
  });
}
    const employeeId =
      req.user._id ||
      req.user.id;

    const resignation =
      await allEmployeeLogics
        .addResignOfEmployee({
          employeeId,
          lwd,
          reason,
          status: 'pending'
        });

    console.log(
      'RESIGNATION SAVED:',
      resignation
    );

    return res.status(200).send({
      message:
        'Resignation submitted successfully',

      data: {
        resignation
      }
    });

  } catch (err) {

    console.error(
      'RESIGNATION ERROR:',
      err
    );

    return res.status(500).send({
      message:
        err.message
    });

  }
};

const submitExitResponses = async (
  req,
  res
) => {

  try {

    const employeeId =
      req.user?._id ||
      req.user?.id;

    console.log(
      'EMPLOYEE ID:',
      employeeId
    );

    const existingResponse =
      await ExitResponse.findOne({
        employeeId
      });

    if (existingResponse) {

      console.log(
        'INTERVIEW ALREADY EXISTS'
      );

      return res.status(400).send({
        message:
          'Exit interview already submitted'
      });

    }

    const exitResponse =
      await ExitResponse.create({
        employeeId,
        responses:
          req.body.responses
      });

    console.log(
      'EXIT RESPONSE CREATED:',
      exitResponse
    );

    const updatedResignation =
      await ResignInfo.findOneAndUpdate(
        {
          employeeId
        },
        {
          $set: {
            exitInterviewStatus:
              'completed'
          }
        },
        {
          new: true
        }
      );

    console.log(
      'UPDATED RESIGNATION:',
      updatedResignation
    );

    if (!updatedResignation) {

      return res.status(404).send({
        message:
          'Resignation not found'
      });

    }

    return res.status(200).send({
      message:
        'Exit interview submitted successfully',

      data: {
        exitResponse,
        resignation:
          updatedResignation
      }
    });

  } catch (error) {

    console.error(
      'EXIT SUBMISSION ERROR:',
      error
    );

    return res.status(500).send({
      message:
        error.message
    });

  }

};

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

const getMyResignation = async (req, res) => {
  try {
    const resignation =
      await allEmployeeLogics.findResignData(
        req.user._id
      );

    return res.status(200).send({
      data: resignation
    });

  } catch (err) {
    return res.status(500).send({
      message: err.message
    });
  }
}; 

module.exports = {
  registerNewUser,
  loginUser,
  newUserResign,
  submitExitResponses,
  deleteResign,
  getMyResignation
};
