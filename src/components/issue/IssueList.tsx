"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import IssueCard from "./IssueCard";
import { toast } from "sonner";

type IssueStatus = "Open" | "In Progress" | "Resolved";
type IssueType = "Cloud Security" | "Reteam Assessment" | "VAPT";
type IssuePriority = "Low" | "Medium" | "High";

export type Issue = {
  _id: string;
  title: string;
  description: string;
  type: IssueType;
  priority: IssuePriority;
  status: IssueStatus;
};

export default function IssueList({
  search,
  type,
  priority,
  status,
}: {
  search?: string;
  type?: string;
  priority?: string;
  status?: string;
}) {

  const [issues, setIssues] = useState<Issue[]>([]);

useEffect(() => {
  const loadIssues = async () => {
    try {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (type) params.append("type", type);
      if (priority) params.append("priority", priority);
      if (status) params.append("status", status);

      const data = await api(`/api/issues?${params.toString()}`);
      setIssues(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load issues");
    }
  };

  loadIssues();
}, [search, type, priority, status]);


  /** ✅ STATUS UPDATE */
  const updateStatus = async (id: string, status: IssueStatus) => {
    try {
      const updated = await api(`/api/issues/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      setIssues((prev) =>
        prev.map((i) => (i._id === id ? updated : i))
      );

      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  /** ✅ ISSUE UPDATE */
  const updateIssue = (updated: Issue) => {
    setIssues((prev) =>
      prev.map((i) => (i._id === updated._id ? updated : i))
    );
  };

  /** ✅ ISSUE DELETE */
  const deleteIssue = (id: string) => {
    setIssues((prev) => prev.filter((i) => i._id !== id));
  };

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <IssueCard
          key={issue._id}
          issue={issue}
          onStatusChange={updateStatus}
          onUpdate={updateIssue}
          onDelete={deleteIssue}
        />
      ))}
    </div>
  );
}
