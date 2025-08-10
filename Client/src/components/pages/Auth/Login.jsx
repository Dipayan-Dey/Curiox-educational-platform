import React, { useState } from "react";
import { UserData } from "../../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../../Context/CourseContext";

function Login() {
    const navigate = useNavigate();


  // Mock functions for demo - replace with your actual context
  // const btnLoading = false;
  // const loginUser = async (email, password, nav) => {
  //   console.log("Login requested:", email, password);
  // };
  // const navigate = (path) => console.log("Navigate to:", path);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const { btnLoading, loginUser } = UserData();
  const {fetchMyCourses}=CourseData()
  const handleSubmit = async (e) => {
    // alert("")  
    e.preventDefault();
    console.log("Submitting:", userEmail, userPassword);
    await loginUser(userEmail, userPassword, navigate,fetchMyCourses);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-20 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 transform transition-all duration-500  hover:shadow-3xl">
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-sm"></div>
        
        <div className="relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg transform transition-transform duration-300 hover:rotate-12">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-300 mt-2">Sign in to your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <label
                htmlFor="email"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  focusedField === "email" || userEmail
                    ? "-top-2 text-xs bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium"
                    : "top-3 text-gray-400"
                }`}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField("")}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white placeholder-transparent transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
              />
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 transition-transform duration-300 group-focus-within:scale-x-100"></div>
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  focusedField === "password" || userPassword
                    ? "-top-2 text-xs bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium"
                    : "top-3 text-gray-400"
                }`}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField("")}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white placeholder-transparent transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
              />
            </div>

            <button
              disabled={btnLoading}
              type="submit"
              className="group relative w-full py-3 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative flex items-center justify-center">
                {btnLoading && (
                  <div className="mr-2 w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
                {btnLoading ? "Signing In..." : "Sign In"}
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -top-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 group-hover:animate-pulse"></div>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-300 mb-4">Don't have an account?</p>
            <a 
              href="/signup" 
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-blue-400 bg-blue-400/10 border border-blue-400/30 rounded-lg hover:bg-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Create Account
              <svg className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-ping animation-delay-1000"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-ping animation-delay-3000"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-50 animate-ping animation-delay-5000"></div>
      </div>
    </div>
  );
}

export default Login;