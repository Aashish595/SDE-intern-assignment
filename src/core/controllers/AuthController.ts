import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { AuthValidator } from "@/core/validators/AuthValidator";
import { ApiError } from "@/lib/errors";
import { signToken } from "@/lib/jwt";
import { EmailService } from "@/core/services/EmailService";

export class AuthController {
  /* ===================== REGISTER ===================== */
  static async register(body: {
    name?: string;
    email?: string;
    password?: string;
  }) {
    AuthValidator.register(body);
    await connectDB();

    const exists = await User.findOne({ email: body.email });
    if (exists) {
      throw new ApiError("Email already registered", 409);
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

    EmailService.sendWelcomeEmail(user.name, user.email).catch(console.error);

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

  /* ===================== LOGIN ===================== */
  static async login(body: { email?: string; password?: string }) {
    if (!body.email || !body.password) {
      throw new ApiError("Email and password required", 400);
    }

    await connectDB();

    const user = await User.findOne({ email: body.email }).select("+password");
    if (!user) {
      throw new ApiError("Email does not exist", 404);
    }

    const valid = await bcrypt.compare(body.password, user.password);
    if (!valid) {
      throw new ApiError("Incorrect password", 401);
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

  /* ===================== REQUEST RESET ===================== */
  static async requestPasswordReset(email: string) {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return {
        message:
          "If an account exists with this email, a reset link has been sent",
      };
    }

    // RAW TOKEN (sent to email)
    const rawToken = crypto.randomBytes(32).toString("hex");

    // HASHED TOKEN (stored in DB)
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.resetToken = hashedToken;
    user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    await EmailService.sendPasswordResetEmail(
      user.name,
      user.email,
      rawToken
    ).catch(console.error);

    return {
      success: true,
      message: "Password reset email sent",
    };
  }

  /* ===================== VERIFY TOKEN ===================== */
static async verifyResetToken(token: string) {
  await connectDB();

  console.log("RAW TOKEN RECEIVED:", token);

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  console.log("HASHED TOKEN:", hashedToken);

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    throw new ApiError("Invalid or expired reset token", 400);
  }

  return { success: true };
}



  /* ===================== RESET PASSWORD ===================== */
  static async resetPassword(token: string, newPassword: string) {
    await connectDB();

    if (newPassword.length < 6) {
      throw new ApiError("Password must be at least 6 characters", 400);
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      throw new ApiError("Invalid or expired reset token", 400);
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return {
      success: true,
      message: "Password reset successful",
    };
  }
}
