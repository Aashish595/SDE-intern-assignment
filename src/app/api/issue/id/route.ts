import { IssueController } from "@/core/controllers/IssueController";
import { requireAuth } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await requireAuth();
  return IssueController.getById(params.id);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await requireAuth();
  return IssueController.update(req, params.id);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await requireAuth();
  return IssueController.delete(params.id);
}
