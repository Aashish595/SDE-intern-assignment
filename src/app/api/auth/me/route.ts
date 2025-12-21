import { requireAuth } from "@/lib/auth";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const auth = requireAuth();

  const user = await User.findById(auth.id).select("-password");
  return NextResponse.json(user);
}
