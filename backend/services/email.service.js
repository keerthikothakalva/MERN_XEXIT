const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

const verifyEmailConnection = async () => {
  try {
    await transporter.verify();

    console.log("Brevo SMTP connection successful");
  } catch (error) {
    console.error("Brevo SMTP connection failed:");
    console.error(error);
  }
};

const sendResignationEmail = async ({
  employeeEmail,
  employeeName,
  approved,
  exitDate,
}) => {
  if (!employeeEmail) {
    throw new Error("Employee email is missing");
  }

  const subject = approved
    ? "XExit: Your resignation has been approved"
    : "XExit: Your resignation has been rejected";

  const textContent = approved
    ? `Hello ${employeeName || "Employee"},

Your resignation request has been approved.

Final exit date: ${exitDate || "Not specified"}

Thank you for your contribution.

Regards,
XExit HR Team`
    : `Hello ${employeeName || "Employee"},

Your resignation request has been rejected.

Please contact HR for more information.

Regards,
XExit HR Team`;

  try {
    console.log("Sending resignation email...");
    console.log("SENDING TO:", employeeEmail);
    console.log("APPROVED:", approved);

    const info = await transporter.sendMail({
      from: `"${process.env.BREVO_FROM_NAME}" <${process.env.BREVO_FROM_EMAIL}>`,

      to: employeeEmail,

      subject,

      text: textContent,
    });

    console.log("EMAIL SENT SUCCESSFULLY");

    console.log({
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });

    return info;
  } catch (error) {
    console.error("EMAIL SENDING FAILED:");
    console.error(error);

    throw error;
  }
};

module.exports = {
  sendResignationEmail,
  verifyEmailConnection,
};