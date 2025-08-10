import { Course } from "../models/Course.js";
import { Lacture } from "../models/Lacture.js";
import { rm } from "fs"; //delete from folder
import { v2 as cloudinary } from "cloudinary";

import { promisify } from "util";

import fs from "fs";
import { UserDb } from "../models/UserModel.js";
import getPublicId from "../utils/getPublicId.js";
// import { Course } from './../models/Course';
// import { Lacture } from './../models/Lacture';
export const createCourse = async (req, res) => {
  try {
    const { title, description, category, createdBy, duration, price } =
      req.body;
    const file = req.files?.file?.[0];

    if (!file) {
      return res.status(400).json({ message: "Course image is required" });
    }

    await Course.create({
      title,
      description,
      category,
      createdBy,
      image: file.path,
      duration,
      price,
    });

    res.status(201).json({ message: "Course Created Successfully" });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const uploadLancture = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "No Course with this id" });
    }

    const { title, description } = req.body;
    const file = req.files?.file?.[0];

    if (!file) {
      return res.status(400).json({ msg: "Lecture video is required" });
    }

    const lecture = await Lacture.create({
      title,
      description,
      video: file.path,
      course: course._id,
    });

    res.status(201).json({
      message: "Lecture Added",
      lecture,
    });
  } catch (error) {
    console.log("Lecture Upload Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteLacture = async (req, res) => {
  try {
    const lac = await Lacture.findById(req.params.id);

    if (!lac) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // 🔥 Extract public ID from Cloudinary video URL
    const publicId = getPublicId(lac.video);

    // 🔥 Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });

    await lac.deleteOne();

    res.json({ msg: "Lecture Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error deleting lecture" });
  }
};

// const unlikePromise=promisify(fs.unlink)

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    const lactures = await Lacture.find({ course: course._id });

    // 🔥 Delete all lecture videos from Cloudinary
    await Promise.all(
      lactures.map(async (lac) => {
        const publicId = getPublicId(lac.video);
        await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
      })
    );

    // 🔥 Delete course image from Cloudinary
    const courseImageId = getPublicId(course.image);
    await cloudinary.uploader.destroy(courseImageId); // default resource_type is image

    // Delete all lectures and course from DB
    await Lacture.deleteMany({ course: req.params.id });
    await course.deleteOne();

    // Remove course from all users' subscriptions
    await UserDb.updateMany({}, { $pull: { subscription: req.params.id } });

    res.json({ msg: "Course Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error deleting course" });
  }
};

export const allDeltails = async (req, res) => {
  try {
    const totalCourse = (await Course.find()).length;
    const totalLac = (await Lacture.find()).length;
    const totalUser = (await UserDb.find()).length;
    
    const details = {
      totalCourse,
      totalLac,
      totalUser,
    };
    
    res.json({
      details,
    });
  } catch (error) {
    console.log(error);
  }
};

// 689873670f25f7835e0658c5
export const getAllUser=async (req,res)=>{
  try {
    const excludeId = "689873670f25f7835e0658c5"; // 👈 ID you want to exclude
    const users = await UserDb.find({ _id: { $ne: excludeId } })
      .select("-subscription -createdAt -updatedAt -userPassword -__v");
  return  res.status(201).json({users})
  } catch (error) {
    
    res.status(500).json({ msg: "User Fetching Error" });
  }
}

export const UpdateRole=async (req,res)=>{

  try {

    if(req.user.userMainRole!=="superadmin") return res.status(403).json({msg:"This Is Only Update Super Admin"})
    const user=await UserDb.findById(req.params.id)
    if(user.userRole==="admin"){
      user.userRole="user"

      await user.save()

      return res.status(201).json({msg:"Role Update Successfully"})
    }
    if(user.userRole==="user"){
      user.userRole="admin"

      await user.save()

      return res.status(201).json({msg:"Role Update Successfully"})
    }
  } catch (error) {
    res.status(500).json({ msg: "Role Doesn't Update" });
    
  }
}