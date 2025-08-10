import jwt from "jsonwebtoken";
import { UserDb } from "../models/UserModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(400).json({
        msg: "Please login",
      });
    }

    const decodedId = jwt.verify(token, process.env.LOGIN_SECRET_KEY);

    req.user = await UserDb.findById(decodedId._id); // <-- use req.user instead of req.newUser

    next();
  } catch (error) {
    console.log("Auth Middleware Error:", error);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};


export const isAdmin=(req,res,next)=>{
  try {
    if(req.user.userRole!=="admin"){
      return res.status(400).json({
        msg:"You Are No Longer Admin"
      })

    }

    next()
  } catch (error) {
    console.log("isAdmin Middleware Error:", error);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
}