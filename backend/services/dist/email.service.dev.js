"use strict";

var sendResignationEmail = function sendResignationEmail(_ref) {
  var employeeEmail, employeeName, approved, exitDate, subject, message, response, result;
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
          return regeneratorRuntime.awrap(fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api-key': process.env.BREVO_API_KEY
            },
            body: JSON.stringify({
              sender: {
                email: process.env.EMAIL_USER,
                name: 'XExit HR Team'
              },
              to: [{
                email: employeeEmail,
                name: employeeName
              }],
              subject: subject,
              textContent: message
            })
          }));

        case 9:
          response = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(response.json());

        case 12:
          result = _context.sent;

          if (response.ok) {
            _context.next = 15;
            break;
          }

          throw new Error(result.message || 'Brevo email request failed');

        case 15:
          console.log('EMAIL RESULT:', result);
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](6);
          console.error('EMAIL SENDING FAILED:', _context.t0.message);
          throw _context.t0;

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 18]]);
};

module.exports = {
  sendResignationEmail: sendResignationEmail
};
//# sourceMappingURL=email.service.dev.js.map
