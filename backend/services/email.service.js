const sendResignationEmail = async ({
  employeeEmail,
  employeeName,
  approved,
  exitDate
}) => {
  if (!process.env.BREVO_API_KEY) {
    throw new Error(
      'BREVO_API_KEY is missing'
    );
  }

  if (!process.env.EMAIL_USER) {
    throw new Error(
      'EMAIL_USER is missing'
    );
  }

  if (!employeeEmail) {
    throw new Error(
      'Employee email is missing'
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

  const response = await fetch(
    'https://api.brevo.com/v3/smtp/email',
    {
      method: 'POST',

      headers: {
        'Content-Type':
          'application/json',

        'api-key':
          process.env.BREVO_API_KEY
      },

      body: JSON.stringify({
        sender: {
          name:
            'XExit HR Team',

          email:
            process.env.EMAIL_USER
        },

        to: [
          {
            email:
              employeeEmail,

            name:
              employeeName || 'Employee'
          }
        ],

        subject,

        textContent:
          message
      })
    }
  );

  const result =
    await response.json();

  console.log(
    'BREVO STATUS:',
    response.status
  );

  console.log(
    'BREVO RESPONSE:',
    result
  );

  if (!response.ok) {
    throw new Error(
      result.message ||
      'Brevo email request failed'
    );
  }

  console.log(
    'EMAIL SENT SUCCESSFULLY:',
    result.messageId
  );

  return result;
};

module.exports = {
  sendResignationEmail
};