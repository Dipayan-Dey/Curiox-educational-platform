import { useEffect, useState } from "react";
import { Award, BookOpen, Check, ChevronRight, Play, Star, Users } from "lucide-react";
import Courses from "../courses/Courses";
import Instructor from "../Instructors/Instructor";
import About from "../About/About";

const Home = ({ isAuth }) => {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Interactive Learning",
      description: "Engage with dynamic content and hands-on exercises",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals and certified educators",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certified Courses",
      description: "Earn recognized certificates upon course completion",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      content:
        "Curiox transformed my career. The interactive approach made learning enjoyable and effective.",
      avatar: "👩‍💻",
    },
    {
      name: "Mike Chen",
      role: "Data Analyst",
      content:
        "The quality of instruction and hands-on projects exceeded my expectations. Highly recommended!",
      avatar: "👨‍💼",
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      content:
        "Best investment I've made in my professional development. The community support is amazing.",
      avatar: "👩‍🎨",
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4 text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Curiosity
                  </span>
                  <br />
                  <span className="text-white">meets</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Experience
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-lg">
                  Transform your potential into expertise with our interactive e-learning platform.
                  Learn from industry experts and build real-world skills.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all flex items-center justify-center space-x-2">
                  <span>Start Learning</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="bg-gray-800/50 hover:bg-gray-700/50 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg font-semibold border-2 border-gray-600 hover:border-gray-500 hover:shadow-lg transition-all flex items-center justify-center space-x-2 backdrop-blur-sm">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center space-x-4 text-sm mt-6">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {["\ud83d\udc68\u200d\ud83d\udcbb", "\ud83d\udc69\u200d\ud83c\udfa8", "\ud83d\udc68\u200d\ud83d\udcbc", "\ud83d\udc69\u200d\ud83c\udf93"].map((avatar, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-sm border-2 border-gray-800"
                      >
                        {avatar}
                      </div>
                    ))}
                  </div>
                  <span className="text-gray-300">10,000+ learners</span>
                </div>
                <div className="flex items-center space-x-1 mt-2 sm:mt-0">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-300">4.9/5</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-700">
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-4 p-4 rounded-xl transition-all cursor-pointer ${
                        activeFeature === index
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 scale-105"
                          : "hover:bg-gray-700/50"
                      }`}
                      onClick={() => setActiveFeature(index)}
                    >
                      <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg text-white">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Active Learners" },
              { number: "500+", label: "Expert Courses" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <About/>
      <Courses />
      <Instructor/>

      {/* Testimonials and CTA remain unchanged for brevity */}
    </div>
  );
};

export default Home;
