const sendResignationEmail = async ({
  employeeEmail,
  employeeName,
  approved,
  exitDate
}) => {

  if (!process.env.BREVO_API_KEY) {
    throw new Error(
      'BREVO_API_KEY is missing in Render'
    );
  }

  if (!process.env.EMAIL_USER) {
    throw new Error(
      'EMAIL_USER is missing in Render'
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

  const textContent = approved
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
        accept: 'application/json',

        'content-type':
          'application/json',

        'api-key':
          process.env.BREVO_API_KEY
      },

      body: JSON.stringify({
        sender: {
          email:
            process.env.EMAIL_USER,

          name:
            'XExit HR Team'
        },

        to: [
          {
            email:
              employeeEmail,

            name:
              employeeName ||
              'Employee'
          }
        ],

        subject,

        textContent
      })
    }
  );

  const responseText =
    await response.text();

  let result;

  try {
    result =
      responseText
        ? JSON.parse(responseText)
        : {};
  } catch {
    result = {
      rawResponse:
        responseText
    };
  }

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
      `Brevo API failed with status ${response.status}`
    );
  }

  if (!result.messageId) {
    throw new Error(
      'Brevo accepted the request but returned no messageId'
    );
  }

  console.log(
    'EMAIL ACCEPTED BY BREVO:',
    result.messageId
  );

  return result;
};

module.exports = {
  sendResignationEmail
};