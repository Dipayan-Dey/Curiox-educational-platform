import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Home, BookOpen, Info, Users, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Server } from "../../main";
import logo from "../../assets/navlogo.png";
import { toast } from "react-toastify";
import { UserData } from "../../Context/UserContext";
import titlelogo from "../../assets/titlelogo.png"

const Navbar = ({ isAuth, user }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setisAuth, setUser } = UserData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "About", href: "/about", icon: Info },
    { name: "Instructors", href: "/instructors", icon: Users },
    { name: "Account", href: "/account", icon: User },
  ];

  const handleLogout = () => {
    localStorage.clear();
    setUser([]);
    setisAuth(false);
    toast.success("Logout Successfully");
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-xl"
          : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button - Left */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg r-2 text-white hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <Menu className="w-8 h-8" />
            </button>

            {/* Logo */}
            <div className="flex items-center cursor-pointer">
              <img src={logo} alt="CurioX" className="h-30 md:h-50 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white font-semibold hover:text-purple-800 transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-purple-800 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center">
              {!isAuth ? (
                <Link to="/login">
                  <button className="bg-blue-600 hover:bg-blue-700  text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                    Login
                  </button>
                </Link>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  <img
                    className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
                    src={user.profileImg}
                    alt="Profile"
                  />
                  <span className="text-white font-medium">
                    Welcome, {user.userName?.split(" ")[0]}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {/* Mobile Sidebar */}
        <div
          className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <img src={titlelogo} alt="CurioX" className="h-15 w-auto" />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* User Info - Mobile */}
          {isAuth && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-4">
                <img
                  className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                  src={user.profileImg}
                  alt="Profile"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {user.userName}
                  </p>
                  <p className="text-sm text-gray-600">{user.userRole==="admin"?"Teacher":"Student"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="py-6">
            <nav className="space-y-2 px-6">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* Auth Actions */}
            <div className="px-6 mt-8">
              {!isAuth ? (
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
            <p className="text-center text-sm text-gray-600">
              © 2025 CurioX. Learn. Grow. Excel.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;