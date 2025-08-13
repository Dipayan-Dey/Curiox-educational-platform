import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Learn more about our company, mission, and the people behind our
            success.
          </p>
        </div>

        {/* Company Overview */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-2xl p-8 mb-12 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6">Who We Are</h2>
          <div className="prose prose-lg text-gray-300 leading-relaxed">
            <p className="mb-6">
              Curiox is an innovative platform designed to connect learners,
              creators, and educators in one powerful ecosystem. We provide
              interactive courses, skill-based challenges, and collaborative
              projects — all in a seamless and engaging environment.
            </p>
            <p className="mb-6">
              Whether you’re a student looking to master new skills, a
              professional seeking career growth, or a mentor wanting to share
              expertise, Curiox offers tools to make learning more immersive and
              outcome-driven.
            </p>
            <p>
              Our focus is on community-driven learning, real-world
              problem-solving, and empowering individuals to turn knowledge into
              impactful results.
            </p>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-400"
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
            <h3 className="text-xl font-semibold text-white mb-3">
              Our Mission
            </h3>
            <p className="text-gray-300">
              To make quality education, mentorship, and collaboration
              accessible to everyone, everywhere.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-400"
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
            <h3 className="text-xl font-semibold text-white mb-3">
              Our Vision
            </h3>
            <p className="text-gray-300">
              To be the world's leading educational platform, recognized for
              innovation, excellence, and positive impact on global education.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-400"
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
            <h3 className="text-xl font-semibold text-white mb-3">
              Our Values
            </h3>
            <p className="text-gray-300">
              Collaboration, innovation, inclusivity, and real-world impact
              guide every step of our journey.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-2xl p-8 mb-12 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
              <div className="text-gray-300">Students Enrolled</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-gray-300">Expert Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">
                200+
              </div>
              <div className="text-gray-300">Courses Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">95%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-2xl p-8 mb-12 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6">
            Our Leadership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-600/50 rounded-full mx-auto mb-4 flex items-center justify-center border border-white/20 overflow-hidden">
                <img
                  src="https://media.licdn.com/dms/image/v2/D5635AQHhPThF-JeWEw/profile-framedphoto-shrink_400_400/B56ZT6nFWGGoAc-/0/1739371337378?e=1755673200&v=beta&t=ejgUh_KcjXMB-jYrde8i9-a1PPan3Eu7dQ3a1F-3SGk"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl font-semibold text-white mb-1">
               Kartik Barman
              </h3>
              <p className="text-blue-400 mb-2">CEO & Founder</p>
              <p className="text-gray-300 text-sm">
                Leading the company with 15+ years of experience in educational
                technology.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-600/50 rounded-full mx-auto mb-4 flex items-center justify-center border border-white/20 overflow-hidden">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D35AQGqlWawA0WHOQ/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1682005636413?e=1755673200&v=beta&t=uE_esBrUb2VGAwikvUdKspK_TmmrKYF4Rbeca-TdgBY"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Arijit Mondal
              </h3>
              <p className="text-green-400 mb-2">CTO</p>
              <p className="text-gray-300 text-sm">
                Driving technological innovation with expertise in platform
                development.
              </p>
            </div>

            <div className="text-center">
             <div className="w-32 h-32 bg-gray-600/50 rounded-full mx-auto mb-4 flex items-center justify-center border border-white/20 overflow-hidden">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D35AQEEBIrp796hBQ/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1736313749444?e=1755673200&v=beta&t=BOEOMfUzblmWB3h09oEC3LeeIBvvolggkb7tUnyepKo"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Dipayan Dey
              </h3>
              <p className="text-purple-400 mb-2">Head of Education</p>
              <p className="text-gray-300 text-sm">
                Ensuring quality education delivery with 20+ years in curriculum
                design.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-2xl p-8 text-center text-white border border-white/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Learn With Us?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of students who have already transformed their
            careers through our platform. Start your learning journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() =>
            window.open(
              "https://wa.me/8389806944?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20your%20courses.",
              "_blank"
            )
          }
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
          title="Chat with us on WhatsApp"
        >
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default About;
