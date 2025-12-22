import { resend, FROM_EMAIL } from '@/lib/resend';
import { 
  welcomeEmailTemplate, 
  issueNotificationTemplate, 
  passwordResetTemplate,
  profileUpdatedTemplate 
} from '@/lib/email-templates';

export class EmailService {
  static async sendWelcomeEmail(name: string, email: string) {
    try {
      const { data, error } = await resend.emails.send({
        from: `"${process.env.COMPANY_NAME || 'Our Platform'}" <${FROM_EMAIL}>`,
        to: [email],
        subject: `Welcome to ${process.env.COMPANY_NAME || 'Our Platform'}!`,
        html: welcomeEmailTemplate({ name, email }),
      });

      if (error) {
        console.error('Error sending welcome email:', error);
        return false;
      }

      console.log('Welcome email sent:', data?.id);
      return true;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return false;
    }
  }

  static async sendIssueNotification(
    issueType: string, 
    title: string, 
    description: string, 
    userName: string, 
    issueId: string,
    recipientEmails: string[]
  ) {
    try {
      const { data, error } = await resend.emails.send({
        from: `"${process.env.COMPANY_NAME || 'Our Platform'}" <${FROM_EMAIL}>`,
        to: recipientEmails,
        subject: `New Issue Created: ${title}`,
        html: issueNotificationTemplate({ 
          issueType, 
          title, 
          description, 
          userName, 
          issueId 
        }),
      });

      if (error) {
        console.error('Error sending issue notification:', error);
        return false;
      }

      console.log('Issue notification sent:', data?.id);
      return true;
    } catch (error) {
      console.error('Error sending issue notification:', error);
      return false;
    }
  }

  static async sendPasswordResetEmail(name: string, email: string, resetToken: string) {
    try {
      const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
      
      const { data, error } = await resend.emails.send({
        from: `"${process.env.COMPANY_NAME || 'Our Platform'}" <${FROM_EMAIL}>`,
        to: [email],
        subject: 'Password Reset Request',
        html: passwordResetTemplate({ name, resetLink }),
      });

      if (error) {
        console.error('Error sending password reset email:', error);
        return false;
      }

      console.log('Password reset email sent:', data?.id);
      return true;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return false;
    }
  }

  static async sendProfileUpdatedNotification(name: string, email: string, changes: string[]) {
    try {
      const { data, error } = await resend.emails.send({
        from: `"${process.env.COMPANY_NAME || 'Our Platform'}" <${FROM_EMAIL}>`,
        to: [email],
        subject: 'Your Profile Has Been Updated',
        html: profileUpdatedTemplate({ name, changes }),
      });

      if (error) {
        console.error('Error sending profile update email:', error);
        return false;
      }

      console.log('Profile update email sent:', data?.id);
      return true;
    } catch (error) {
      console.error('Error sending profile update email:', error);
      return false;
    }
  }
  
}