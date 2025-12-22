import { resend, FROM_EMAIL } from "@/lib/resend";
import {
  welcomeEmailTemplate,
  issueNotificationTemplate,
  passwordResetTemplate,
  profileUpdatedTemplate,
} from "@/lib/email-templates";

export class EmailService {
  static async sendWelcomeEmail(name: string, email: string) {
    return this.send(email, "Welcome!", welcomeEmailTemplate({ name, email }));
  }

  static async sendPasswordResetEmail(
    name: string,
    email: string,
    resetToken: string
  ) {
    const resetLink = `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/reset-password?token=${resetToken}`;

    return this.send(
      email,
      "Password Reset Request",
      passwordResetTemplate({ name, resetLink })
    );
  }

static async sendProfileUpdated(
  name: string,
  email: string,
  changes: string[]
) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: "Profile Updated",
    html: profileUpdatedTemplate({ name, changes }),
  });
}


  private static async send(
    to: string,
    subject: string,
    html: string
  ): Promise<boolean> {
    try {
      const { error } = await resend.emails.send({
        from: `"${process.env.COMPANY_NAME || "Platform"}" <${FROM_EMAIL}>`,
        to: [to],
        subject,
        html,
      });

      return !error;
    } catch {
      return false;
    }
  }
}
