import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  let user;

  try {
    user = await requireAuth();
  } catch {
    redirect("/login");
  }

  return <DashboardClient user={user} />;
}
