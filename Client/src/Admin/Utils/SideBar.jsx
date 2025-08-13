import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Settings,
  BarChart3,
} from "lucide-react";
import { Server } from "../../main";
import { UserData } from "../../Context/UserContext";

function SideBar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
const {user}=UserData()
  // const [currUser,setCurrUser]=useState(user)
  // const location=useLocation()
  // useEffect(() => {
  //   setCurrUser(user);
  // }, [location.pathname]);
  // console.log("Sidebar rendered. Route:", location.pathname, "User:", user);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      path: "/admin/dashboard",
    },
    {
      id: "courses",
      label: "Courses",
      icon: BookOpen,
      path: "/admin/courses",
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem("userId");
    window.location.href = "/";
  };
const filteredMenuItems = menuItems.filter((item) => {
  if (item.id === "users" && user?.userMainRole !== "superadmin") {
    return false; // hide Users menu if not superadmin
  }
  if (item.id === "dashboard" && user?.userMainRole !== "superadmin") {
    return false; // hide Users menu if not superadmin
  }
  if (item.id === "analytics" && user?.userMainRole !== "superadmin") {
    return false; // hide Users menu if not superadmin
  }
  return true;
});
  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-72"
      } shadow-2xl flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700 flex-shrink-0">
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
          }`}
        >
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent whitespace-nowrap">
            {user?.userMainRole==="superadmin" ? "Super Admin Panel":"Admin Panel"}
          </h2>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-700 transition-all duration-200 hover:scale-105 flex-shrink-0"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-8 px-4 overflow-hidden">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.id} className="relative group">
                <Link
                  to={item.path}
                  className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 ease-in-out relative overflow-hidden text-decoration-none ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                      : "hover:bg-slate-700/50 text-slate-300 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl"></div>
                  )}
                  <div
                    className={`relative z-10 transition-transform duration-200 flex-shrink-0 ${
                      isActive ? "scale-110" : "group-hover:scale-105"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={
                        isActive
                          ? "text-white"
                          : "text-slate-400 group-hover:text-white"
                      }
                    />
                  </div>
                  <span
                    className={`relative z-10 ml-3 font-medium transition-all duration-300 whitespace-nowrap overflow-hidden ${
                      isCollapsed
                        ? "opacity-0 w-0 ml-0"
                        : "opacity-100 w-auto ml-3"
                    } ${isActive ? "text-white" : "group-hover:text-white"}`}
                  >
                    {item.label}
                  </span>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isActive ? "hidden" : ""
                    }`}
                  ></div>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 bg-white/10 transition-opacity duration-150"></div>
                </Link>

                {isCollapsed && (
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap shadow-lg border border-slate-600">
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45 border-l border-b border-slate-600"></div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info - always visible regardless of route */}
      <div
        className={`px-4 mb-4 transition-all duration-300 overflow-hidden flex-shrink-0 ${
          isCollapsed ? "opacity-0 h-0" : "opacity-100 h-auto"
        }`}
      >
        <div className="flex items-center p-3 rounded-lg bg-slate-800/50 border border-slate-700">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <img
              className="h-8 w-14 rounded-full object-cover border-2 border-white shadow-sm"
              src={user?.profileImg}
              alt="Profile"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium whitespace-nowrap">
              {user?.userName}
            </p>
            <p className="text-xs text-slate-400 whitespace-nowrap">
              {user?.userEmail}
            </p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 pb-6 flex-shrink-0">
        <Link
          to="/"
          onClick={handleLogout}
          className="group flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/50 text-decoration-none"
        >
          <LogOut
            size={20}
            className="text-slate-400 group-hover:text-red-400 transition-colors duration-200 flex-shrink-0"
          />
          <span
            className={`font-medium transition-all duration-300 whitespace-nowrap overflow-hidden ${
              isCollapsed ? "opacity-0 w-0 ml-0" : "opacity-100 w-auto ml-3"
            } group-hover:text-red-400`}
          >
            Logout
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
