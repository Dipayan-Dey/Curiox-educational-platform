import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    userMainRole:{
      type:String,
      default:"user"
    },
    userRole: {
      type: String,
      default: "user",
    },
    profileImg: {
      type: String
      
    },
    subscription: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const UserDb = mongoose.model("User", userSchema);
