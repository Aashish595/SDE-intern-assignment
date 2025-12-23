import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { ApiError } from "@/lib/errors";

export async function requireAuth() {
  console.log("AUTH CHECK HIT");
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new ApiError("Unauthorized", 401);
  }

  return verifyToken(token);
}
