import { NextResponse } from "next/server";
import { UserService } from "@/core/services/UserService";
import { ApiError } from "@/lib/errors";
import { EmailService } from "@/core/services/EmailService";

export class UserController {
  static async getProfile(userId: string) {
    if (!userId) throw new ApiError("Unauthorized", 401);

    const user = await UserService.getById(userId);
    if (!user) throw new ApiError("User not found", 404);

    return NextResponse.json(user);
  }

  static async updateProfile(
    userId: string,
    data: Partial<{ name: string; email: string }>
  ) {
    if (!userId) throw new ApiError("Unauthorized", 401);

    const user = await UserService.getById(userId);
    if (!user) throw new ApiError("User not found", 404);

    if (data.email && data.email !== user.email) {
      const exists = await UserService.checkEmailExists(data.email, userId);
      if (exists) throw new ApiError("Email already in use", 409);
    }

    const updated = await UserService.update(userId, data);

    await EmailService.sendProfileUpdatedNotification(
      updated.name,
      updated.email,
      Object.keys(data)
    );

    return NextResponse.json({
      message: "Profile updated",
      user: updated,
    });
  }

  static async getAllUsers() {
    return NextResponse.json(await UserService.getAll());
  }

  static async deleteUser(userId: string) {
    await UserService.delete(userId);
    return NextResponse.json({ message: "User deleted" });
  }
}
