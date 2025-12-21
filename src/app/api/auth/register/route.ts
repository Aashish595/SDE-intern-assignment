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
       REGISTER LOGIC
    =============================== */
    const body = await req.json();
    const { token, user } = await AuthController.register(body);

    const res = NextResponse.json(
      { message: "Registered successfully", user },
      { status: 201 }
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

    console.error("REGISTER UNHANDLED ERROR:", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
