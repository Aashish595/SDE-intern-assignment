// core/controllers/AuthController.ts
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { AuthValidator } from "@/core/validators/AuthValidator";
import { ApiError } from "@/lib/errors";
import { signToken } from "@/lib/jwt";

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
  // core/controllers/AuthController.ts
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
}
