"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import IssueCard from "./IssueCard";

type Issue = {
  _id: string;
  title: string;
  description: string;
  type: string;
};

export default function IssueList() {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    api("/api/issues").then(setIssues);
  }, []);
  
  return (
    <div>
      {issues.map((i) => (
        <IssueCard key={i._id} issue={i} />
      ))}
    </div>
  );
}
