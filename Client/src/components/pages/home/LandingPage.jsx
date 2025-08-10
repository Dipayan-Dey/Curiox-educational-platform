import { useEffect, useState } from "react";
import { useTheme } from "../../ThemeContext ";
import { Award, BookOpen, Check, ChevronRight, Play, Star, Users } from "lucide-react";
import Courses from "../courses/Courses";

const LandingPage = () => {
  const { isDark } = useTheme();
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
    <div className="pt-20">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                    Curiosity
                  </span>
                  <br />
                  meets
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Experience
                  </span>
                </h1>
                <p
                  className={`text-xl ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } max-w-lg`}
                >
                  Transform your potential into expertise with our interactive
                  e-learning platform. Learn from industry experts and build
                  real-world skills.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2">
                  <span>Start Learning</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  className={`${
                    isDark
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-gray-50"
                  } px-8 py-4 rounded-full text-lg font-semibold border-2 ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  } hover:shadow-lg transition-all flex items-center justify-center space-x-2`}
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {["👨‍💻", "👩‍🎨", "👨‍💼", "👩‍🔬"].map((avatar, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-sm border-2 border-white"
                      >
                        {avatar}
                      </div>
                    ))}
                  </div>
                  <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                    10,000+ learners
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                    4.9/5
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  isDark
                    ? "from-purple-500/20 to-pink-500/20"
                    : "from-blue-500/20 to-purple-500/20"
                } rounded-3xl blur-3xl`}
              ></div>
              <div
                className={`relative ${
                  isDark ? "bg-gray-800/50" : "bg-white/70"
                } backdrop-blur-xl rounded-3xl p-8 border ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-4 p-4 rounded-xl transition-all cursor-pointer ${
                        activeFeature === index
                          ? `bg-gradient-to-r ${
                              isDark
                                ? "from-purple-500/20 to-pink-500/20"
                                : "from-blue-500/20 to-purple-500/20"
                            } scale-105`
                          : `${
                              isDark
                                ? "hover:bg-gray-700/50"
                                : "hover:bg-gray-50"
                            }`
                      }`}
                      onClick={() => setActiveFeature(index)}
                    >
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${
                          isDark
                            ? "from-purple-500 to-pink-500"
                            : "from-blue-500 to-purple-500"
                        } text-white`}
                      >
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {feature.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            isDark ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
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
      <section
        className={`py-20 ${
          isDark ? "bg-gray-800/30" : "bg-white/50"
        } backdrop-blur-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Active Learners" },
              { number: "500+", label: "Expert Courses" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <Courses/>

      {/* Testimonials */}
      <section
        className={`py-20 ${
          isDark ? "bg-gray-800/30" : "bg-white/50"
        } backdrop-blur-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Learners Say
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`${
                  isDark ? "bg-gray-800/50" : "bg-white/70"
                } backdrop-blur-xl rounded-2xl p-8 border ${
                  isDark ? "border-gray-700" : "border-gray-200"
                } hover:shadow-xl transition-all`}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p
                  className={`${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } leading-relaxed`}
                >
                  "{testimonial.content}"
                </p>
                <div className="flex space-x-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`${
              isDark ? "bg-gray-800/50" : "bg-white/70"
            } backdrop-blur-xl rounded-3xl p-12 border ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Learning Journey?
              </span>
            </h2>
            <p
              className={`text-xl ${
                isDark ? "text-gray-300" : "text-gray-600"
              } mb-8 max-w-2xl mx-auto`}
            >
              Join thousands of learners who have transformed their careers with
              Curiox. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all">
                Start Free Trial
              </button>
              <button
                className={`${
                  isDark
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-50"
                } px-8 py-4 rounded-full text-lg font-semibold border-2 ${
                  isDark ? "border-gray-700" : "border-gray-200"
                } hover:shadow-lg transition-all`}
              >
                View All Courses
              </button>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-8 text-sm">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage