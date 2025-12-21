import { IssueService } from "@/core/services/IssueService";
import { IssueValidator } from "@/core/validators/IssueValidator";
import { NextResponse } from "next/server";
import type { IssueType } from "@/core/repositories/IssueRepository";

export class IssueController {
  static async getAll(req: Request, userId: string) {
    const { searchParams } = new URL(req.url);
    const typeParam = searchParams.get("type");

    const map: Record<string, IssueType> = {
      "cloud-security": "Cloud Security",
      "redteam-assessment": "Reteam Assessment",
      vapt: "VAPT",
    };

    const type = typeParam ? map[typeParam] : undefined;

    const issues = await IssueService.getAll(userId, type);
    return NextResponse.json(issues);
  }

  static async getById(id: string) {
    const issue = await IssueService.getById(id);
    return NextResponse.json(issue);
  }

  static async create(req: Request, userId: string) {
    const body = await req.json();
    IssueValidator.create(body);

    const issue = await IssueService.create(userId, body);
    return NextResponse.json(issue);
  }

  static async update(req: Request, id: string) {
    IssueValidator.id(id);

    const body = await req.json();
    IssueValidator.update(body);

    const issue = await IssueService.update(id, body);
    return NextResponse.json(issue);
  }

  static async delete(id: string) {
    IssueValidator.id(id);

    await IssueService.delete(id);
    return NextResponse.json({ message: "Issue deleted" });
  }
}
