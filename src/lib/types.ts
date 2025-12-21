// lib/types.ts
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
};
export type TokenPayload = {
  id: string;
  role: string;
};
