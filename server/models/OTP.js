const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate"); // ✅ Import your HTML template

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60, // 5 minutes
  }
});

// ✅ Function to send verification email using HTML template
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      otpTemplate(otp), // ✅ Use the fancy HTML
      "Verification Email from StudyNotion."
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (err) {
    console.log("Issue while sending verification mails:", err);
    throw err;
  }
}

// ✅ Middleware to auto-send email before saving OTP
otpSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
