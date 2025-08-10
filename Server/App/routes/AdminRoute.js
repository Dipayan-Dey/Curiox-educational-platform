import express from "express";
import { isAdmin, isAuth } from "../middleware/isAuth.js";
import { uploadFiles } from "../middleware/multer.js";
import {
  allDeltails,
  createCourse,
  deleteCourse,
  deleteLacture,
  DeleteUser,
  getAllUser,
  UpdateRole,
  uploadLancture,
} from "../controllers/AdminController.js";

const AdminRoute = express.Router();

// Upload route with authentication and file handling
AdminRoute.post("/createcourse", isAuth, isAdmin, uploadFiles, createCourse);

AdminRoute.post(
  "/createLacture/:id",
  isAuth,
  isAdmin,
  uploadFiles,
  uploadLancture
);
AdminRoute.delete("/deleteCourse/:id", isAuth, isAdmin, deleteCourse);
AdminRoute.delete("/deleteLac/:id", isAuth, isAdmin, deleteLacture);
AdminRoute.get("/allDetails", isAuth, isAdmin, allDeltails);
AdminRoute.get("/allUsers", isAuth, isAdmin, getAllUser);
AdminRoute.put("/updateUsers/:id", isAuth, UpdateRole);
AdminRoute.delete("/deleteUser/:id", isAuth, DeleteUser);

export default AdminRoute;
