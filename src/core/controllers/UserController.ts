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

  // Track actual changes
  const changes: string[] = [];
  const updateData: Partial<{ name: string; email: string }> = {};

  if (data.name && data.name !== user.name) {
    updateData.name = data.name;
    changes.push("name");
  }

  if (data.email && data.email !== user.email) {
    const exists = await UserService.checkEmailExists(data.email, userId);
    if (exists) throw new ApiError("Email already in use", 409);

    updateData.email = data.email;
    changes.push("email");
  }

  // If nothing changed, avoid DB + email
  if (changes.length === 0) {
    return NextResponse.json({
      message: "No changes detected",
      user,
    });
  }

  const updated = await UserService.update(userId, updateData);

  // Send email only when real change happened
  await EmailService.sendProfileUpdatedNotification(
    updated.name,
    updated.email,
    changes
  );

  return NextResponse.json({
    message: "Profile updated successfully",
    user: updated,
  });
}

  static async deleteUser(userId: string) {
    await UserService.delete(userId);
    return NextResponse.json({ message: "User deleted" });
  }
}
