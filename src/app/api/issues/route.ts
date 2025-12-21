import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { IssueController } from "@/core/controllers/IssueController";

export async function GET(req: NextRequest) {
  const user = await requireAuth();
  return IssueController.getAll(req, user.id);
}

export async function POST(req: NextRequest) {
  const user = await requireAuth(); // ✅ get logged-in user
  return IssueController.create(req, user.id); // ✅ pass userId
}
