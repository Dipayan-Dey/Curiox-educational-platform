import React from "react";
import {
  Award,
  BookOpen,
  Check,
  ChevronRight,
  Play,
  Star,
  Users,
} from "lucide-react";
import { CourseData } from "../../../Context/CourseContext";
import CourseCard from "./CourseCard";

const dummycourses = [
  {
    title: "Web Development Mastery",
    students: "2.4k",
    rating: 4.9,
    price: "$99",
    image: "🌐",
  },
  {
    title: "Data Science Fundamentals",
    students: "1.8k",
    rating: 4.8,
    price: "$129",
    image: "📊",
  },
  {
    title: "Digital Marketing Pro",
    students: "3.2k",
    rating: 4.9,
    price: "$79",
    image: "📈",
  },
  {
    title: "UX/UI Design Complete",
    students: "1.5k",
    rating: 4.7,
    price: "$109",
    image: "🎨",
  },
];

function Courses() {
  const { courses } = CourseData();
  // console.log(courses);
  return (
    <div className=" bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white">
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="courses">
        <div className="max-w-7xl mx-auto">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <p>No Course Yet...</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Courses;
