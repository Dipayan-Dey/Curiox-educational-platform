import React, { useEffect } from "react";
import {
  Award,
  BookOpen,
  Check,
  ChevronRight,
  Play,
  Star,
  Users,
} from "lucide-react";
import { CourseData } from "../../../Context/CourseContext";
import CourseCard from "./CourseCard";
import { UserData } from "../../../Context/UserContext";
import { useNavigate } from "react-router-dom";

// const dummycourses = [
//   {
//     title: "Web Development Mastery",
//     students: "2.4k",
//     rating: 4.9,
//     price: "$99",
//     image: "🌐",
//   },
//   {
//     title: "Data Science Fundamentals",
//     students: "1.8k",
//     rating: 4.8,
//     price: "$129",
//     image: "📊",
//   },
//   {
//     title: "Digital Marketing Pro",
//     students: "3.2k",
//     rating: 4.9,
//     price: "$79",
//     image: "📈",
//   },
//   {
//     title: "UX/UI Design Complete",
//     students: "1.5k",
//     rating: 4.7,
//     price: "$109",
//     image: "🎨",
//   },
// ];

function Courses() {
  const { courses } = CourseData();
  // console.log(courses);
    const { user, isAuth } = UserData();
  const navigate = useNavigate();

  // 🚀 Redirect admins away
  // useEffect(() => {
  //   if (isAuth && user?.userRole === "admin") {
  //     navigate("/account", { replace: true });
  //   }
  // }, [isAuth, user, navigate]);

  // 🛑 Prevent rendering for admins
 if (isAuth && user?.userRole === "admin") {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-transparent rounded-xl shadow-md">
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        Go to your <span className="text-indigo-600">Account</span> page
      </h1>
      <p className="mt-2 text-white">
        and view all your created courses from there.
      </p>
      <a
        href="/account"
        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Go to Account
      </a>
    </div>
  );
}

  return (
    <div className=" bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white">
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="courses">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Courses
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our most popular courses designed by industry experts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <p>No Course Yet...</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Courses;
