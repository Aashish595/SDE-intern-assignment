import { IssueRepository, type IssueType } from "@/core/repositories/IssueRepository";
import { EmailService } from "@/core/services/EmailService";

export class IssueService {
  static getAll(userId: string, type?: IssueType) {
    return IssueRepository.findAll(userId, type);
  }

  static getById(id: string) {
    return IssueRepository.findById(id);
  }

  static async create(
    userId: string,
    data: {
      title: string;
      description: string;
      type: IssueType;
    }
  ) {
    const issue = await IssueRepository.create({
      userId,
      ...data,
    });

    // Send issue notification email (async, non-blocking)
    EmailService.sendIssueNotification(
      issue.type,
      issue.title,
      issue.description,
      "System",
      issue._id.toString(),
      ["admin@apnisec.com"]
    ).catch(console.error);

    return issue;
  }

  static update(
    id: string,
    data: Partial<{
      title: string;
      description: string;
      type: IssueType;
      priority: string;
      status: string;
    }>
  ) {
    return IssueRepository.update(id, data);
  }

  static delete(id: string) {
    return IssueRepository.delete(id);
  }
}
