import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      // unique:true
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model("Course", courseSchema);
