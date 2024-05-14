const { createTransport } = require("nodemailer");

const sendMessage = async (userMsg) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const sentMessage = await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: process.env.SMTP_EMAIL,
    subject: "New message from portfolio site",
    text: userMsg
  });

  return sentMessage;
};

module.exports = { sendMessage };