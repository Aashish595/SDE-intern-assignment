import { NextResponse } from "next/server";
import { AuthController } from "@/core/controllers/AuthController";
import { ApiError } from "@/lib/errors";
import { RateLimiter } from "@/lib/rateLimiter";

export async function POST(req: Request) {
  try {
    /* ===============================
       RATE LIMIT (NODE SAFE)
    =============================== */
    const ip =
      req.headers.get("x-forwarded-for") ??
      "anonymous";

    RateLimiter.check(ip);

    /* ===============================
       LOGIN LOGIC
    =============================== */
    const body = await req.json();
    const { token, user } = await AuthController.login(body);

    const res = NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );

    /* ===============================
       HTTP-ONLY COOKIE
    =============================== */
    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
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
