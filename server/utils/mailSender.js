const nodemailer = require("nodemailer");

const mailSender = async (email, body, title) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
        let info = await transporter.sendMail({
            from: `"StudyNotion" <${process.env.MAIL_USER}>`, // must be a real email
            to: email,
            subject: title,
            html: body, // keep as HTML
        })
        console.log(info);
        return info;
    }
    catch (err) {
        console.log("Error while sending Mail", err);
    }
}

module.exports = mailSender;