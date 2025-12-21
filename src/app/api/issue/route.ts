import { IssueController } from "@/core/controllers/IssueController";
import { requireAuth } from "@/lib/auth";

export async function GET(req: Request) {
  const user = await requireAuth();
  return IssueController.getAll(req, user.id);
}

export async function POST(req: Request) {
  const user = await requireAuth();
  return IssueController.create(req, user.id);
}
