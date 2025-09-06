exports.courseEnrollmentEmail = (courseName, name) => {
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
          .btn {
            display: inline-block;
            padding: 12px 20px;
            margin-top: 20px;
            background-color: #28a745;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          }
          .footer {
            margin-top: 40px;
            font-size: 0.9em;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div style="display: flex; align-items: center; gap: 10px; justify-content: center;">
            <a href="https://studynotion.vercel.app" style="text-decoration: none; display: flex; align-items: center; gap: 10px;">
              <img src="https://studynotion.vercel.app/logo.png" alt="StudyNotion Logo" style="height: 40px;" />
              <span style="font-size: 20px; font-weight: bold; color: #000;">StudyNotion</span>
            </a>
          </div>
          <hr style="margin: 20px 0;" />

          <h2>Hi ${name},</h2>
          <p>🎉 You have successfully enrolled in the course <strong>${courseName}</strong>!</p>
          <p>Click the button below to access your course:</p>
          <a class="btn" href="https://studynotion.vercel.app/dashboard/enrolled-courses">Go to Course</a>

          <p class="footer">
            If you have any issues, feel free to contact our support team.<br>
            Happy learning! 🚀<br>
            – The StudyNotion Team
          </p>
        </div>
      </body>
    </html>
  `;
};
