import { UserRepository } from "@/core/repositories/UserRepository";

type UpdateUserData = {
  name?: string;
  email?: string;
};

export class UserService {
  static getProfile(userId: string) {
    return UserRepository.findById(userId);
  }

  static updateProfile(userId: string, data: UpdateUserData) {
    return UserRepository.update(userId, data);
  }
}
