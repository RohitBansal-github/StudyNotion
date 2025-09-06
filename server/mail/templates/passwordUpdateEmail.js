// passwordUpdateEmail.js

exports.passwordUpdateEmail = (name, email) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            padding: 20px;
            color: #333;
          }
          .email-container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            max-width: 600px;
            margin: auto;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
          }
          .brand-button {
            display: inline-block;
            background-color: #f7d54e;
            color: #000;
            font-weight: bold;
            padding: 8px 16px;
            border-radius: 5px;
            text-decoration: none;
            margin-bottom: 20px;
          }
          .footer {
            margin-top: 40px;
            font-size: 0.9em;
            color: #777;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div style="text-align: center;">
            <a href="https://studynotion.vercel.app" class="brand-button">StudyNotion</a>
          </div>
          <hr style="margin: 20px 0;" />

          <h2>Hello ${name},</h2>
          <p>The password for your StudyNotion account (<strong>${email}</strong>) has been successfully updated.</p>
          <p>If this wasn’t you, please reset your password immediately and contact support.</p>

          <p class="footer">
            Stay safe!<br>
            – The StudyNotion Team
          </p>
        </div>
      </body>
    </html>
  `;
};
