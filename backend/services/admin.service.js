const jwt = require('jsonwebtoken');
const Resign = require('../models/resign.model');
const ExitResponse = require('../models/exitResponse.model');

class AdminService {
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.SECREATE_KEY);
    } catch (err) {
      return null;
    }
  }

  // =====================
  // GET ALL RESIGNATIONS
  // =====================
  async getAllResignations() {
    return await Resign.find();
  }

  // =====================
  // UPDATE RESIGNATION
  // =====================
  async updateResignationStatus(resignationId, status) {
    return await Resign.findByIdAndUpdate(
      resignationId,
      { status },
      { new: true }
    );
  }

  // 🔥 REQUIRED BY CYPRESS
  async concludeResignation(resignationId, approved, lwd) {
    return await Resign.findByIdAndUpdate(
      resignationId,
      {
        status: approved ? 'Approved' : 'Rejected',
        lwd
      },
      { new: true }
    );
  }

  // =====================
  // GET EXIT RESPONSES
  // =====================
  async getAllExitResponses() {
    return await ExitResponse.find();
  }
}

module.exports = AdminService;
