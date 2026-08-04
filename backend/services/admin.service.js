const jwt = require('jsonwebtoken');
const ResignInfo = require('../models/resign.model');
const ExitResponse = require('../models/exitResponse.model');

class AdminService {

  verifyToken(token) {
    try {
      return jwt.verify(
        token,
        process.env.JWT_SECRET
      );
    } catch (err) {
      return null;
    }
  }


  async getAllResignations() {

    const resignations =
      await ResignInfo.find()
        .populate('employeeId');

   
    const updatedResignations =
      await Promise.all(

        resignations.map(
          async (resignation) => {

            const exitResponse =
              await ExitResponse.findOne({
                employeeId:
                  resignation.employeeId?._id
              });

            return {
              ...resignation.toObject(),

              exitInterviewStatus:
                exitResponse
                  ? 'completed'
                  : 'not submitted'
            };
          }
        )
      );

    console.log(
      'ADMIN: Resignations with exit status:',
      updatedResignations
    );

    return updatedResignations;
  }

async getRecentResignations() {

  const resignations =
    await ResignInfo
      .find()
      .populate('employeeId')
      .sort({
        createdAt: -1
      })
      .limit(5);


  const updatedResignations =
    await Promise.all(

      resignations.map(
        async (resignation) => {

          const exitResponse =
            await ExitResponse.findOne({
              employeeId:
                resignation.employeeId?._id
            });


          return {
            ...resignation.toObject(),

            exitInterviewStatus:
              exitResponse
                ? 'completed'
                : 'not submitted'
          };

        }
      )
    );


  return updatedResignations;

}
  async concludeResignation(
  resignationId,
  approved,
  exitDate
) {

  return ResignInfo
    .findByIdAndUpdate(
      resignationId,
      {
        status:approved
            ? 'approved'
            : 'rejected',

        exitDate:approved
            ? exitDate
            : null
      },
      {
        new:
          true,
        runValidators:
          true
      }

    );

}
  async getAllExitResponses() {

    return await ExitResponse
      .find()
      .populate('employeeId');
  }
}

module.exports = AdminService;