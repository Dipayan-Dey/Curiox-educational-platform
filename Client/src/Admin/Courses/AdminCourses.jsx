import React, { useEffect, useState } from "react";
import Layout from "../Utils/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import AdminCourseCard from "./AdminCourseCard";
import { Server } from "../../main";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../Context/CourseContext";

function AdminCourses({ user }) {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loading, setloading] = useState(false);
  const [admincourses, setAdminCourses] = useState([]);
  const { courses, fetchAllCourses } = CourseData();

  const closeModal = () => {
    setIsFormOpen(false);
  };

  async function fetchAdminOwnedCourses(userId) {
    try {
      const { data } = await axios.get(
        `${Server}/api/admin/getadmincourse/${userId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setAdminCourses(data.courses);
      console.log(data.courses);
    } catch (error) {
      console.log(error);
    }
  }

  const imageFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const handleCreateCourse = async (e) => {
    setloading(true);
    e.preventDefault();
    const mydata = new FormData();
    mydata.append("title", title);
    mydata.append("description", description);
    mydata.append("file", image);
    mydata.append("price", price);
    mydata.append("duration", duration);
    mydata.append("category", category);
    mydata.append("createdBy", author);

    try {
      const { data } = await axios.post(
        `${Server}/api/admin/createcourse`,
        mydata,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setLoadingBtn(false);
      fetchAdminOwnedCourses(user._id);
      setTitle("");
      setDescription("");
      setImage("");
      setImagePrev("");
      setDuration("");
      setCategory("");
      setAuthor("");
      setIsFormOpen(false);
      setloading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoadingBtn(false);
      setloading(false);
    }
  };

  useEffect(() => {
    const userId = user?._id;
    if (userId) {
      fetchAdminOwnedCourses(userId);
    }
  }, []);

  const deletecourseHandler = async (id) => {
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

        fetchAdminOwnedCourses(user._id);

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
  };

  const deletecourseHandlerbyAdminSide = async (id) => {
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
  };

  // Calculate statistics
  const currentCourses = user && user.userMainRole === "superadmin" ? courses : admincourses;
  const totalCourses = currentCourses.length;
  const totalCategories = [...new Set(currentCourses.map(course => course.category))].length;
  const totalRevenue = currentCourses.reduce((sum, course) => sum + (course.price || 0), 0);

  return (
    <Layout>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="min-h-screen bg-transparent ">
          <div className="bg-transparent">
            {/* Dashboard Header */}
            <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Course Management Dashboard
                  </h1>
                  <p className="text-gray-300 text-lg">
                    {user && user.userMainRole === "superadmin" 
                      ? "Manage all courses across the platform" 
                      : "Create and manage your courses"}
                  </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border border-blue-500/30 rounded-xl p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-200 text-sm font-medium">Total Courses</p>
                        <p className="text-3xl font-bold text-white">{totalCourses}</p>
                      </div>
                      <div className="bg-blue-500/20 p-3 rounded-full">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-lg border border-emerald-500/30 rounded-xl p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-200 text-sm font-medium">Categories</p>
                        <p className="text-3xl font-bold text-white">{totalCategories}</p>
                      </div>
                      <div className="bg-emerald-500/20 p-3 rounded-full">
                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-200 text-sm font-medium">Total Revenue</p>
                        <p className="text-3xl font-bold text-white">₹{totalRevenue.toLocaleString()}</p>
                      </div>
                      <div className="bg-purple-500/20 p-3 rounded-full">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Your Courses</h2>
                    <p className="text-gray-300">Manage your course collection</p>
                  </div>
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border border-purple-500/30"
                  >
                    <span className="flex items-center gap-3">
                      <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add New Course
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Course Grid */}
            <section className="px-4 sm:px-6 lg:px-8 pb-12">
              <div className="max-w-7xl mx-auto">
                {user && user.userMainRole === "superadmin" ? (
                  <>
                    {courses.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {courses.map((course) => (
                          <div
                            key={course._id}
                            className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 flex flex-col overflow-hidden hover:border-purple-400/50"
                          >
                            {/* Course Image */}
                            <div className="relative overflow-hidden">
                              <img
                                src={
                                  course.image ||
                                  "https://via.placeholder.com/400x200/6b46c1/ffffff?text=Course+Image"
                                }
                                alt={course.title}
                                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              {/* Overlay Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              
                              {/* Category Badge */}
                              <div className="absolute top-4 left-4">
                                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
                                  {course.category || "General"}
                                </span>
                              </div>
                              
                              {/* Price Badge */}
                              <div className="absolute top-4 right-4">
                                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
                                  ₹{course.price || "Free"}
                                </span>
                              </div>
                            </div>

                            {/* Course Content */}
                            <div className="p-6 flex flex-col flex-grow">
                              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
                                {course.title}
                              </h3>
                              <p className="text-gray-300 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                                {course.description.length > 100
                                  ? course.description.slice(0, 100) + "..."
                                  : course.description}
                              </p>

                              {/* Course Details */}
                              <div className="space-y-3 mb-6">
                                <div className="flex items-center text-gray-400 text-sm">
                                  <div className="bg-blue-500/20 p-1.5 rounded-full mr-3">
                                    <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <span>{course.duration ? `${course.duration} hours` : "Self-paced"}</span>
                                </div>
                                {course.createdBy && (
                                  <div className="flex items-center text-gray-400 text-sm">
                                    <div className="bg-emerald-500/20 p-1.5 rounded-full mr-3">
                                      <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                    <span>By {course.createdBy}</span>
                                  </div>
                                )}
                              </div>

                              {/* Action Buttons */}
                              <div className="space-y-3 mt-auto">
                                <button
                                  onClick={() => navigate(`/course/study/${course._id}`)}
                                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3 group/btn"
                                >
                                  <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                  </svg>
                                  <span>Study Course</span>
                                  <svg className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                  </svg>
                                </button>
                                
                                <button
                                  onClick={() => deletecourseHandlerbyAdminSide(course._id)}
                                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3 group/btn"
                                >
                                  <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  <span>Delete Course</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20">
                        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-12 max-w-lg mx-auto border border-white/20">
                          <div className="bg-purple-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">No Courses Available</h3>
                          <p className="text-gray-300 mb-6">Get started by creating your first course and building your educational content.</p>
                          <button
                            onClick={() => setIsFormOpen(true)}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-xl transition duration-300 transform hover:scale-105"
                          >
                            Create Your First Course
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : admincourses && admincourses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {admincourses.map((course) => (
                      <div
                        key={course._id}
                        className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 flex flex-col overflow-hidden hover:border-purple-400/50"
                      >
                        {/* Course Image */}
                        <div className="relative overflow-hidden">
                          <img
                            src={
                              course.image ||
                              "https://via.placeholder.com/400x200/6b46c1/ffffff?text=Course+Image"
                            }
                            alt={course.title}
                            className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          <div className="absolute top-4 left-4">
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
                              {course.category || "General"}
                            </span>
                          </div>
                          
                          <div className="absolute top-4 right-4">
                            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
                              ₹{course.price || "Free"}
                            </span>
                          </div>
                        </div>

                        {/* Course Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
                            {course.title}
                          </h3>
                          <p className="text-gray-300 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                            {course.description.length > 100
                              ? course.description.slice(0, 100) + "..."
                              : course.description}
                          </p>

                          <div className="space-y-3 mb-6">
                            <div className="flex items-center text-gray-400 text-sm">
                              <div className="bg-blue-500/20 p-1.5 rounded-full mr-3">
                                <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span>{course.duration ? `${course.duration} hours` : "Self-paced"}</span>
                            </div>
                            {course.createdBy && (
                              <div className="flex items-center text-gray-400 text-sm">
                                <div className="bg-emerald-500/20 p-1.5 rounded-full mr-3">
                                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span>By {course.createdBy}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-3 mt-auto">
                            <button
                              onClick={() => navigate(`/course/study/${course._id}`)}
                              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3 group/btn"
                            >
                              <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              <span>Study Course</span>
                              <svg className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </button>
                            
                            <button
                              onClick={() => deletecourseHandler(course._id)}
                              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3 group/btn"
                            >
                              <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              <span>Delete Course</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-12 max-w-lg mx-auto border border-white/20">
                      <div className="bg-purple-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">No Courses Yet</h3>
                      <p className="text-gray-300 mb-6">Get started by creating your first course and sharing your knowledge with the world.</p>
                      <button
                        onClick={() => setIsFormOpen(true)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-xl transition duration-300 transform hover:scale-105"
                      >
                        Create Your First Course
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Enhanced Modal Form */}
            {isFormOpen && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-lg rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Create New Course
                      </h2>
                      <p className="text-gray-300 mt-2">Fill in the details to create your course</p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-white text-3xl hover:bg-white/10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={handleCreateCourse} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-200">
                        Course Title *
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter an engaging course title"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-200">
                        Description *
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Describe what students will learn in this course"
                      />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-200">
                        Course Image *
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          onChange={imageFileHandler}
                          required
                          accept="image/*"
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                      {imagePrev && (
                        <div className="mt-4 relative">
                          <img 
                            src={imagePrev} 
                            alt="Preview" 
                            className="w-full h-48 object-cover rounded-xl border border-white/20 shadow-lg" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Price */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-200">
                          Price (₹) *
                        </label>
                        <input
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          placeholder="0"
                        />
                      </div>

                      {/* Duration */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-200">
                          Duration (hours) *
                        </label>
                        <input
                          type="number"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          placeholder="e.g., 10"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Category */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-200">
                          Category *
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        >
                          <option value="" className="bg-gray-800">Select a category</option>
                          <option value="Web Development" className="bg-gray-800">Web Development</option>
                          <option value="Mobile Development" className="bg-gray-800">Mobile Development</option>
                          <option value="Data Science" className="bg-gray-800">Data Science</option>
                          <option value="AI/ML" className="bg-gray-800">AI/ML</option>
                          <option value="UI/UX Design" className="bg-gray-800">UI/UX Design</option>
                          <option value="DevOps" className="bg-gray-800">DevOps</option>
                          <option value="Cybersecurity" className="bg-gray-800">Cybersecurity</option>
                          <option value="Other" className="bg-gray-800">Other</option>
                        </select>
                      </div>

                      {/* Author */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-200">
                          Instructor Name
                        </label>
                        <input
                          type="text"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          placeholder="Your name or instructor name"
                        />
                      </div>
                    </div>

                    {/* Form Buttons */}
                    <div className="flex justify-end space-x-4 pt-6">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loadingBtn}
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                      >
                        {loadingBtn ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create Course
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default AdminCourses;