// lib/jwt.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthUser } from "./types";
import { requireEnv } from "./env";

const JWT_SECRET = requireEnv("JWT_SECRET"); // 

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): AuthUser {
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

  return {
    id: decoded.id as string,
    name: decoded.name as string,
    email: decoded.email as string,
   
  };
}
