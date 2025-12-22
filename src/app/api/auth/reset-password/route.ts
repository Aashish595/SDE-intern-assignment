import { NextResponse } from "next/server";
import { AuthController } from "@/core/controllers/AuthController";
import { ApiError } from "@/lib/errors";
import { RateLimiter } from "@/lib/rateLimiter";

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
    RateLimiter.check(ip);

    const { email } = await req.json();
    
    if (!email) {
      throw new ApiError("Email is required", 400);
    }

    const result = await AuthController.requestPasswordReset(email);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.status }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}