import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Issue from "@/models/Issue";
import { requireAuth } from "@/lib/auth";

export async function GET(req: Request) {
  await requireAuth();
  await connectDB();

  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search");
  const type = searchParams.get("type");
  const priority = searchParams.get("priority");
  const status = searchParams.get("status");

  // 🔍 Dynamic filter
  const filter: Record<string, unknown> = {};

  if (type) filter.type = type;
  if (priority) filter.priority = priority;
  if (status) filter.status = status;

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const issues = await Issue.find(filter).sort({ createdAt: -1 });

  return NextResponse.json(issues);
}

export async function POST(req: Request) {
  const user = await requireAuth();
  await connectDB();

  const body = await req.json();
  const issue = await Issue.create({
    ...body,
    userId: user.id,
  });

  return NextResponse.json(issue);
}
