const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com", 
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  // Send registration verification email
  async sendRegistrationVerificationEmail(email, otp, fullName) {
    const mailOptions = {
      from: `"Welcome to Expenso" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Welcome! Verify Your Email to Complete Registration",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
            .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; padding: 30px 20px; text-align: center; }
            .content { padding: 30px 20px; background-color: #f9fafb; }
            .otp-box { background-color: white; padding: 30px; text-align: center; border-radius: 12px; margin: 25px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .otp-code { font-size: 36px; font-weight: bold; color: #4f46e5; letter-spacing: 6px; margin: 15px 0; }
            .welcome-message { color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
            .features { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .feature-item { display: flex; align-items: center; margin: 10px 0; }
            .checkmark { color: #10b981; margin-right: 10px; }
            .footer { background-color: #374151; color: white; padding: 20px; text-align: center; font-size: 14px; }
            .warning { color: #dc2626; font-size: 14px; margin-top: 25px; padding: 15px; background-color: #fef2f2; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Expenso!</h1>
              <p>Your Smart Expense Management Solution</p>
            </div>
            <div class="content">
              <div class="welcome-message">
                <h2>Hello ${fullName}! 👋</h2>
                <p>Thank you for joining Expenso! You're just one step away from taking control of your finances.</p>
                <p>Please verify your email address using the code below to complete your registration:</p>
              </div>
              
              <div class="otp-box">
                <h3>Verification Code</h3>
                <div class="otp-code">${otp}</div>
                <p>This code will expire in ${process.env.OTP_EXPIRY_MINUTES || 10} minutes.</p>
              </div>
              
              <div class="features">
                <h3>What you'll get with Expenso:</h3>
                <div class="feature-item">
                  <span class="checkmark">✓</span>
                  <span>Smart expense tracking with AI insights</span>
                </div>
                <div class="feature-item">
                  <span class="checkmark">✓</span>
                  <span>Beautiful visualizations and reports</span>
                </div>
                <div class="feature-item">
                  <span class="checkmark">✓</span>
                  <span>Secure cloud storage for your data</span>
                </div>
                <div class="feature-item">
                  <span class="checkmark">✓</span>
                  <span>Easy expense categorization</span>
                </div>
              </div>
              
              <div class="warning">
                <strong>Security Notice:</strong> Never share this verification code with anyone. Expenso will never ask for this code via phone or social media.
              </div>
            </div>
            <div class="footer">
              <p>© 2025 Expenso - Smart Expense Management</p>
              <p>This email was sent because you registered for an Expenso account.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Registration verification email sent successfully to ${email}`);
      return { success: true };
    } catch (error) {
      console.error("Error sending registration verification email:", error);
      throw new Error("Failed to send verification email");
    }
  }

  // Send welcome email after verification
  async sendWelcomeEmail(email, fullName) {
    const mailOptions = {
      from: `"Expenso Team" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "🎉 Welcome to Expenso! Your Account is Verified",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px 20px; text-align: center; }
            .content { padding: 30px 20px; background-color: #f9fafb; }
            .success-box { background-color: white; padding: 30px; text-align: center; border-radius: 12px; margin: 25px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .success-icon { font-size: 48px; margin-bottom: 20px; }
            .cta-button { background-color: #4f46e5; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Account Verified Successfully!</h1>
            </div>
            <div class="content">
              <div class="success-box">
                <div class="success-icon">🎉</div>
                <h2>Congratulations, ${fullName}!</h2>
                <p>Your email has been verified and your Expenso account is now fully active.</p>
                <p>You can now log in and start managing your expenses like a pro!</p>
                <a href="${process.env.CLIENT_URL}/login" class="cta-button">Login to Your Account</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Welcome email sent successfully to ${email}`);
      return { success: true };
    } catch (error) {
      console.error("Error sending welcome email:", error);
      // Don't throw error for welcome email - it's not critical
      return { success: false, error: error.message };
    }
  }
}

module.exports = new EmailService();