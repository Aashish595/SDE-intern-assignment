import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { IssueController } from "@/core/controllers/IssueController";

type Params = {
  params: { id: string };
};

export async function GET(
  _req: NextRequest,
  { params }: Params
) {
  await requireAuth();
  return IssueController.getById(params.id);
}

export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  await requireAuth();
  return IssueController.update(req, params.id);
}

export async function DELETE(
  _req: NextRequest,
  { params }: Params
) {
  await requireAuth();
  return IssueController.delete(params.id);
}
