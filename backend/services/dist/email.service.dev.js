"use strict";

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY
  }
});

var verifyEmailConnection = function verifyEmailConnection() {
  return regeneratorRuntime.async(function verifyEmailConnection$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(transporter.verify());

        case 3:
          console.log("Brevo SMTP connection successful");
          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error("Brevo SMTP connection failed:");
          console.error(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

var sendResignationEmail = function sendResignationEmail(_ref) {
  var employeeEmail, employeeName, approved, exitDate, subject, textContent, info;
  return regeneratorRuntime.async(function sendResignationEmail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          employeeEmail = _ref.employeeEmail, employeeName = _ref.employeeName, approved = _ref.approved, exitDate = _ref.exitDate;

          if (employeeEmail) {
            _context2.next = 3;
            break;
          }

          throw new Error("Employee email is missing");

        case 3:
          subject = approved ? "XExit: Your resignation has been approved" : "XExit: Your resignation has been rejected";
          textContent = approved ? "Hello ".concat(employeeName || "Employee", ",\n\nYour resignation request has been approved.\n\nFinal exit date: ").concat(exitDate || "Not specified", "\n\nThank you for your contribution.\n\nRegards,\nXExit HR Team") : "Hello ".concat(employeeName || "Employee", ",\n\nYour resignation request has been rejected.\n\nPlease contact HR for more information.\n\nRegards,\nXExit HR Team");
          _context2.prev = 5;
          console.log("Sending resignation email...");
          console.log("SENDING TO:", employeeEmail);
          console.log("APPROVED:", approved);
          _context2.next = 11;
          return regeneratorRuntime.awrap(transporter.sendMail({
            from: "\"".concat(process.env.BREVO_FROM_NAME, "\" <").concat(process.env.BREVO_FROM_EMAIL, ">"),
            to: employeeEmail,
            subject: subject,
            text: textContent
          }));

        case 11:
          info = _context2.sent;
          console.log("EMAIL SENT SUCCESSFULLY");
          console.log({
            messageId: info.messageId,
            accepted: info.accepted,
            rejected: info.rejected,
            response: info.response
          });
          return _context2.abrupt("return", info);

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](5);
          console.error("EMAIL SENDING FAILED:");
          console.error(_context2.t0);
          throw _context2.t0;

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 17]]);
};

module.exports = {
  sendResignationEmail: sendResignationEmail,
  verifyEmailConnection: verifyEmailConnection
};
//# sourceMappingURL=email.service.dev.js.map
