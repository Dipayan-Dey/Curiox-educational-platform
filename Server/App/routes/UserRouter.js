import express from "express"
import { loginUser, myProfile, register, verifyUser } from "../controllers/UserConroller.js"
import { isAuth } from "../middleware/isAuth.js"
import { uploadFiles } from './../middleware/multer.js';

const userRouter=express.Router()


userRouter.post("/register",uploadFiles,register)
userRouter.post("/verify",verifyUser)
userRouter.post("/login",loginUser)
userRouter.get("/myprofile",isAuth,myProfile)



export default userRouter