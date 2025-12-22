interface WelcomeEmailProps {
  name: string;
  email: string;
}

interface IssueNotificationProps {
  issueType: string;
  title: string;
  description: string;
  userName: string;
  issueId: string;
}

interface PasswordResetProps {
  name: string;
  resetLink: string;
}

interface ProfileUpdatedProps {
  name: string;
  changes: string[];
}

export function welcomeEmailTemplate({ name, email }: WelcomeEmailProps): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to ${process.env.COMPANY_NAME || 'Our Platform'}!</h1>
        </div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>Thank you for registering with us. Your account has been successfully created with the following email:</p>
          <p><strong>${email}</strong></p>
          <p>You can now log in to your account and start using our services.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login" class="button">Login to Your Account</a>
          <p>If you have any questions, feel free to contact our support team.</p>
          <p>Best regards,<br>The ${process.env.COMPANY_NAME || 'Our Platform'} Team</p>
        </div>
        <div class="footer">
          <p>This is an automated message, please do not reply to this email.</p>
          <p>© ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Our Platform'}. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function issueNotificationTemplate({ issueType, title, description, userName, issueId }: IssueNotificationProps): string {
  const truncatedDescription = description.length > 200 ? description.substring(0, 200) + '...' : description;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .issue-card { background: white; border-left: 4px solid #f5576c; padding: 15px; margin: 15px 0; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .label { display: inline-block; background: #f5576c; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin-right: 10px; }
        .button { display: inline-block; background: #f5576c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Issue Created</h1>
        </div>
        <div class="content">
          <h2>Hello Team,</h2>
          <p>A new issue has been created by <strong>${userName}</strong>:</p>
          
          <div class="issue-card">
            <span class="label">${issueType}</span>
            <h3>${title}</h3>
            <p>${truncatedDescription}</p>
            <p><small>Issue ID: ${issueId}</small></p>
          </div>
          
          <p>Please review this issue and take appropriate action.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/issues/${issueId}" class="button">View Issue</a>
          
          <p>Best regards,<br>The ${process.env.COMPANY_NAME || 'Our Platform'} Team</p>
        </div>
        <div class="footer">
          <p>This is an automated notification, please do not reply to this email.</p>
          <p>© ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Our Platform'}. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function passwordResetTemplate({ name, resetLink }: PasswordResetProps): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .button { display: inline-block; background: #4facfe; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
          
          <div class="warning">
            <p><strong>Important:</strong> This password reset link will expire in 1 hour.</p>
          </div>
          
          <p>To reset your password, click the button below:</p>
          <a href="${resetLink}" class="button">Reset Password</a>
          
          <p>Or copy and paste this link in your browser:</p>
          <p><code style="background: #eee; padding: 5px; border-radius: 3px;">${resetLink}</code></p>
          
          <p>If you didn't request a password reset, no further action is required.</p>
          <p>Best regards,<br>The ${process.env.COMPANY_NAME || 'Our Platform'} Team</p>
        </div>
        <div class="footer">
          <p>This is an automated message, please do not reply to this email.</p>
          <p>© ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Our Platform'}. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function profileUpdatedTemplate({ name, changes }: ProfileUpdatedProps): string {
  const changesList = changes.map(change => `<li>${change}</li>`).join('');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #5ee7df 0%, #b490ca 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .changes { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .button { display: inline-block; background: #5ee7df; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Profile Updated</h1>
        </div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>Your profile has been successfully updated. Here's a summary of the changes:</p>
          
          <div class="changes">
            <ul>${changesList}</ul>
          </div>
          
          <p>If you didn't make these changes, please contact our support team immediately.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/profile" class="button">View Your Profile</a>
          
          <p>Best regards,<br>The ${process.env.COMPANY_NAME || 'Our Platform'} Team</p>
        </div>
        <div class="footer">
          <p>This is an automated notification, please do not reply to this email.</p>
          <p>© ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Our Platform'}. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}