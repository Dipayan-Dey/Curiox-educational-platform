import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../../Context/CourseContext";
import { Server } from "../../../main";
import { Clock, User, Star, BookOpen,Play,Award,Users,Globe } from "lucide-react";
import LoadingScreen from "../../Loading/LoadingScreen";
// import { Star, User, Clock, Play, BookOpen, Award, Users, Globe } from 'lucide-react';

function CourseStudy({ user }) {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  if (
    user &&
    user.userRole !== "admin" &&
    !user.subscription.includes(params.id)
  ) {
    return navigate("/");
  }
  const { fetchCourse, course } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? <LoadingScreen /> : <></>}
      {course && (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 p-4 pt-30 pb-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Course Image */}
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {course.category}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {/* {course.level} */}
                      Beginner to Advanced
                    </span>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-medium">
                        4.8
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6 sm:p-8">
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {course.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium">
                      {" "}
                      Instructor : - {course.createdBy}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <span>{course.duration} Weeks</span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <span>{course.students.toLocaleString()} students</span>
                </div> */}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    About this course
                  </h2>
                  <ul className="text-gray-700 leading-relaxed text-md sm:text-lg font-medium">
                    {course.description.split("\n").map((e,i)=>(

                    <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>

                {/* Price and CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    {/* <div>
                      <span className="text-3xl font-bold text-indigo-600">
                        ₹{course.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 ml-2 line-through">
                        ₹{(course.price * 1.5).toLocaleString()}
                      </span>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      33% OFF
                    </span> */}
                  </div>
                  <Link
                    to={`/lactures/${course._id}`}
                    className="flex-1 sm:flex-none border-2 border-orange-500 text-orange-500 hover:bg-orange-100 px-8 py-3 rounded-xl font-semibold transition-colors duration-200"
                  >
                    See Lactures
                  </Link>
                  {/* <Link
                  
                    to={`/docs/${course._id}`}
                    className="flex-1 sm:flex-none border-2 border-orange-500 text-orange-500 hover:bg-orange-100 px-8 py-3 rounded-xl font-semibold transition-colors duration-200"
                  >
                   Read Docs
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseStudy;
