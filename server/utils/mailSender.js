const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailSender = async (email, body, title) => {
  try {
    await sgMail.send({
      to: email,
      from: "StudyNotion <dummymail8364@gmail.com>", // verified sender
      subject: title,
      html: body,
    });

    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Error while sending Mail:", error);
    return null;
  }
};

module.exports = mailSender;
