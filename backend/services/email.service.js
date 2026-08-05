const nodemailer = require('nodemailer');
const dns = require('dns');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },

  lookup: (
    hostname,
    options,
    callback
  ) => {
    dns.lookup(
      hostname,
      {
        family: 4
      },
      callback
    );
  },

  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000
});

const sendResignationEmail = async ({
  employeeEmail,
  employeeName,
  approved,
  exitDate
}) => {

  if (!employeeEmail) {
    console.log(
      'EMAIL NOT SENT: Employee email is missing'
    );

    return;
  }

  const subject = approved
    ? 'XExit: Your resignation has been approved'
    : 'XExit: Your resignation has been rejected';

  const message = approved
    ? `
Hello ${employeeName},

Your resignation request has been approved.

Final exit date: ${exitDate}

Thank you for your contribution.

Regards,
XExit HR Team
`
    : `
Hello ${employeeName},

Your resignation request has been rejected.

Please contact HR for more information.

Regards,
XExit HR Team
`;

  try {

    const info = await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: employeeEmail,

      subject,

      text: message

    });

    console.log('EMAIL RESULT:');

    console.log({
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response
    });

  } catch (error) {

    console.error(
      'EMAIL SENDING FAILED:',
      error.message
    );

    throw error;
  }

};

module.exports = {
  sendResignationEmail
};