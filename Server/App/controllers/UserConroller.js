import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDb } from "../models/UserModel.js";
import sendMail, { WelcomeMail } from "../middleware/otpMail.js";
// import cloudinary from "../config/cloudinary.js";

export const register = async (req, res) => {
  try {
    // console.log("📩 Request body:", req.body);
    // console.log("📂 Uploaded files:", req.files);

    const { userName, userEmail, userPassword,userRole } = req.body;

    // Accept either 'profilePhoto' or 'file' as the uploaded image
    const uploadedFile =
      req.files?.profilePhoto?.[0] || req.files?.file?.[0] || null;

    // ✅ Fixed validation
    if (!userName || !userEmail || !userPassword || !uploadedFile || !userRole) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const userExists = await UserDb.findOne({ userEmail });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const user = {
      userName,
      userEmail,
      userPassword: hashedPassword,
      profileImg: uploadedFile.path, // ✅ Cloudinary URL
      userRole
    };

    const otp = Math.floor(100000 + Math.random() * 900000);
    const activationToken = jwt.sign({ user, otp }, process.env.SECRET_TOKEN, {
      expiresIn: "1m",
    });

    await sendMail({
      to: userEmail,
      subject: "CurioX - Email Verification",
      data: { userName, otp },
    });

    res.status(200).json({
      msg: "Registration initiated. OTP sent to email.",
      otp,
      activationToken,
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};



export const verifyUser = async (req, res) => {
  try {
    const { otp, activationToken } = req.body;

    const verify = jwt.verify(activationToken, process.env.SECRET_TOKEN);

    if (!verify) {
      return res.status(400).json({
        msg: "Invalid Otp",
      });
    }

    if (verify.otp !== otp) {
      return res.status(400).json({
        msg: "Wrong Otp",
      });
    }

    await UserDb.create({
      userName: verify.user.userName,
      userEmail: verify.user.userEmail,
      userPassword: verify.user.userPassword,
      profileImg: verify.user.profileImg,
      userRole:verify.user.userRole
    });

    console.log("Registration successfull");
    res.status(200).json({ msg: "Registration successfull" });

    await WelcomeMail({
         to:  verify.user.userEmail,
      subject: "CurioX - Welcome",
      username:  verify.user.userName ,
    })
  } catch (error) {
    console.log("Registration Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    // Check if user exists
    const user = await UserDb.findOne({ userEmail });
    if (!user) {
      return res.status(400).json({
        message: "No user with this email",
      });
    }

    // Compare password
    const matchPassword = await bcrypt.compare(userPassword, user.userPassword);
    if (!matchPassword) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id },
      process.env.LOGIN_SECRET_KEY, // Defined in .env
      { expiresIn: "15d" }
    );

    // Send response
    res.status(200).json({
      message: `Welcome back, ${user.userName}`,
      token,
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await UserDb.findById(req.user._id);

    res.json({ user });
  } catch (error) {
    console.error("myProfile Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
