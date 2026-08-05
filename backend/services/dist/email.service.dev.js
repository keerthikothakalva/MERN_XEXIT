"use strict";

var sendResignationEmail = function sendResignationEmail(_ref) {
  var employeeEmail, employeeName, approved, exitDate, subject, message, response, result;
  return regeneratorRuntime.async(function sendResignationEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          employeeEmail = _ref.employeeEmail, employeeName = _ref.employeeName, approved = _ref.approved, exitDate = _ref.exitDate;

          if (process.env.BREVO_API_KEY) {
            _context.next = 3;
            break;
          }

          throw new Error('BREVO_API_KEY is missing');

        case 3:
          if (process.env.EMAIL_USER) {
            _context.next = 5;
            break;
          }

          throw new Error('EMAIL_USER is missing');

        case 5:
          if (employeeEmail) {
            _context.next = 7;
            break;
          }

          throw new Error('Employee email is missing');

        case 7:
          subject = approved ? 'XExit: Your resignation has been approved' : 'XExit: Your resignation has been rejected';
          message = approved ? "Hello ".concat(employeeName || 'Employee', ",\n\nYour resignation request has been approved.\n\nFinal exit date: ").concat(exitDate || 'Not specified', "\n\nThank you for your contribution.\n\nRegards,\nXExit HR Team") : "Hello ".concat(employeeName || 'Employee', ",\n\nYour resignation request has been rejected.\n\nPlease contact HR for more information.\n\nRegards,\nXExit HR Team");
          _context.next = 11;
          return regeneratorRuntime.awrap(fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api-key': process.env.BREVO_API_KEY
            },
            body: JSON.stringify({
              sender: {
                name: 'XExit HR Team',
                email: process.env.EMAIL_USER
              },
              to: [{
                email: employeeEmail,
                name: employeeName || 'Employee'
              }],
              subject: subject,
              textContent: message
            })
          }));

        case 11:
          response = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(response.json());

        case 14:
          result = _context.sent;
          console.log('BREVO STATUS:', response.status);
          console.log('BREVO RESPONSE:', result);

          if (response.ok) {
            _context.next = 19;
            break;
          }

          throw new Error(result.message || 'Brevo email request failed');

        case 19:
          console.log('EMAIL SENT SUCCESSFULLY:', result.messageId);
          return _context.abrupt("return", result);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  sendResignationEmail: sendResignationEmail
};
//# sourceMappingURL=email.service.dev.js.map
