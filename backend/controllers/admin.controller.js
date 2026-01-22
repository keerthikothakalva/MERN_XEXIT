const Employee = require('../models/employee.model');
const ResignInfo = require('../models/resign.model');
const ExitResponse = require("../models/exitResponse.model");

// =====================
// GET ALL RESIGNATIONS
// =====================
const getAllResignations = async (req, res) => {
  try {
    const resignations = await ResignInfo.find();

    return res.status(200).send({
      data: resignations.map(r => ({
        _id: r._id,
        empId: r.empId,
        lwd: r.lwd,
        status: r.status
      }))
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// =====================
// APPROVE / REJECT RESIGNATION
// =====================
const concludeResignation = async (req, res) => {
  try {
    const { resignationId, approved, lwd } = req.body;

    const updatePayload = {
      status: approved ? 'approved' : 'rejected'
    };

    if (approved && lwd) {
      updatePayload.lwd = lwd;
    }

    await ResignInfo.findByIdAndUpdate(resignationId, updatePayload);

    return res.status(200).send({
      message: 'Resignation updated successfully'
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// =====================
// GET EXIT QUESTIONNAIRE RESPONSES
// =====================
const memoryStore = require('../utils/memoryStore');

const getExitResponses = async (req, res) => {
  try {
    let responses = [];

    try {
      responses = await ExitResponse.find();
    } catch (dbErr) {
      responses = memoryStore.exitResponses;
    }

    return res.status(200).send({
      data: responses
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};


module.exports = {
  getAllResignations,
  concludeResignation,
  getExitResponses
};

