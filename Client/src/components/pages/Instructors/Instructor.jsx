import React, { useEffect, useState } from "react";
import { UserData } from "../../../Context/UserContext";
import axios from "axios";
import { Server } from "../../../main";
import { toast } from "react-toastify";

function Instructor() {
  const { user } = UserData();
  const [users, setUsers] = useState([]);

  async function fetchAllUsers() {
    try {
      const { data } = await axios.get(`${Server}/api/admin/allUsers`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers(data.users);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to fetch instructors");
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const instructors = users.filter((e) => e.userRole === "admin");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-6 pt-16 md:pt-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block">
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl mb-4">
              Meet Our Instructors
            </h1>
            <div className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full mx-auto w-24 md:w-32"></div>
          </div>
          <p className="text-gray-300 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed px-4">
            Discover the passionate educators who will guide your learning journey
          </p>
        </div>

        {/* Instructors Grid */}
        {instructors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-8xl mx-auto px-4">
            {instructors.map((instructor, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl blur-lg opacity-0 group-hover:opacity-75 transition-all duration-700"></div>
                
                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-white/95 via-white/90 to-purple-50/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 group-hover:scale-105">
                  {/* Card Header with Animated Background */}
                  <div className="relative h-16 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transform transition-transform duration-700 group-hover:scale-110"></div>
                    <div className="absolute top-3 right-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg animate-pulse"></div>
                    </div>
                  </div>

                  {/* Profile Section */}
                  <div className="relative -mt-10 px-4 pb-6">
                    {/* Profile Image Container */}
                    <div className="relative mx-auto w-20 h-20 mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-75"></div>
                      <div className="relative w-full h-full p-0.5">
                        <img
                          src={instructor.profileImg || "https://via.placeholder.com/150"}
                          alt={instructor.userName}
                          className="w-full h-full rounded-full object-cover border-2 border-white shadow-2xl transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Floating Role Badge */}
                      <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg transform transition-all duration-500 group-hover:scale-110">
                        ✨Instructor
                      </div>
                    </div>

                    {/* Name with Gradient */}
                    <h2 className="text-lg font-bold text-center mb-2 bg-gradient-to-r from-gray-800 via-purple-800 to-blue-800 bg-clip-text text-transparent line-clamp-2">
                      {instructor.userName}
                    </h2>

                    {/* Animated Divider */}
                    <div className="flex justify-center mb-3">
                      <div className="h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full transform transition-all duration-700 group-hover:w-16 w-8"></div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-xs text-center mb-4 leading-relaxed line-clamp-2">
                      Passionate educator guiding student success.
                    </p>

                    {/* Interactive Buttons */}
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group/btn text-sm">
                        <span className="flex items-center justify-center space-x-1">
                          <span>View Profile</span>
                          <svg className="w-3 h-3 transform transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </button>
                      
                      <button className="w-full px-4 py-2 bg-white/80 backdrop-blur-sm border border-purple-200 hover:border-purple-400 text-purple-700 font-medium rounded-xl transition-all duration-300 hover:bg-white/90 hover:shadow-lg transform hover:scale-105 text-sm">
                        Contact
                      </button>
                    </div>

                    {/* Stats or Additional Info */}
                    <div className="mt-4 flex justify-center space-x-4 text-xs text-gray-500">
                      <div className="text-center">
                        <div className="font-semibold text-purple-600">5+</div>
                        <div>Years</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">200+</div>
                        <div>Students</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-indigo-600">4.9</div>
                        <div>Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <div className="inline-block p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-gray-300 text-lg font-medium">
                No instructors found.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Instructor;