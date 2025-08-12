import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Server } from "../../main";
import logo from "../../assets/curiox logo 1.png";
import { toast } from "react-toastify";
import { UserData } from "../../Context/UserContext";

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
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About", href: "/about" },
    { name: "Instructors", href: "/instructors" },
    { name: "Account", href: "/account" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <img src={logo} alt="" className="h-20 w-40 pt-2" />
            {/* <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
            </div> */}
            <div className="flex flex-col">
              {/* <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                CurioX
              </span> */}
              {/* <span className="text-xs text-gray-400">Learn. Grow. Excel.</span> */}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-xl font-medium transition-all duration-300 relative group text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Get Started Button - Desktop */}
            {!isAuth ? (
              <Link to="/login">
                <button className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                  <span>Login</span>
                  <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                </button>
              </Link>
            ) : (
              <div className="hidden md:flex items-center gap-4  px-4 py-2 rounded-md ">
                <img
                  className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
                  src={user.profileImg}
                  alt="Profile"
                />
                <h1 className="text-white text-base md:text-xl font-semibold">
                  Welcome, {user.userName?.split(" ")[0]}
                </h1>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl transition-all duration-300 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white backdrop-blur-sm"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 ${
            isMenuOpen
              ? "w-full max-h-screen opacity-100 py-10 rounded-b-2xl"
              : "max-h-0 opacity-0 py-0"
          } overflow-hidden`}
        >
          <div className="border-t border-gray-700/50 ">
            <div className="flex flex-col space-y-4 text-center">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 rounded-xl font-medium transition-all duration-300 text-gray-300 hover:text-white hover:bg-gray-800/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              {/* Mobile Get Started Button */}
              {!isAuth ? (
                <div
                  onClick={() => navigate("/login")}
                  className=" flex justify-center items-center pt-4 border-t border-gray-200/20"
                >
                  <button className="w-[200px] bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                    Login
                  </button>
                </div>
              ) : (
                <div
                  onClick={()=>{
                    localStorage.clear();
                       setUser([]);
                       setisAuth(false);
                       toast.success("Logout Successfully");
                       navigate("/");
                    // alert()
                  }}
                  className=" flex justify-center items-center pt-4 border-t border-gray-200/20"
                >
                  <button className=" cursor-pointer w-[200px] bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
