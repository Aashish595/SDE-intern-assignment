"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import type { Issue } from "./IssueList";

type IssueStatus = "Open" | "In Progress" | "Resolved";
type IssueType = "Cloud Security" | "Reteam Assessment" | "VAPT";
type IssuePriority = "Low" | "Medium" | "High";

type FormData = {
  title: string;
  description: string;
  type: IssueType;
  priority: IssuePriority;
};

const STATUS_STYLES: Record<IssueStatus, string> = {
  Open: "bg-blue-500/20 text-blue-300",
  "In Progress": "bg-yellow-500/20 text-yellow-300",
  Resolved: "bg-green-500/20 text-green-300",
};

const PRIORITY_STYLES: Record<IssuePriority, string> = {
  Low: "bg-green-500/20 text-green-300",
  Medium: "bg-yellow-500/20 text-yellow-300",
  High: "bg-red-500/20 text-red-300",
};

type Props = {
  issue: Issue;
  onStatusChange: (id: string, status: IssueStatus) => Promise<void>;
  onUpdate: (issue: Issue) => void;
  onDelete: (id: string) => void;
};

export default function IssueCard({
  issue,
  onStatusChange,
  onUpdate,
  onDelete,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: issue.title,
    description: issue.description,
    type: issue.type,
    priority: issue.priority,
  });

  /** DELETE */
  const del = async () => {
    setLoading(true);
    try {
      await api(`/api/issues/${issue._id}`, { method: "DELETE" });
      onDelete(issue._id);
      toast.success("Issue deleted");
    } catch {
      toast.error("Failed to delete issue");
    } finally {
      setLoading(false);
    }
  };

  /** SAVE */
  const save = async () => {
    setLoading(true);
    try {
      const updated = await api(`/api/issues/${issue._id}`, {
        method: "PATCH",
        body: JSON.stringify(formData),
      });

      onUpdate(updated);
      toast.success("Issue updated");
      setIsEditing(false);
    } catch {
      toast.error("Failed to update issue");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- EDIT MODE ---------------- */
  if (isEditing) {
    return (
      <div className="border border-white/10 rounded-xl p-5 bg-slate-900 space-y-4">
        <input
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white"
        />

        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white"
        />

        <div className="grid grid-cols-2 gap-3">
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as IssueType,
              })
            }
            className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white"
          >
            <option value="Cloud Security">Cloud Security</option>
            <option value="Reteam Assessment">Reteam Assessment</option>
            <option value="VAPT">VAPT</option>
          </select>

          <select
            value={formData.priority}
            onChange={(e) =>
              setFormData({
                ...formData,
                priority: e.target.value as IssuePriority,
              })
            }
            className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-600 rounded"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={loading}
            className="px-4 py-2 bg-green-600 rounded"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- VIEW MODE ---------------- */
  return (
    <div className="border border-white/10 rounded-xl p-5 bg-slate-900">
      <div className="flex justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {issue.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {issue.description}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-blue-600 rounded"
          >
            Edit
          </button>
          <button
            onClick={del}
            disabled={loading}
            className="px-3 py-1 bg-red-600 rounded"
          >
            Delete
          </button>
        </div>
      </div>

      {/* BADGES */}
      <div className="flex flex-wrap gap-3 mt-4 items-center text-xs">
        <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300">
          {issue.type}
        </span>

        <span
          className={`px-2 py-1 rounded ${PRIORITY_STYLES[issue.priority]}`}
        >
          Priority: {issue.priority}
        </span>

        <span
          className={`px-2 py-1 rounded ${STATUS_STYLES[issue.status]}`}
        >
          {issue.status}
        </span>

        <select
          value={issue.status}
          onChange={(e) =>
            onStatusChange(issue._id, e.target.value as IssueStatus)
          }
          className="ml-auto bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white"
        >
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
      </div>
    </div>
  );
}
