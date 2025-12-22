"use client";

import { useState } from "react";
import IssueForm from "@/components/issue/IssueForm";
import IssueList from "@/components/issue/IssueList";
import IssueFilters from "@/components/issue/IssueFilters";

type User = {
  name: string;
};

export default function DashboardClient({ user }: { user: User }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="max-w-6xl mx-auto p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Welcome, {user.name}
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium"
        >
          Create Issue
        </button>
      </div>

      {/* Filters */}
      <IssueFilters
        search={search}
        type={type}
        priority={priority}
        status={status}
        onSearchChange={setSearch}
        onTypeChange={setType}
        onPriorityChange={setPriority}
        onStatusChange={setStatus}
      />

      {/* Issue List */}
      <IssueList
        key={refreshKey}
        search={search}
        type={type}
        priority={priority}
        status={status}
      />

      {/* Popup Form */}
      {showForm && (
        <IssueForm
          onClose={() => setShowForm(false)}
          onCreated={() => {
            setShowForm(false);
            setRefreshKey((k) => k + 1); // force refetch
          }}
        />
      )}
    </main>
  );
}