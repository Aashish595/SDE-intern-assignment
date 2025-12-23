import bcrypt from "bcryptjs";
import { UserRepository } from "@/core/repositories/UserRepository";
import { signToken } from "@/lib/jwt";
import { ApiError } from "@/lib/errors";

export class AuthService {
  static async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new ApiError("Email does not exist", 404);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new ApiError("Incorrect password", 401);
    }

    return signToken({ id: user._id });
  }
}
