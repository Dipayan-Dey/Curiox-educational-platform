import React from "react";
import { Server } from "../../../main";
// import { isAuth } from './../../../../../Server/App/middleware/isAuth';
import { UserData } from "../../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CourseData } from "../../../Context/CourseContext";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
function CourseCard({ course }) {
  const { isAuth, user } = UserData();
  const navigate = useNavigate();
  const { fetchAllCourses } = CourseData();

  async function deletecourseHandler(id) {
    const swalWithTailwind = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded m-5",
        cancelButton:
          "bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded m-5",
      },
      buttonsStyling: false,
    });

    const result = await swalWithTailwind.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axios.delete(
          `${Server}/api/admin/deleteCourse/${id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        // toast.success(data.msg);
        fetchAllCourses();

        swalWithTailwind.fire(
          "Deleted!",
          "Your Course has been deleted.",
          "success"
        );
      } catch (error) {
        toast.error(error.response?.data?.msg || "Something went wrong");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithTailwind.fire("Cancelled", "Your Course is safe :)", "error");
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 sm:max-w-none border border-gray-100 group">
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20">
          {course.category}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>

      <div className="p-5 sm:p-6 md:p-7 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        <h1 className="text-lg sm:text-xl md:text-xl font-bold text-gray-800 mb-3 line-clamp-2 leading-tight group-hover:text-gray-900 transition-colors duration-300">
          {course.title}
        </h1>

        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-xs font-semibold">
              {course.createdBy
                .split(" ")
                .map((name) => name.charAt(0).toUpperCase())
                .slice(0, 2)
                .join("")}
            </span>
          </div>
          <p className="text-sm text-gray-600 font-medium">
            By {course.createdBy}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-6">
          <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-2 animate-pulse"></div>
            <p className="text-sm text-blue-700 font-semibold">
              {course.duration} Weeks
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl text-black font-extrabold">
              ₹{course.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400 line-through font-semibold">
              ₹{(course.price * 1.5).toLocaleString()}
            </span>
          </div>
        </div>

        {isAuth ? (
          <>
            {user && user.userRole !== "admin" ? (
              <>
                {user && user.subscription.includes(course._id) ? (
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-emerald-700 active:from-emerald-700 active:to-emerald-800 transition-all duration-300 font-semibold text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-emerald-500/30 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center group/btn"
                  >
                    <span className="mr-2">📚</span>
                    Study
                    <span className="ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                      →
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 transition-all duration-300 font-semibold text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center group/btn"
                  >
                    <span className="mr-2">🚀</span>
                    Get Started
                    <span className="ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                      →
                    </span>
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-indigo-600 hover:to-purple-700 active:from-indigo-700 active:to-purple-800 transition-all duration-300 font-semibold text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-purple-500/30 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center group/btn"
              >
                <span className="mr-2">👨‍🏫</span>
                Study Course
                <span className="ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                  →
                </span>
              </button>
            )}
          </>
        ) : (
          <button
            onClick={() => navigate(`/login`)}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 transition-all duration-300 font-semibold text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center group/btn"
          >
            <span className="mr-2">🔐</span>
            Get Started
            <span className="ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
              →
            </span>
          </button>
        )}

        {user && user.userRole === "admin" && (
          <button
            onClick={() => deletecourseHandler(course._id)}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800 transition-all duration-300 font-semibold text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-red-500/30 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-3 flex items-center justify-center group/btn"
          >
            <span className="mr-2">🗑️</span>
            Delete Course
            <span className="ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
              ×
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
