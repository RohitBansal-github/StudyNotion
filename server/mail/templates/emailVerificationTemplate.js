// emailVerificationTemplate.js

const otpTemplate = (otp) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            color: #333;
          }
          .container {
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            max-width: 500px;
            margin: auto;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .otp {
            font-size: 28px;
            font-weight: bold;
            color: #2d89ef;
            margin: 20px 0;
            text-align: center;
          }
          .footer {
            margin-top: 30px;
            font-size: 0.9em;
            color: #777;
            text-align: center;
          }
          .brand-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #ffcc00;
            color: #000;
            font-weight: bold;
            border-radius: 20px;
            text-decoration: none;
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div style="text-align: center; margin-bottom: 20px;">
            <a href="https://studynotion.vercel.app" class="brand-button">StudyNotion</a>
          </div>

          <hr style="margin: 20px 0;" />

          <h2 style="text-align: center;">Email Verification</h2>
          <p style="text-align: center;">Use the OTP below to verify your email address:</p>
          <div class="otp">${otp}</div>
          <p style="text-align: center;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>

          <p class="footer">Thanks for using StudyNotion!<br>– The Team</p>
        </div>
      </body>
    </html>
  `;
};

module.exports = otpTemplate;
