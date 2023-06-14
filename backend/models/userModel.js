import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
  },
  { strict: false }
);

export default mongoose.model("User", userSchema);
