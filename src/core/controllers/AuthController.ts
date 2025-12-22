import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { AuthValidator } from "@/core/validators/AuthValidator";
import { ApiError } from "@/lib/errors";
import { signToken } from "@/lib/jwt";
import { EmailService } from "@/core/services/EmailService";

export class AuthController {
  static async register(body: {
    name?: string;
    email?: string;
    password?: string;
  }) {
    AuthValidator.register(body);
    await connectDB();

    const exists = await User.findOne({ email: body.email });
    if (exists) {
      throw new ApiError("User already exists", 409);
    }

    const hashed = await bcrypt.hash(body.password!, 10);

    const user = await User.create({
      name: body.name,
      email: body.email,
      password: hashed,
      role: "user",
    });

    const token = signToken({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    });

    // Send welcome email (async - don't block response)
    EmailService.sendWelcomeEmail(user.name, user.email)
      .then(success => {
        if (!success) {
          console.warn('Failed to send welcome email to:', user.email);
        }
      })
      .catch(error => {
        console.error('Error sending welcome email:', error);
      });

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  static async login(body: { email?: string; password?: string }) {
    if (!body.email || !body.password) {
      throw new ApiError("Email and password required", 400);
    }

    await connectDB();

    const user = await User.findOne({ email: body.email }).select("+password"); 

    if (!user) {
      throw new ApiError("Invalid credentials", 401);
    }

    const valid = await bcrypt.compare(body.password, user.password);

    if (!valid) {
      throw new ApiError("Invalid credentials", 401);
    }

    const token = signToken({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  static async requestPasswordReset(email: string) {
    await connectDB();
    
    const user = await User.findOne({ email });
    if (!user) {
      // For security, don't reveal if user exists
      return { message: "If an account exists with this email, a reset link has been sent" };
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Save token to user
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Send password reset email
    await EmailService.sendPasswordResetEmail(
      user.name, 
      user.email, 
      resetToken
    ).then(success => {
      if (!success) {
        console.warn('Failed to send password reset email to:', user.email);
      }
    }).catch(error => {
      console.error('Error sending password reset email:', error);
    });

    return { 
      success: true, 
      message: "Password reset email sent" 
    };
  }

  static async resetPassword(token: string, newPassword: string) {
    await connectDB();

    if (!token || !newPassword) {
      throw new ApiError("Token and new password are required", 400);
    }

    if (newPassword.length < 6) {
      throw new ApiError("Password must be at least 6 characters", 400);
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
      throw new ApiError("Invalid or expired reset token", 400);
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update user
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return { 
      success: true, 
      message: "Password reset successful" 
    };
  }

  static async verifyResetToken(token: string) {
    await connectDB();

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
      throw new ApiError("Invalid or expired reset token", 400);
    }

    return { 
      success: true, 
      message: "Token is valid" 
    };
  }
}