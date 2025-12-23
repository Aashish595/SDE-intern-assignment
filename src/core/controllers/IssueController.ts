import { NextResponse } from "next/server";
import { IssueService } from "@/core/services/IssueService";
import { IssueValidator } from "@/core/validators/IssueValidator";
import type { IssueType } from "@/core/repositories/IssueRepository";
import { EmailService } from "@/core/services/EmailService";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { ApiError } from "@/lib/errors";

// Define interface for Issue
interface Issue {
  _id: string;
  type: string;
  title: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

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
    if (!id) {
      throw new ApiError("Issue ID is required", 400);
    }

    const issue = await IssueService.getById(id);
    return NextResponse.json(issue);
  }

  static async create(req: Request, userId: string) {
    const body = await req.json();
    IssueValidator.create(body);

    const issue = await IssueService.create(userId, body);

    // Send notification emails (async)
    this.sendIssueNotificationEmails(issue as Issue, userId)
      .then(success => {
        if (!success) {
          console.warn('Failed to send issue notification emails for issue:', issue._id);
        }
      })
      .catch(error => {
        console.error('Error sending issue notifications:', error);
      });

    return NextResponse.json({
      message: "Issue created successfully",
      issue
    }, { status: 201 });
  }

static async update(req: Request, id: string) {
  const body = await req.json();
  const issue = await IssueService.update(id, body);

  await EmailService.sendIssueNotification(
    issue.type,
    issue.title,
    issue.description,
    "System",
    issue._id.toString(),
    ["admin@example.com"]
  );

  return NextResponse.json({
    message: "Issue updated successfully",
    issue,
  });
}


static async delete(id: string) {
  const issue = await IssueService.getById(id);
  await IssueService.delete(id);

  await EmailService.sendIssueNotification(
    issue.type,
    issue.title,
    issue.description,
    "System",
    issue._id.toString(),
    ["admin@example.com"]
  );

  return NextResponse.json({
    message: "Issue deleted successfully",
  });
}


  private static async sendIssueNotificationEmails(
    issue: Issue, 
    creatorUserId: string
  ): Promise<boolean> {
    try {
      await connectDB();
      
      // Get creator info
      const creator = await User.findById(creatorUserId);
      if (!creator) {
        console.warn('Creator not found for issue notification:', creatorUserId);
        return false;
      }

      // Get all admin users to notify
      const adminUsers = await User.find({ role: 'admin' }).select('email name');
      const recipientEmails = adminUsers.map(user => user.email);

      // If no admins, at least send to the creator
      if (recipientEmails.length === 0) {
        recipientEmails.push(creator.email);
      }

      // Send notification
      const success = await EmailService.sendIssueNotification(
        issue.type,
        issue.title,
        issue.description,
        creator.name,
        issue._id.toString(),
        recipientEmails
      );

      if (!success) {
        console.warn('EmailService failed to send issue notification');
      }

      return success;
    } catch (error) {
      console.error('Error in sendIssueNotificationEmails:', error);
      return false;
    }
  }
}