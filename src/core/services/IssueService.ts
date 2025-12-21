import { IssueRepository, type IssueType } from "@/core/repositories/IssueRepository";
import { sendEmail } from "@/lib/email";

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

    await sendEmail(
      "admin@apnisec.com",
      "New Security Issue",
      `<h3>${issue.title}</h3><p>${issue.description}</p>`
    );

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
