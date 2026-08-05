const sendResignationEmail = async ({
  employeeEmail,
  employeeName,
  approved,
  exitDate
}) => {
  if (!employeeEmail) {
    console.log(
      'EMAIL NOT SENT: Employee email is missing'
    );
    return;
  }

  const subject = approved
    ? 'XExit: Your resignation has been approved'
    : 'XExit: Your resignation has been rejected';

  const message = approved
    ? `
Hello ${employeeName},

Your resignation request has been approved.

Final exit date: ${exitDate}

Thank you for your contribution.

Regards,
XExit HR Team
`
    : `
Hello ${employeeName},

Your resignation request has been rejected.

Please contact HR for more information.

Regards,
XExit HR Team
`;

  try {
    const response = await fetch(
      'https://api.brevo.com/v3/smtp/email',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',

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
                employeeName
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

    if (!response.ok) {
      throw new Error(
        result.message ||
        'Brevo email request failed'
      );
    }

    console.log(
      'EMAIL RESULT:',
      result
    );

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