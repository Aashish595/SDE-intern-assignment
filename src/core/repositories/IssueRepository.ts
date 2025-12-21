import Issue from "@/models/Issue";

export type IssueType = "Cloud Security" | "Reteam Assessment" | "VAPT";

export class IssueRepository {
  static findAll(userId: string, type?: IssueType) {
    return Issue.find({
      userId,
      ...(type && { type }),
    }).sort({ createdAt: -1 });
  }

  static findById(id: string) {
    return Issue.findById(id);
  }

  static create(data: {
    userId: string;
    type: IssueType;
    title: string;
    description: string;
  }) {
    return Issue.create(data);
  }

  static update(
    id: string,
    data: Partial<{
      type: IssueType;
      title: string;
      description: string;
      priority: string;
      status: string;
    }>
  ) {
    return Issue.findByIdAndUpdate(id, data, { new: true });
  }

  static delete(id: string) {
    return Issue.findByIdAndDelete(id);
  }
}
