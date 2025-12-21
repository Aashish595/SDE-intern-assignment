import { ApiError } from "@/lib/errors";

export const ISSUE_TYPES = [
  "Cloud Security",
  "Reteam Assessment",
  "VAPT",
] as const;

export type IssueType = (typeof ISSUE_TYPES)[number];

export class IssueValidator {
  /* ===============================
     CREATE ISSUE
  =============================== */
  static create(data: {
    type?: IssueType;
    title?: string;
    description?: string;
    priority?: string;
    status?: string;
  }) {
    const { type, title, description } = data;

    if (!type || !title || !description) {
      throw new ApiError(
        "Type, title, and description are required",
        400
      );
    }

    if (!ISSUE_TYPES.includes(type)) {
      throw new ApiError("Invalid issue type", 400);
    }
  }

  /* ===============================
     UPDATE ISSUE
  =============================== */
  static update(data: {
    type?: IssueType;
    title?: string;
    description?: string;
    priority?: string;
    status?: string;
  }) {
    if (!data || Object.keys(data).length === 0) {
      throw new ApiError("No fields provided to update", 400);
    }

    if (data.type && !ISSUE_TYPES.includes(data.type)) {
      throw new ApiError("Invalid issue type", 400);
    }
  }

  /* ===============================
     ISSUE ID PARAM
  =============================== */
  static id(id?: string) {
    if (!id) {
      throw new ApiError("Issue ID is required", 400);
    }

    // Optional: MongoDB ObjectId format check
    if (!/^[a-f\d]{24}$/i.test(id)) {
      throw new ApiError("Invalid issue ID format", 400);
    }
  }
}
