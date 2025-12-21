import { AuthController } from "@/controllers/authController";
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(AuthController.logout());
}
