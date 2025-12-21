import User from "@/models/User";

type UpdateUserData = {
  name?: string;
  email?: string;
  avatar?: string;
};

export class UserRepository {
  static findById(id: string) {
    return User.findById(id).select("-password");
  }

  static findByEmail(email: string) {
    return User.findOne({ email });
  }

  static update(id: string, data: UpdateUserData) {
    return User.findByIdAndUpdate(id, data, {
      new: true,
    }).select("-password");
  }
}
