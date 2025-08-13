import React from "react";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Settings,
  LogOut,
  ArrowRight,
} from "lucide-react";
import { Server } from "../../../main";
import { UserData } from "../../../Context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Account = ({ user }) => {
  // Mock functions for demo - replace with your actual imports
  // const navigate = (path) => console.log(`Navigate to: ${path}`);
  // const setisAuth = (value) => console.log(`setisAuth: ${value}`);
  // const setUser = (value) => console.log(`setUser: ${value}`);
  // const toast = { success: (msg) => console.log(`Toast: ${msg}`) };
  // const Server = "https://example.com";
  // const Account = ({user}) => {
  const navigate = useNavigate();

  const { setisAuth, setUser } = UserData();
  function logout() {
    localStorage.clear();
    setUser([]);
    setisAuth(false);
    toast.success("Logout Successfully");
    navigate("/login");
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "text-red-400 bg-red-500/20";
      case "instructor":
        return "text-blue-400 bg-blue-500/20";
      case "student":
        return "text-green-400 bg-green-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  return (
    <div>
      {user && (
        <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-900  to-slate-900 relative overflow-hidden flex items-center justify-center">
          {/* Background decorative elements */}
          {/* <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div> */}

          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8">
            {/* Profile Header */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 border border-white/20 transform transition-all duration-300 hover:shadow-2xl">
              <div className="flex flex-col items-center space-y-6">
                {/* Profile Image */}
                <div className="relative group">
                  <div className="absolute -inset-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <img
                    src={user.profileImg}
                    alt="Profile"
                    className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/20 shadow-xl transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 sm:border-4 border-white/20 animate-pulse"></div>
                </div>

                {/* Profile Info */}
                <div className="text-center w-full">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent mb-2">
                    {user.userName}
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-300 mb-4 break-all">
                    {user.userEmail}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="text-blue-400" size={18} />
                      <span className="text-sm sm:text-base text-gray-300">
                        Member since {formatDate(user.createdAt)}
                      </span>
                    </div>
                    <div
                      className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getRoleColor(
                        user.userRole
                      )}`}  
                    >
                      <Shield size={16} />
                      <span className="text-sm font-medium">
                        {user.userRole}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch">
                        {/* See Courses Button */}
                      {
                        user && user.userRole==="user"&&(
                            <button
                          onClick={() => navigate(`/${user._id}/dashboard`)}
                          className="group relative flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 lg:px-8 rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 focus:outline-none focus:ring-4 focus:ring-purple-500/30 transform hover:scale-[1.02] active:scale-[0.98] min-h-[60px]"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                          <div className="relative flex items-center justify-center gap-3 text-base lg:text-lg">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                              <Settings
                                className="group-hover:rotate-90 transition-transform duration-300"
                                size={18}
                              />
                            </div>
                            <span className="font-bold">My Courses</span>
                            <ArrowRight
                              className="group-hover:translate-x-1 transition-transform duration-300"
                              size={18}
                            />
                          </div>
                        </button>
                        )
                      }

                        {/* Admin Dashboard Button - Only visible for admin */}
                        {user && (user.userRole === "admin"||user.userMainRole === "superadmin") && (
                          <button
                            onClick={() => navigate(

                              user.userMainRole === "superadmin"?"/admin/dashboard":"/admin/courses"
                            )}
                            className="group relative flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 lg:px-8 rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/25 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transform hover:scale-[1.02] active:scale-[0.98] min-h-[60px]"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                            <div className="relative flex items-center justify-center gap-3 text-base lg:text-lg">
                              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                                <span className="text-lg">⚡</span>
                              </div>
                              <span className="font-bold">{user.userMainRole==="superadmin"?"Super Admin Pannel":"Add Course "}</span>
                              <ArrowRight
                                className="group-hover:translate-x-1 transition-transform duration-300"
                                size={18}
                              />
                            </div>
                          </button>
                        )}

                        {/* Logout Button */}
                        <button
                          onClick={logout}
                          className="group relative flex-1 lg:flex-none lg:min-w-[200px] bg-gradient-to-r from-red-600 to-rose-600 text-white py-4 px-6 lg:px-6 rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-500/25 focus:outline-none focus:ring-4 focus:ring-red-500/30 transform hover:scale-[1.02] active:scale-[0.98] min-h-[40px]"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                          <div className="relative flex items-center justify-center gap-3 text-base lg:text-lg">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                              <LogOut
                                className="group-hover:-translate-x-1 transition-transform duration-300"
                                size={18}
                              />
                            </div>
                            <span className="font-bold">Sign Out</span>
                          </div>
                        </button>
                      </div>

                      {/* Mobile-specific enhancement */}
                      <div className="block lg:hidden mt-6">
                        <div className="flex justify-center">
                          <div className="flex gap-2">
                            {/* <div className="w-2 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div> */}
                            <div className="w-2 h-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full"></div>
                            <div className="w-2 h-2 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop enhancement - subtle background pattern */}
                      <div className="hidden lg:block absolute inset-0 opacity-5 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl"></div>
                      </div>
                    </div>
                </div>
              </div>
            </div>

            {/* Profile Stats/Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-indigo-500/20 rounded-xl">
                    <User className="text-indigo-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm sm:text-base">
                      Profile
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Complete profile setup
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-purple-500/20 rounded-xl">
                    <Mail className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm sm:text-base">
                      Email
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Verified account
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div
                    className={`p-2 sm:p-3 rounded-xl ${getRoleColor(
                      user.userRole
                    )}`}
                  >
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm sm:text-base">
                      Access Level
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {user.userRole} privileges
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        //
      )}
    </div>
  );
};

export default Account;
