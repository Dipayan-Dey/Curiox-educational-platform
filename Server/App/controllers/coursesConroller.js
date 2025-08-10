import { Razorpay_instance } from "../../index.js";
import { Payment_DB } from "../models/payment.js";
import { UserDb } from "../models/UserModel.js";
import { Course } from "./../models/Course.js";
import { Lacture } from "./../models/Lacture.js";

import crypto from "crypto";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ msg: "Failed to fetch courses" });
  }
};

export const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchLactures = async (req, res) => {
  try {
    const lactures = await Lacture.find({ course: req.params.id });

    const user = await UserDb.findById(req.user._id);

    if (user.userRole === "admin") {
      return res.json({
        lactures,
      });
    }

    if (!user.subscription.includes(req.params.id)) {
      return res.status(404).json({
        msg: "You have to subscribe this course",
      });
    }

    res.json({
      lactures,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchLacture = async (req, res) => {
  try {
    const lacture = await Lacture.findById(req.params.id);

    const user = await UserDb.findById(req.user._id);

    if (user.userRole === "admin") {
      return res.json({
        lacture,
      });
    }

    if (!user.subscription.includes(lacture.course)) {
      return res.status(404).json({
        msg: "You have to subscribe this course",
      });
    }

    res.json({
      lacture,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ _id: req.user.subscription });

    res.json({
      courses,
    });
  } catch (error) {
    console.log(error);
  }
};

export const checkout = async (req, res) => {
  try {
    const user = await UserDb.findById(req.user._id);

    const course = await Course.findById(req.params.id);

    if (user.subscription.includes(course._id)) {
      return res.status(400).json({
        msg: "You allready have this course",
      });
    }
    const options = {
      amount: Number(course.price * 100),
      currency: "INR",
    };

    const order = await Razorpay_instance.orders.create(options);

    res.status(200).json({
      order,
      course,
    });
  } catch (error) {
    console.log(error);
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await Payment_DB.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      })

         const user = await UserDb.findById(req.user._id);
         const course = await Course.findById(req.params.id);

         user.subscription.push(course._id)
         await user.save()
         res.status(200).json({
           msg: "Course Purchese Successfully",
         });
    } else {
      res.status(404).json({
        msg: "Payment Failed",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
