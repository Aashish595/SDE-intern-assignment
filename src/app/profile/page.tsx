// app/profile/page.tsx
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth";

export default async function ProfilePage() {
  let user;

  try {
    user = await requireAuth();
  } catch {
    redirect("/login");
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="mb-4">
          <p className="text-slate-400 text-sm">Name</p>
          <p className="font-semibold">{user.name}</p>
        </div>

        <div className="mb-4">
          <p className="text-slate-400 text-sm">Email</p>
          <p className="font-semibold">{user.email}</p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Role</p>
          <p className="font-semibold capitalize">
            {user.role || "user"}
          </p>
        </div>
      </div>
    </main>
  );
}
