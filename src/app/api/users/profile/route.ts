// src/app/api/users/profile/route.ts
import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { UserController } from "@/core/controllers/UserController";

export async function GET() {
  const user = await requireAuth();
  return UserController.getProfile(user.id);
}

export async function PUT(req: NextRequest) {
  const user = await requireAuth();
  const body = await req.json();

  return UserController.updateProfile(user.id, body);
}
