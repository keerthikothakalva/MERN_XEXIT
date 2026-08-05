"use strict";

var nodemailer = require('nodemailer');

var dns = require('dns');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  lookup: function lookup(hostname, options, callback) {
    dns.lookup(hostname, {
      family: 4
    }, callback);
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
            _context.next = 4;
            break;
          }

          console.log('EMAIL NOT SENT: Employee email is missing');
          return _context.abrupt("return");

        case 4:
          subject = approved ? 'XExit: Your resignation has been approved' : 'XExit: Your resignation has been rejected';
          message = approved ? "\nHello ".concat(employeeName, ",\n\nYour resignation request has been approved.\n\nFinal exit date: ").concat(exitDate, "\n\nThank you for your contribution.\n\nRegards,\nXExit HR Team\n") : "\nHello ".concat(employeeName, ",\n\nYour resignation request has been rejected.\n\nPlease contact HR for more information.\n\nRegards,\nXExit HR Team\n");
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: employeeEmail,
            subject: subject,
            text: message
          }));

        case 9:
          info = _context.sent;
          console.log('EMAIL RESULT:');
          console.log({
            messageId: info.messageId,
            accepted: info.accepted,
            rejected: info.rejected,
            response: info.response
          });
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](6);
          console.error('EMAIL SENDING FAILED:', _context.t0.message);
          throw _context.t0;

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 14]]);
};

module.exports = {
  sendResignationEmail: sendResignationEmail
};
//# sourceMappingURL=email.service.dev.js.map
