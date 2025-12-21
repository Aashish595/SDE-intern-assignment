import { UserService } from "@/core/services/UserService";
import { NextResponse } from "next/server";

export class UserController {
  static async getProfile(userId: string) {
    const user = await UserService.getProfile(userId);
    return NextResponse.json(user);
  }

  static async updateProfile(req: Request, userId: string) {
    const body = await req.json();
    const user = await UserService.updateProfile(userId, body);
    return NextResponse.json(user);
  }
}
