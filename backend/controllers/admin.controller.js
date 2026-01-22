const ResignInfo = require('../models/resign.model');
const ExitResponse = require("../models/exitResponse.model");
const memoryStore = require('../utils/memoryStore');

// =====================
// GET ALL RESIGNATIONS
// =====================
const getAllResignations = async (req, res) => {
  try {
    const resignations = await ResignInfo.find();

    return res.status(200).json(
      resignations.map(r => ({
        _id: r._id,
        employeeId: r.employeeId || r.empId,
        lwd: r.lwd,
        status: r.status
      }))
    );
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// =====================
// APPROVE / REJECT RESIGNATION
// =====================
const concludeResignation = async (req, res) => {
  try {
    const { resignationId, approved, lwd } = req.body;

    await ResignInfo.findByIdAndUpdate(resignationId, {
      status: approved ? 'approved' : 'rejected',
      ...(approved && lwd && { lwd })
    });

    return res.status(201).json({
      message: 'Resignation approved successfully'
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// =====================
// GET EXIT QUESTIONNAIRE RESPONSES
// =====================
const getExitResponses = async (req, res) => {
  try {
    let responses;

    try {
      responses = await ExitResponse.find();
    } catch {
      responses = memoryStore.exitResponses;
    }

    return res.status(200).json({
      responses
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllResignations,
  concludeResignation,
  getExitResponses
};