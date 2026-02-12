const nodemailer = require("nodemailer");

const mailSender = async (email, body, title) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // e.g., smtp.gmail.com
      port: process.env.MAIL_PORT || 587, // 465 for SSL, 587 for TLS
    //   secure: process.env.MAIL_PORT === 465, // true for 465, false for 587
      requireTLS: true,
      secure: false,
      logger: true,
      debug: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // app password if Gmail
      },
      tls: {
        rejectUnauthorized: false, // helps with some hosting environments
      },
      connectionTimeout: 10000, // 10 seconds timeout
    });

    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully:", info.response);
    return info;
  } catch (err) {
    console.error("Error while sending Mail:", err);
    return null; // so caller does not get undefined
  }
};

module.exports = mailSender;
