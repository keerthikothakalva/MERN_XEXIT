const AdminLogics = require('../services/admin.service');
const adminLogics = new AdminLogics();

// =====================
// GET ALL RESIGNATIONS
// =====================
const getAllResignations = async (req, res) => {
  try {
    const resignations = await adminLogics.getAllResignations();

    return res.status(200).send({
      data: resignations || []
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// =====================
// CONCLUDE RESIGNATION
// =====================
const concludeResignation = async (req, res) => {
  try {
    const { resignationId, approved, lwd } = req.body;

    if (!resignationId || approved === undefined) {
      return res.status(400).send({ message: 'Invalid request' });
    }

    const updated = await adminLogics.concludeResignation(
      resignationId,
      approved,
      lwd
    );

    // 🔑 IMPORTANT FOR CYPRESS
    if (!updated) {
      return res.status(404).send({ message: 'Resignation not found' });
    }

    return res.status(200).send({
      message: 'Resignation updated successfully'
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// =====================
// GET EXIT RESPONSES
// =====================
const getExitResponses = async (req, res) => {
  try {
    const responses = await adminLogics.getAllExitResponses();

    return res.status(200).send({
      data: responses || []
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
