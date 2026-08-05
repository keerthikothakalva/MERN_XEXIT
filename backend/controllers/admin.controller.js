const AdminLogics = require('../services/admin.service');
const adminLogics = new AdminLogics();

const mongoose = require('mongoose');
const memoryStore = require('../utils/memoryStore');
const {
  sendResignationEmail
} = require('../services/email.service');
const isDBConnected = () =>
  mongoose.connection.readyState === 1;

const getAllResignations = async (req, res) => {
  try {

  
    if (!isDBConnected()) {
      return res.status(200).send({
        data: memoryStore.employees || []
      });
    }

    const resignations =
      await adminLogics.getAllResignations();

    return res.status(200).send({
      data: resignations || []
    });

  } catch (err) {

    console.error(
      'GET RESIGNATIONS ERROR:',
      err
    );

    return res.status(500).send({
      message: err.message
    });
  }
};

const getRecentResignations = async (
  req,
  res
) => {

  try {

    if (!isDBConnected()) {

      const recentRequests =
        [...(memoryStore.employees || [])]
          .sort(
            (a, b) =>
              new Date(
                b.createdAt || 0
              ) -
              new Date(
                a.createdAt || 0
              )
          )
          .slice(0, 5);

      return res.status(200).send({

        data:
          recentRequests

      });

    }


    const recentRequests =
      await adminLogics
        .getRecentResignations();


    return res.status(200).send({

      data:
        recentRequests || []

    });

  } catch (err) {

    console.error(

      'GET RECENT RESIGNATIONS ERROR:',

      err

    );


    return res.status(500).send({

      message:
        err.message

    });

  }

};

const concludeResignation = async (req, res) => {
  try {
    const {
      resignationId,
      approved,
      exitDate
    } = req.body;

    if (!resignationId) {
      return res.status(400).json({
        message: 'Resignation ID is required'
      });
    }

    if (typeof approved !== 'boolean') {
      return res.status(400).json({
        message: 'Approval status is required'
      });
    }

    const resignation =
      await adminLogics.concludeResignation(
        resignationId,
        approved,
        exitDate || null
      );

    if (!resignation) {
      return res.status(404).json({
        message: 'Resignation request not found'
      });
    }

    const populatedResignation =
      await resignation.populate('employeeId');

    const employee =
      populatedResignation.employeeId;

    console.log(
      'EMAIL FLOW STARTED'
    );

    console.log(
      'EMPLOYEE EMAIL:',
      employee?.email
    );

    if (!employee?.email) {
      return res.status(400).json({
        message:
          'Employee email is missing'
      });
    }

    await sendResignationEmail({
      employeeEmail:
        employee.email,

      employeeName:
        employee.username ||
        'Employee',

      approved,

      exitDate:
        approved
          ? exitDate
          : null
    });

    console.log(
      'EMAIL FLOW COMPLETED'
    );

    return res.status(200).json({
      message:
        approved
          ? 'Resignation approved and email sent successfully'
          : 'Resignation rejected and email sent successfully',

      data:
        populatedResignation
    });

  } catch (error) {

    console.error(
      'CONCLUDE/EMAIL ERROR:',
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        'Unable to update resignation or send email'
    });
  }
};

const getExitResponses = async (req, res) => {
  try {

    
    if (!isDBConnected()) {
      return res.status(200).send({
        data:
          memoryStore.exitResponses || []
      });
    }

    
    const exitResponses =
      await adminLogics.getAllExitResponses();

    return res.status(200).send({
      data: exitResponses || []
    });

  } catch (err) {

    console.error(
      'GET EXIT RESPONSES ERROR:',
      err
    );

    return res.status(500).send({
      message: err.message
    });
  }
};

module.exports = {
  getAllResignations,
  getRecentResignations,
  concludeResignation,
  getExitResponses
};