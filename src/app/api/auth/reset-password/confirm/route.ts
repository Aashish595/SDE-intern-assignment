import { NextResponse } from "next/server";
import { AuthController } from "@/core/controllers/AuthController";
import { ApiError } from "@/lib/errors";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();
    const result = await AuthController.resetPassword(token, newPassword);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
