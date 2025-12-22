import { UserRepository } from "@/core/repositories/UserRepository";

export class UserService {
  static getById(id: string) {
    return UserRepository.findById(id);
  }

  static getAll() {
    return UserRepository.findAll();
  }

  static update(id: string, data: { name?: string; email?: string; password?: string }) {
    return UserRepository.update(id, data);
  }

  static delete(id: string) {
    return UserRepository.delete(id);
  }

  static checkEmailExists(email: string, excludeId?: string) {
    return UserRepository.checkEmailExists(email, excludeId);
  }
}
