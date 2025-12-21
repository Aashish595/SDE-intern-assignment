  import { ApiError } from "@/lib/errors";

  export class AuthValidator {
    static register(data: { name?: string; email?: string; password?: string }) {
      const { name, email, password } = data;

      if (!name || !email || !password) {
        throw new ApiError("All fields are required", 400);
      }

      if (password.length < 6) {
        throw new ApiError("Password must be at least 6 characters", 400);
      }
    }

      static login(data: { email?: string; password?: string }) {
      const { email, password } = data;

      if (!email || !password) {
        throw new ApiError("Email and password required", 400);
      }
    }


  }
