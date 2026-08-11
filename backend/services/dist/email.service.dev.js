"use strict";

var sendResignationEmail = function sendResignationEmail(_ref) {
  var employeeEmail, employeeName, approved, exitDate, subject, textContent, response, responseText, result;
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
          if (process.env.BREVO_FROM_EMAIL) {
            _context.next = 5;
            break;
          }

          throw new Error('BREVO_FROM_EMAIL is missing');

        case 5:
          if (employeeEmail) {
            _context.next = 7;
            break;
          }

          throw new Error('Employee email is missing');

        case 7:
          subject = approved ? 'XExit: Your resignation has been approved' : 'XExit: Your resignation has been rejected';
          textContent = approved ? "Hello ".concat(employeeName || 'Employee', ",\n\nYour resignation request has been approved.\n\nFinal exit date: ").concat(exitDate || 'Not specified', "\n\nThank you for your contribution.\n\nRegards,\nXExit HR Team") : "Hello ".concat(employeeName || 'Employee', ",\n\nYour resignation request has been rejected.\n\nPlease contact HR for more information.\n\nRegards,\nXExit HR Team");
          console.log('Sending resignation email...');
          console.log('To:', employeeEmail);
          console.log('Approved:', approved);
          _context.prev = 12;
          _context.next = 15;
          return regeneratorRuntime.awrap(fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              'api-key': process.env.BREVO_API_KEY
            },
            body: JSON.stringify({
              sender: {
                email: process.env.BREVO_FROM_EMAIL,
                name: process.env.BREVO_FROM_NAME || 'XExit HR Team'
              },
              to: [{
                email: employeeEmail,
                name: employeeName || 'Employee'
              }],
              subject: subject,
              textContent: textContent
            })
          }));

        case 15:
          response = _context.sent;
          _context.next = 18;
          return regeneratorRuntime.awrap(response.text());

        case 18:
          responseText = _context.sent;
          result = {};

          try {
            result = responseText ? JSON.parse(responseText) : {};
          } catch (_unused) {
            result = {
              rawResponse: responseText
            };
          }

          console.log('BREVO STATUS:', response.status);
          console.log('BREVO RESPONSE:', result);

          if (response.ok) {
            _context.next = 25;
            break;
          }

          throw new Error(result.message || "Brevo API failed with status ".concat(response.status));

        case 25:
          console.log('EMAIL SENT SUCCESSFULLY:', result.messageId);
          return _context.abrupt("return", result);

        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](12);
          console.error('BREVO EMAIL FAILED:', _context.t0.message);
          throw _context.t0;

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[12, 29]]);
};

module.exports = {
  sendResignationEmail: sendResignationEmail
};
//# sourceMappingURL=email.service.dev.js.map
