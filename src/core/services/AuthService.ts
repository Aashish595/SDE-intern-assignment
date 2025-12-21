import bcrypt from "bcryptjs";
import { UserRepository } from "@/core/repositories/UserRepository";
import { signToken } from "@/lib/jwt";

export class AuthService {
  static async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    return signToken({ id: user._id });
  }
}
