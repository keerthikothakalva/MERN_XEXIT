const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  requireTLS: true,

  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY
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
    throw new Error(
      'Employee email is missing'
    );
  }

  if (!process.env.BREVO_SMTP_LOGIN) {
    throw new Error(
      'BREVO_SMTP_LOGIN is missing'
    );
  }

  if (!process.env.BREVO_SMTP_KEY) {
    throw new Error(
      'BREVO_SMTP_KEY is missing'
    );
  }

  if (!process.env.EMAIL_USER) {
    throw new Error(
      'EMAIL_USER is missing'
    );
  }

  const subject = approved
    ? 'XExit: Your resignation has been approved'
    : 'XExit: Your resignation has been rejected';

  const message = approved
    ? `Hello ${employeeName || 'Employee'},

Your resignation request has been approved.

Final exit date: ${exitDate || 'Not specified'}

Thank you for your contribution.

Regards,
XExit HR Team`
    : `Hello ${employeeName || 'Employee'},

Your resignation request has been rejected.

Please contact HR for more information.

Regards,
XExit HR Team`;

  try {
    console.log(
      'EMAIL SENDING STARTED'
    );

    console.log(
      'RECIPIENT:',
      employeeEmail
    );

    const info =
      await transporter.sendMail({
        from: {
          name: 'XExit HR Team',
          address:
            process.env.EMAIL_USER
        },

        to: employeeEmail,

        subject,

        text: message
      });

    console.log(
      'EMAIL SENT SUCCESSFULLY:',
      {
        messageId:
          info.messageId,

        accepted:
          info.accepted,

        rejected:
          info.rejected,

        response:
          info.response
      }
    );

    return info;

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