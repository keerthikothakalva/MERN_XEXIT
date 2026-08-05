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

          throw new Error('BREVO_API_KEY is missing in Render');

        case 3:
          if (process.env.EMAIL_USER) {
            _context.next = 5;
            break;
          }

          throw new Error('EMAIL_USER is missing in Render');

        case 5:
          if (employeeEmail) {
            _context.next = 7;
            break;
          }

          throw new Error('Employee email is missing');

        case 7:
          subject = approved ? 'XExit: Your resignation has been approved' : 'XExit: Your resignation has been rejected';
          textContent = approved ? "Hello ".concat(employeeName || 'Employee', ",\n\nYour resignation request has been approved.\n\nFinal exit date: ").concat(exitDate || 'Not specified', "\n\nThank you for your contribution.\n\nRegards,\nXExit HR Team") : "Hello ".concat(employeeName || 'Employee', ",\n\nYour resignation request has been rejected.\n\nPlease contact HR for more information.\n\nRegards,\nXExit HR Team");
          console.log('BREVO_API_KEY LOADED:', Boolean(process.env.BREVO_API_KEY));
          console.log('SENDING TO:', employeeEmail);
          _context.next = 13;
          return regeneratorRuntime.awrap(fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              'api-key': process.env.BREVO_API_KEY
            },
            body: JSON.stringify({
              sender: {
                email: process.env.EMAIL_USER,
                name: 'XExit HR Team'
              },
              to: [{
                email: employeeEmail,
                name: employeeName || 'Employee'
              }],
              subject: subject,
              textContent: textContent
            })
          }));

        case 13:
          response = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(response.text());

        case 16:
          responseText = _context.sent;

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
            _context.next = 22;
            break;
          }

          throw new Error(result.message || "Brevo API failed with status ".concat(response.status));

        case 22:
          if (result.messageId) {
            _context.next = 24;
            break;
          }

          throw new Error('Brevo accepted the request but returned no messageId');

        case 24:
          console.log('EMAIL ACCEPTED BY BREVO:', result.messageId);
          return _context.abrupt("return", result);

        case 26:
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
