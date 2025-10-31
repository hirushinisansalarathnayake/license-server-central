// src/services/email.service.js
const transporter = require("../config/mail");

exports.sendKeyToEngineer = async (engineerEmail, key) => {
  const mailOptions = {
    from: `"License System" <${process.env.MAIL_USER}>`,
    to: engineerEmail,
    subject: "Your Activation Key",
    text: `Hello Engineer,\n\nHere is your activation key: ${key}\n\nPlease keep it safe.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Activation key sent successfully to ${engineerEmail}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
};
