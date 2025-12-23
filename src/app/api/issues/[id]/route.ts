import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Issue from "@/models/Issue";
import { requireAuth } from "@/lib/auth";
import mongoose from "mongoose";

const VALID_STATUS = ["Open", "In Progress", "Resolved"];
const VALID_TYPES = ["Cloud Security", "Reteam Assessment", "VAPT"];
const VALID_PRIORITIES = ["Low", "Medium", "High"];

interface UpdateIssueData {
  status?: string;
  title?: string;
  description?: string;
  type?: string;
  priority?: string;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    await connectDB();
    
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid issue ID format" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { status, title, description, type, priority } = body;

    const updateData: UpdateIssueData = {};
    
    if (status) {
      if (!VALID_STATUS.includes(status)) {
        return NextResponse.json(
          { error: "Invalid status" },
          { status: 400 }
        );
      }
      updateData.status = status;
    }
    
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    
    if (type) {
      if (!VALID_TYPES.includes(type)) {
        return NextResponse.json(
          { error: "Invalid type" },
          { status: 400 }
        );
      }
      updateData.type = type;
    }
    
    if (priority) {
      if (!VALID_PRIORITIES.includes(priority)) {
        return NextResponse.json(
          { error: "Invalid priority" },
          { status: 400 }
        );
      }
      updateData.priority = priority;
    }

    const issue = await Issue.findByIdAndUpdate(
     { _id: id, userId: user.id }, 
    updateData,
    { new: true }
    );

    if (!issue) {
      return NextResponse.json(
        { error: "Issue not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(issue);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    await connectDB();
    
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid issue ID format" },
        { status: 400 }
      );
    }

    const issue = await Issue.findByIdAndDelete({ _id: id, userId: user.id });

    if (!issue) {
      return NextResponse.json(
        { error: "Issue not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Issue deleted" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}