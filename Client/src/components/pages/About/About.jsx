import React from "react";
import { MessageCircle } from "lucide-react";

function About() {
  // Load professional font
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div 
      className="min-h-screen bg-gray-900 text-white"
      style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
    >
      {/* Subtle background pattern for depth */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,rgba(147,51,234,0.05)_25%,transparent_25%),linear-gradient(-45deg,rgba(147,51,234,0.05)_25%,transparent_25%)] bg-[size:60px_60px]"></div>
      </div>

      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 lg:mb-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">About CurioX</h1>
            <div className="w-24 h-1 bg-blue-500 rounded-full mx-auto mb-6"></div>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Empowering professionals worldwide through innovative learning experiences and industry-leading expertise.
            </p>
          </div>

          {/* Company Overview */}
          <div className="bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl p-8 lg:p-12 mb-16 border border-white/20">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">Who We Are</h2>
            <div className="prose prose-lg text-gray-300 leading-relaxed max-w-none">
              <p className="text-lg lg:text-xl mb-6 font-light">
                CurioX is a cutting-edge professional development platform designed to accelerate careers through 
                industry-relevant training, expert mentorship, and globally recognized certifications.
              </p>
              <p className="text-lg lg:text-xl mb-6 font-light">
                We serve Fortune 500 companies, emerging startups, and ambitious professionals who demand 
                excellence in their learning journey. Our platform combines theoretical knowledge with 
                practical application to deliver measurable career outcomes.
              </p>
              <p className="text-lg lg:text-xl font-light">
                With a focus on enterprise-grade quality and scalable learning solutions, CurioX transforms 
                how organizations and individuals approach professional development in the digital age.
              </p>
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl p-6 lg:p-8 border border-white/20 hover:border-blue-400/30 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-300 font-light leading-relaxed">
                To democratize access to world-class professional education, enabling 
                individuals and organizations to achieve unprecedented growth through 
                innovative learning methodologies.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl p-6 lg:p-8 border border-white/20 hover:border-green-400/30 transition-all duration-300">
              <div className="w-14 h-14 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold text-white mb-4">
                Our Vision
              </h3>
              <p className="text-gray-300 font-light leading-relaxed">
                To become the global standard for professional development, 
                recognized for transforming careers and driving organizational 
                excellence across industries worldwide.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl p-6 lg:p-8 border border-white/20 hover:border-purple-400/30 transition-all duration-300">
              <div className="w-14 h-14 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold text-white mb-4">
                Our Values
              </h3>
              <p className="text-gray-300 font-light leading-relaxed">
                Excellence, innovation, integrity, and measurable impact guide 
                every decision we make in delivering transformative learning 
                experiences to our global community.
              </p>
            </div>
          </div>

          {/* Statistics */}
          {/* <div className="bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl p-8 lg:p-12 mb-16 border border-white/20">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-center">
              Our Global Impact
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
              <div className="group">
                <div className="text-4xl lg:text-5xl font-bold text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300">50K+</div>
                <div className="text-gray-300 font-medium text-sm lg:text-base">Professionals Trained</div>
                <div className="text-gray-500 text-xs mt-1">Across 150+ countries</div>
              </div>
              <div className="group">
                <div className="text-4xl lg:text-5xl font-bold text-green-400 mb-3 group-hover:scale-110 transition-transform duration-300">200+</div>
                <div className="text-gray-300 font-medium text-sm lg:text-base">Enterprise Clients</div>
                <div className="text-gray-500 text-xs mt-1">Fortune 500 companies</div>
              </div>
              <div className="group">
                <div className="text-4xl lg:text-5xl font-bold text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-gray-300 font-medium text-sm lg:text-base">Expert Programs</div>
                <div className="text-gray-500 text-xs mt-1">Industry-leading curriculum</div>
              </div>
              <div className="group">
                <div className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-3 group-hover:scale-110 transition-transform duration-300">95%</div>
                <div className="text-gray-300 font-medium text-sm lg:text-base">Success Rate</div>
                <div className="text-gray-500 text-xs mt-1">Career advancement</div>
              </div>
            </div>
          </div> */}

          {/* Team Section */}
          <div className="bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl p-8 lg:p-12 mb-16 border border-white/20">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-center">
              Leadership Excellence
            </h2>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center group">
                <div className="w-36 h-36 lg:w-40 lg:h-40 bg-black/50 rounded-2xl mx-auto mb-6 flex items-center justify-center border-2 border-white/20 overflow-hidden group-hover:border-blue-400/50 transition-all duration-300">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5635AQHhPThF-JeWEw/profile-framedphoto-shrink_400_400/B56ZT6nFWGGoAc-/0/1739371337378?e=1755673200&v=beta&t=ejgUh_KcjXMB-jYrde8i9-a1PPan3Eu7dQ3a1F-3SGk"
                    alt="Kartik Barman"
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2">
                  Kartik Barman
                </h3>
                <p className="text-blue-400 mb-3 font-medium">CEO & Founder</p>
                <p className="text-gray-300 text-sm lg:text-base font-light leading-relaxed">
                  Visionary leader with 15+ years of experience transforming educational 
                  technology and driving enterprise-scale digital learning solutions.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-36 h-36 lg:w-40 lg:h-40 bg-black/50 rounded-2xl mx-auto mb-6 flex items-center justify-center border-2 border-white/20 overflow-hidden group-hover:border-green-400/50 transition-all duration-300">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4D35AQGqlWawA0WHOQ/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1682005636413?e=1755673200&v=beta&t=uE_esBrUb2VGAwikvUdKspK_TmmrKYF4Rbeca-TdgBY"
                    alt="Arijit Mondal"
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2">
                  Arijit Mondal
                </h3>
                <p className="text-green-400 mb-3 font-medium">Chief Technology Officer</p>
                <p className="text-gray-300 text-sm lg:text-base font-light leading-relaxed">
                  Technology innovator specializing in scalable platform architecture 
                  and cutting-edge educational technology infrastructure.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-36 h-36 lg:w-40 lg:h-40 bg-black/50 rounded-2xl mx-auto mb-6 flex items-center justify-center border-2 border-white/20 overflow-hidden group-hover:border-purple-400/50 transition-all duration-300">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4D35AQEEBIrp796hBQ/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1736313749444?e=1755673200&v=beta&t=BOEOMfUzblmWB3h09oEC3LeeIBvvolggkb7tUnyepKo"
                    alt="Dipayan Dey"
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2">
                  Dipayan Dey
                </h3>
                <p className="text-purple-400 mb-3 font-medium">Head of Education Excellence</p>
                <p className="text-gray-300 text-sm lg:text-base font-light leading-relaxed">
                  Educational strategist with 20+ years crafting world-class curricula 
                  and ensuring exceptional learning outcomes for global organizations.
                </p>
              </div>
            </div>
          </div>

          {/* Professional CTA */}
          <div className="bg-blue-600 rounded-2xl shadow-2xl p-8 lg:p-12 text-center text-white border border-blue-500/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Advance Your Career?</h2>
              <p className="text-blue-100 mb-8 max-w-3xl mx-auto text-lg lg:text-xl font-light leading-relaxed">
                Join thousands of professionals who have accelerated their careers through our 
                enterprise-grade learning platform. Transform your expertise today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-base lg:text-lg">
                  Start Free Trial
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 text-base lg:text-lg">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() =>
            window.open(
              "https://wa.me/8389806944?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20your%20professional%20courses.",
              "_blank"
            )
          }
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 group border border-green-400/30 backdrop-blur-sm"
          title="Connect with our team"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}

export default About;