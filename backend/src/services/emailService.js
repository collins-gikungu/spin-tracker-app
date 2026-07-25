const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILGUN_FROM,
    pass: process.env.MAILGUN_API_KEY,
  },
});

const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.MAILGUN_FROM || 'noreply@spintracker.com',
      to: email,
      subject: 'Reset Your Spin Tracker Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">🚴 Spin Tracker</h1>
            <p style="margin: 10px 0 0 0;">Password Reset Request</p>
          </div>
          
          <div style="background: #f9fafb; padding: 40px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #1f2937; font-size: 16px; margin-bottom: 20px;">
              Hi there,
            </p>
            
            <p style="color: #1f2937; font-size: 16px; margin-bottom: 30px; line-height: 1.6;">
              We received a request to reset your password. Click the button below to create a new password. This link expires in 1 hour.
            </p>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${resetLink}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin: 30px 0 20px 0;">
              Or copy and paste this link in your browser:
            </p>
            
            <p style="color: #3b82f6; font-size: 12px; word-break: break-all; margin-bottom: 30px; background: white; padding: 15px; border-radius: 5px; border: 1px solid #e5e7eb;">
              ${resetLink}
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #6b7280; font-size: 13px; margin: 0;">
              Didn't request a password reset? You can safely ignore this email.
            </p>
            
            <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
              © 2026 Spin Tracker. All rights reserved.
            </p>
          </div>
        </div>
      `,
      text: `
Hi there,

We received a request to reset your password. Click the link below to create a new password. This link expires in 1 hour.

${resetLink}

Didn't request a password reset? You can safely ignore this email.

© 2026 Spin Tracker
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
  sendPasswordResetEmail,
};
