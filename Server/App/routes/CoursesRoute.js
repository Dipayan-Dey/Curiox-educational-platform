import express from "express";
import {
  checkout,
  fetchLacture,
  fetchLactures,
  getAllCourses,
  getMyCourses,
  getSingleCourse,
  paymentVerification,
} from "../controllers/coursesConroller.js";
import { isAuth } from "./../middleware/isAuth.js";

const courseRoute = express.Router();

courseRoute.get("/allcourse", getAllCourses);
courseRoute.get("/singlecourse/:id", getSingleCourse);
courseRoute.get("/getAllLactures/:id", isAuth, fetchLactures);
courseRoute.get("/getLacture/:id", isAuth, fetchLacture);
courseRoute.get("/getmycourses", isAuth, getMyCourses);
courseRoute.post("/checkout/:id", isAuth, checkout);
courseRoute.post("/verification/:id", isAuth, paymentVerification);

export default courseRoute;
