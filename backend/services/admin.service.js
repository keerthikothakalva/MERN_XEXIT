const jwt = require('jsonwebtoken');
const ResignInfo = require('../models/resign.model');
const ExitResponse = require('../models/exitResponse.model');

class AdminService {

  // =====================
  // VERIFY ADMIN TOKEN
  // =====================
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return null;
    }
  }

  // =====================
  // GET ALL RESIGNATIONS
  // =====================
  async getAllResignations() {
  const resignations = await ResignInfo.find()
    .populate('employeeId');

  console.log(
    'ADMIN: Total resignations found:',
    resignations.length
  );

  console.log(
    'ADMIN: Resignations:',
    resignations
  );

  return resignations;
}

  // =====================
  // CONCLUDE RESIGNATION
  // =====================
  async concludeResignation(resignationId, approved, lwd) {
    if (!resignationId) return null;

    return await ResignInfo.findByIdAndUpdate(
      resignationId,
      {
        status: approved ? 'approved' : 'rejected',
        lwd
      },
      { new: true }
    );
  }

  // =====================
  // GET ALL EXIT RESPONSES
  // =====================
  async getAllExitResponses() {
    return await ExitResponse.find().populate('employeeId');
  }
}

module.exports = AdminService;
