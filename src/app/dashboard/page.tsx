// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import IssueForm from "@/components/issue/issueForm";
import IssueList from "@/components/issue/IssueList";

export default async function DashboardPage() {
  let user;

  try {
    user = await requireAuth();
  } catch {
    redirect("/login");
  }

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user.name}
      </h1>
      <IssueForm />
      <IssueList />
    </main>
  );
}
