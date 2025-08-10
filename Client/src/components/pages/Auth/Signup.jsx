import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../../Context/UserContext";
import { Eye, EyeOff, Sparkles } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
    profilePhoto: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ This should only update form state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ This is where registerUser should be called
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userName, userEmail, userPassword, confirmPassword, profilePhoto } =
      formData;

    if (!userName || !userEmail || !userPassword || !confirmPassword) {
      alert("All fields are required.");
      return;
    }

    if (userPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    await registerUser(
      userName,
      userEmail,
      profilePhoto,
      userPassword,
      navigate
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-20 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-gray-800/40 backdrop-blur-xl px-6 py-6 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700/50"
      >
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl mb-2">
            <Sparkles className="text-white animate-pulse" size={22} />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent animate-pulse">
            Create Account
          </h2>
          <p className="text-gray-300 text-xs mt-1">
            Join us and start your magical journey ✨
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="userName"
              placeholder="Enter your full name"
              value={formData.userName}
              onChange={handleChange}
              className="w-full bg-gray-700/30 border border-gray-600/50 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="userEmail"
              placeholder="Enter your email"
              value={formData.userEmail}
              onChange={handleChange}
              className="w-full bg-gray-700/30 border border-gray-600/50 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Profile Photo
            </label>
            <input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, profilePhoto: e.target.files[0] })
              }
              className="w-full bg-gray-700/30 border border-gray-600/50 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="userPassword"
                placeholder="Enter your password"
                value={formData.userPassword}
                onChange={handleChange}
                className="w-full bg-gray-700/30 border border-gray-600/50 rounded px-3 py-2 pr-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-gray-700/30 border border-gray-600/50 rounded px-3 py-2 pr-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <button
            type="submit"
            disabled={btnLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {btnLoading ? (
              <div className="flex items-center justify-center text-sm">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Please wait...
              </div>
            ) : (
              "Register"
            )}
          </button>
        </div>

        <div className="mt-4 text-center text-gray-400 text-xs">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">
            Login
          </a>
        </div>

        {/* Smaller decorative elements */}
        <div className="absolute -top-2 -left-2 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
      </form>
    </div>
  );
};

export default Signup;
