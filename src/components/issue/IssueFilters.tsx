"use client";

import { useEffect, useState } from "react";

type Props = {
  search: string;
  type: string;
  priority: string;
  status: string;
  onSearchChange: (search: string) => void;
  onTypeChange: (type: string) => void;
  onPriorityChange: (priority: string) => void;
  onStatusChange: (status: string) => void;
};

export default function IssueFilters({
  search,
  type,
  priority,
  status,
  onSearchChange,
  onTypeChange,
  onPriorityChange,
  onStatusChange,
}: Props) {
  const [localSearch, setLocalSearch] = useState(search);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  const handleClear = () => {
    setLocalSearch("");
    onSearchChange("");
    onTypeChange("");
    onPriorityChange("");
    onStatusChange("");
  };

  const hasFilters = search || type || priority || status;

  return (
    <div className="flex flex-wrap gap-3 items-center mb-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
      {/* Search Input */}
      <input
        type="text"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        placeholder="Search issues..."
        className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-gray-400"
      />

      {/* Type Filter */}
      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white min-w-37.5"
      >
        <option value="">All Types</option>
        <option value="Cloud Security">Cloud Security</option>
        <option value="Reteam Assessment">Reteam Assessment</option>
        <option value="VAPT">VAPT</option>
      </select>

      {/* Priority Filter */}
      <select
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white min-w-37.5"
      >
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {/* Status Filter */}
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white min-w-37.5"
      >
        <option value="">All Status</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>

      {/* Clear Filters Button */}
      {hasFilters && (
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}