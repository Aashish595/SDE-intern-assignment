import User from "@/models/User";

export class UserRepository {
  static findById(id: string) {
    return User.findById(id).select("-password");
  }

  static findAll() {
    return User.find().select("-password");
  }

  static findByEmail(email: string) {
    return User.findOne({ email });
  }

  static update(id: string, data: { name?: string; email?: string; password?: string }) {
    return User.findByIdAndUpdate(id, data, { new: true }).select("-password");
  }

  static delete(id: string) {
    return User.findByIdAndDelete(id);
  }

  static async checkEmailExists(email: string, excludeId?: string) {
    const user = await User.findOne({
      email,
      ...(excludeId && { _id: { $ne: excludeId } }),
    });
    return !!user;
  }
}
