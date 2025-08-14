import React, { useEffect, useRef, useState } from "react";
import {
  Award,
  BookOpen,
  Check,
  ChevronRight,
  ChevronLeft,
  Play,
  Star,
  Users,
} from "lucide-react";
import { CourseData } from "../../../Context/CourseContext";
import CourseCard from "./CourseCard";
import { UserData } from "../../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import ProfessionalLoadingScreen from "../../Loading/LoadingScreen";

function Courses() {
  const { courses } = CourseData();
  const { user, isAuth,loading } = UserData();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position to show/hide navigation buttons
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Initialize scroll position check
  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, [courses]);

  // Scroll left function - scroll by exactly 3 cards
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Fixed card width + padding
      const gap = 32; // 2rem gap
      const scrollAmount = (cardWidth + gap) * 3; // Scroll exactly 3 cards
      
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Scroll right function - scroll by exactly 3 cards
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Fixed card width + padding
      const gap = 32; // 2rem gap
      const scrollAmount = (cardWidth + gap) * 3; // Scroll exactly 3 cards
      
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };
   

  // Prevent rendering for admins (except superadmin)
  if (isAuth && user?.userRole === "admin" && user?.userMainRole !== "superadmin") {
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
    <div className="bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white">
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="courses">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
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

          {/* Courses Section */}
          {courses && courses.length > 0 ? (
            <div className="relative">
              {/* Navigation Buttons */}
              {canScrollLeft && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 -ml-6"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              
              {canScrollRight && (
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 -mr-6"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Scrollable Container */}
              <div
                ref={scrollContainerRef}
                onScroll={checkScrollPosition}
                className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {courses.map((course, index) => (
                  <div key={course._id} className="flex-shrink-0 w-80 course-card">
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>

              {/* Scroll Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: Math.ceil(courses.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (scrollContainerRef.current) {
                        const cardWidth = 320;
                        const gap = 32;
                        const scrollAmount = (cardWidth + gap) * 3;
                        scrollContainerRef.current.scrollTo({
                          left: scrollAmount * index,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="w-3 h-3 rounded-full bg-gray-600 hover:bg-purple-500 transition-all duration-300"
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto border border-gray-700/50">
                <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">No Courses Available</h3>
                <p className="text-gray-300">
                  Check back soon for new courses or contact us for updates.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default Courses;