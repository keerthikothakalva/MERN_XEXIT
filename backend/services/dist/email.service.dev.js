"use strict";

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
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

var sendResignationEmail = function sendResignationEmail(_ref) {
  var employeeEmail, employeeName, approved, exitDate, subject, message, info;
  return regeneratorRuntime.async(function sendResignationEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          employeeEmail = _ref.employeeEmail, employeeName = _ref.employeeName, approved = _ref.approved, exitDate = _ref.exitDate;

          if (employeeEmail) {
            _context.next = 3;
            break;
          }

          throw new Error('Employee email is missing');

        case 3:
          if (process.env.BREVO_SMTP_LOGIN) {
            _context.next = 5;
            break;
          }

          throw new Error('BREVO_SMTP_LOGIN is missing');

        case 5:
          if (process.env.BREVO_SMTP_KEY) {
            _context.next = 7;
            break;
          }

          throw new Error('BREVO_SMTP_KEY is missing');

        case 7:
          if (process.env.EMAIL_USER) {
            _context.next = 9;
            break;
          }

          throw new Error('EMAIL_USER is missing');

        case 9:
          subject = approved ? 'XExit: Your resignation has been approved' : 'XExit: Your resignation has been rejected';
          message = approved ? "Hello ".concat(employeeName || 'Employee', ",\n\nYour resignation request has been approved.\n\nFinal exit date: ").concat(exitDate || 'Not specified', "\n\nThank you for your contribution.\n\nRegards,\nXExit HR Team") : "Hello ".concat(employeeName || 'Employee', ",\n\nYour resignation request has been rejected.\n\nPlease contact HR for more information.\n\nRegards,\nXExit HR Team");
          _context.prev = 11;
          console.log('EMAIL SENDING STARTED');
          console.log('RECIPIENT:', employeeEmail);
          _context.next = 16;
          return regeneratorRuntime.awrap(transporter.sendMail({
            from: {
              name: 'XExit HR Team',
              address: process.env.EMAIL_USER
            },
            to: employeeEmail,
            subject: subject,
            text: message
          }));

        case 16:
          info = _context.sent;
          console.log('EMAIL SENT SUCCESSFULLY:', {
            messageId: info.messageId,
            accepted: info.accepted,
            rejected: info.rejected,
            response: info.response
          });
          return _context.abrupt("return", info);

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](11);
          console.error('EMAIL SENDING FAILED:', _context.t0.message);
          throw _context.t0;

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[11, 21]]);
};

module.exports = {
  sendResignationEmail: sendResignationEmail
};
//# sourceMappingURL=email.service.dev.js.map
