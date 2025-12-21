import mongoose, { Schema, models } from "mongoose";

const IssueSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["Cloud Security", "Reteam Assessment", "VAPT"],
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, default: "Medium" },
    status: { type: String, default: "Open" },
  },
  { timestamps: true }
);

export default models.Issue || mongoose.model("Issue", IssueSchema);
