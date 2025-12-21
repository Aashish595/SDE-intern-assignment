// lib/auth.ts
import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function requireAuth() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  return verifyToken(token);
}
