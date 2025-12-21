import { requireAuth } from "@/lib/auth";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const auth = (await requireAuth()) as { id: string };

  const user = await User.findById(auth.id).select("-password");
  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  await connectDB();
  const auth = (await requireAuth()) as { id: string };
  const body = await req.json();

  const user = await User.findByIdAndUpdate(auth.id, body, {
    new: true,
  }).select("-password");

  return NextResponse.json(user);
}
