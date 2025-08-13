import React, { useEffect, useState } from "react";
import { UserData } from "../../../Context/UserContext";
import axios from "axios";
import { Server } from "../../../main";
import { toast } from "react-toastify";

function Instructor() {
  const { user } = UserData();
  const [users, setUsers] = useState([]);

  // Sample instructor data - replace with actual API data
  const sampleInstructors = [
    {
      id: 1,
      userName: "Mr. Arijit Mondal",
      profileImg: "https://media.licdn.com/dms/image/v2/D4D35AQGqlWawA0WHOQ/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1682005636413?e=1755673200&v=beta&t=uE_esBrUb2VGAwikvUdKspK_TmmrKYF4Rbeca-TdgBY",
      userRole: "admin",
      email: "am@gmail.com",
      specialization: "Data Scientist & AI Engineer",
      experience: "8 Years",
      studentsCount: "350+",
      rating: "4.9",
      description: "Expert in Machine Learning and Data Science with extensive research background.",
      viewprofile:"https://www.linkedin.com/in/arijit-mondal-9121601b3/"
    },
    {
      id: 2,
      userName: "Dipayan Dey",
      profileImg: "https://media.licdn.com/dms/image/v2/D4D35AQEEBIrp796hBQ/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1736313749444?e=1755673200&v=beta&t=BOEOMfUzblmWB3h09oEC3LeeIBvvolggkb7tUnyepKo",
      userRole: "admin",
      email: "dipayandey49@gmail.com",
      specialization: "Full Stack Developer & Data Analyst",
      experience: "6 Years",
      studentsCount: "280+",
      rating: "4.8",
      description: "Full-stack developer and educator specializing in modern web technologies and also Data Analysis and Visulization.",
      viewprofile:"https://www.linkedin.com/in/dipayan-dey-033b38309/"
    },
    {
      id: 3,
      userName: "Mr. Kartik Barman",
      profileImg: "https://media.licdn.com/dms/image/v2/D5635AQHhPThF-JeWEw/profile-framedphoto-shrink_400_400/B56ZT6nFWGGoAc-/0/1739371337378?e=1755673200&v=beta&t=ejgUh_KcjXMB-jYrde8i9-a1PPan3Eu7dQ3a1F-3SGk",
      userRole: "admin",
      email: "rk@gmail.com",
      specialization: "Full Stack Developer & Mobile App Developer",
      experience: "7 Years",
      studentsCount: "420+",
      rating: "4.9",
      description: "iOS and Android development expert with a passion for user experience design.",
      viewprofile:"https://www.linkedin.com/in/kartik-barman/"
    }
  ];

  // async function fetchAllUsers() {
  //   try {
  //     const { data } = await axios.get(`${Server}/api/admin/allUsers`, {
  //       headers: {
  //         token: localStorage.getItem("token"),
  //       },
  //     });
  //     setUsers(data.users);
  //   } catch (error) {
  //     console.log("Using sample data - API not available");
  //     // Use sample data when API is not available
  //     setUsers(sampleInstructors);
  //   }
  // }

  // useEffect(() => {
  //   fetchAllUsers();
  // }, []);

  // Filter for instructors - check both API data and sample data
  const instructors = users.length > 0 
    ? users.filter((e) => e.userRole === "admin")
    : sampleInstructors;

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
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl mb-4">
              Meet Our Instructors
            </h1>
            <div className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full mx-auto w-20 md:w-32"></div>
          </div>
          <p className="text-gray-300 text-base md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed px-4">
            Discover the passionate educators who will guide your learning journey
          </p>
        </div>

        {/* Instructors Grid - Improved Responsive Design */}
        {sampleInstructors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto px-4">
            {sampleInstructors.map((instructor, index) => (
              <div
                key={instructor.id || index}
                className="group relative w-full"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl sm:rounded-3xl blur-sm sm:blur-lg opacity-0 group-hover:opacity-75 transition-all duration-700"></div>
                
                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-white/95 via-white/90 to-purple-50/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden transform transition-all duration-500 group-hover:scale-105 h-full">
                  {/* Card Header with Animated Background */}
                  <div className="relative h-12 sm:h-16 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transform transition-transform duration-700 group-hover:scale-110"></div>
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full shadow-lg animate-pulse"></div>
                    </div>
                  </div>

                  {/* Profile Section */}
                  <div className="relative -mt-8 sm:-mt-10 px-3 sm:px-4 pb-4 sm:pb-6">
                    {/* Profile Image Container */}
                    <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-75"></div>
                      <div className="relative w-full h-full p-0.5">
                        <img
                          src={instructor.profileImg || "https://via.placeholder.com/150"}
                          alt={instructor.userName}
                          className="w-full h-full rounded-full object-cover border-2 border-white shadow-xl sm:shadow-2xl transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Floating Role Badge */}
                      <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-lg transform transition-all duration-500 group-hover:scale-110">
                        <span className="text-xs">✨</span>
                        <span className="hidden sm:inline">Instructor</span>
                      </div>
                    </div>

                    {/* Name with Gradient */}
                    <h2 className="text-base sm:text-lg font-bold text-center mb-2 bg-gradient-to-r from-gray-800 via-purple-800 to-blue-800 bg-clip-text text-transparent line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center">
                      {instructor.userName}
                    </h2>

                    {/* Specialization */}
                    {instructor.specialization && (
                      <p className="text-purple-600 font-medium text-xs sm:text-sm text-center mb-2">
                        {instructor.specialization}
                      </p>
                    )}

                    {/* Animated Divider */}
                    <div className="flex justify-center mb-3">
                      <div className="h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full transform transition-all duration-700 group-hover:w-12 sm:group-hover:w-16 w-6 sm:w-8"></div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-xs sm:text-sm text-center mb-4 leading-relaxed line-clamp-3 min-h-[3rem] sm:min-h-[3.5rem]">
                      {instructor.description || "Passionate educator guiding student success with years of experience."}
                    </p>

                    {/* Stats */}
                    <div className="mb-4 flex justify-center space-x-3 sm:space-x-4 text-xs">
                      <div className="text-center">
                        <div className="font-semibold text-purple-600 text-sm">
                          {instructor.experience || "5+"}
                        </div>
                        <div className="text-gray-500">Years</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-blue-600 text-sm">
                          {instructor.studentsCount || "200+"}
                        </div>
                        <div className="text-gray-500">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-indigo-600 text-sm">
                          {instructor.rating || "4.9"}
                        </div>
                        <div className="text-gray-500">Rating</div>
                      </div>
                    </div>

                    {/* Interactive Buttons */}
                    <div className="space-y-2">
                        <a href={instructor.viewprofile}>
                      <button className="cursor-pointer w-full px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group/btn text-xs sm:text-sm">
                        <span className="flex items-center justify-center space-x-1">
                          
                        <span>View Profile</span>
                          <svg className="w-3 h-3 transform transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </button>
                      </a>
                      
                      {/* <button className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-white/80 backdrop-blur-sm border border-purple-200 hover:border-purple-400 text-purple-700 font-medium rounded-xl transition-all duration-300 hover:bg-white/90 hover:shadow-lg transform hover:scale-105 text-xs sm:text-sm">
                        Contact
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-20 px-4">
            <div className="inline-block p-6 sm:p-8 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/20">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-gray-300 text-base sm:text-lg font-medium">
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