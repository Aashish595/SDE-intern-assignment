import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import ProfileForm from "./ProfileForm";

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

      <ProfileForm user={user} />
    </main>
  );
}
