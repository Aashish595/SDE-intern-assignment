import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
     resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", UserSchema);
