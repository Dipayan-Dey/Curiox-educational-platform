import React from 'react';
import { Play, ArrowRight, BookOpen, Users, Star, Award, Clock, CheckCircle, PlayCircle, Target, Globe, TrendingUp, Shield, Briefcase } from 'lucide-react';
import Courses from '../courses/Courses';
import About from '../About/About';
// import About from "../"

export default function Home() {
  return (
    <>
    
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Professional Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
          alt="Professional team collaboration" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Professional Hero Content */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 lg:pt-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Professional Trust Badge */}
          {/* <div className="flex items-center justify-center lg:justify-start mb-8 lg:mb-12">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 lg:px-6 lg:py-4">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                  <span className="text-sm lg:text-base font-semibold text-white">Enterprise Trusted</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/30"></div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-xs lg:text-sm font-medium text-gray-300 ml-2">4.9 (12,500+ reviews)</span>
                </div>
              </div>
            </div>
          </div> */}

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left Column - Professional Content */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-10 text-center lg:text-left">
              
              {/* Professional Heading */}
              <div className="space-y-4 lg:space-y-6">
                <h1 className="mt-0 md:mt-10 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-white">
                  Curiosity
                  <br />
                  <span className="text-blue-400">Meets</span>
                  <br />
                  Experience
                </h1>
                <div className="w-16 lg:w-24 h-1 bg-blue-500 rounded-full mx-auto lg:mx-0"></div>
              </div>

              {/* Professional Description */}
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl font-light mx-auto lg:mx-0">
               Transform your potential into expertise with our interactive e-learning platform. Learn from industry experts and build real-world skills.
              </p>

              {/* Professional Feature highlights */}
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 lg:gap-6 max-w-2xl mx-auto lg:mx-0">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block text-sm lg:text-base">Industry-Relevant</span>
                    <span className="text-gray-400 text-xs lg:text-sm">Real-world applications</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 lg:w-6 lg:h-6 text-purple-400" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block text-sm lg:text-base">Certified</span>
                    <span className="text-gray-400 text-xs lg:text-sm">Globally recognized</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-green-400" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block text-sm lg:text-base">Career Growth</span>
                    <span className="text-gray-400 text-xs lg:text-sm">Proven advancement</span>
                  </div>
                </div>
              </div>

              {/* Professional CTA Section */}
              {/* <div className="space-y-6 lg:space-y-8">
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <button className="group bg-blue-600 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-lg font-semibold text-base lg:text-lg hover:bg-blue-700 transition-all shadow-xl flex items-center space-x-2 w-full sm:w-auto justify-center">
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button className="group flex items-center space-x-3 lg:space-x-4 text-gray-300 hover:text-white transition-colors w-full sm:w-auto justify-center lg:justify-start">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/30 transition-all">
                      <PlayCircle className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm lg:text-base">View Demo</div>
                      <div className="text-xs lg:text-sm text-gray-400">3 min overview</div>
                    </div>
                  </button>
                </div>
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6 text-xs lg:text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-400" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-400" />
                    <span>No setup fees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-400" />
                    <span>Cancel anytime</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-400" />
                    <span>Enterprise support</span>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Right Column - Professional Course Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative max-w-md mx-auto lg:max-w-none">
                {/* Professional course card */}
                <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Course thumbnail */}
                  <div className="aspect-video bg-black/50 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                      alt="Digital Leadership Course" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition-all cursor-pointer">
                        <Play className="w-5 h-5 lg:w-6 lg:h-6 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 lg:top-4 lg:left-4 bg-blue-600/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      <span className="text-white text-xs lg:text-sm font-semibold">Featured Program</span>
                    </div>
                    <div className="absolute bottom-3 left-3 lg:bottom-4 lg:left-4 text-white">
                      <h3 className="text-lg lg:text-xl font-bold">Digital Leadership Certificate</h3>
                      <p className="text-sm text-blue-200">Executive-level strategic thinking</p>
                    </div>
                  </div>
                  
                  {/* Professional course details */}
                  <div className="p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 lg:mb-6 space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-semibold text-sm lg:text-base">4.9</span>
                          <span className="text-gray-400 text-xs lg:text-sm">(847 reviews)</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400 text-xs lg:text-sm">
                        <Users className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span>1,234 executives</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 lg:space-y-4">
                      <div className="flex items-center space-x-2 text-gray-400 text-xs lg:text-sm">
                        <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span>8 weeks • Self-paced • 3-5 hrs/week</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 text-xs lg:text-sm">
                        <Award className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span>Stanford University Certificate</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 text-xs lg:text-sm">
                        <Globe className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span>Available in 12 languages</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xl lg:text-2xl font-bold text-white">$299</span>
                        <span className="text-xs lg:text-sm text-gray-400">Enterprise pricing available</span>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all text-sm lg:text-base">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Professional floating elements */}
                {/* <div className="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 bg-black/50 backdrop-blur-lg border border-white/20 rounded-xl p-3 lg:p-4 shadow-xl">
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-lg flex items-center justify-center">
                      <Award className="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xs lg:text-sm">Accredited</div>
                      <div className="text-gray-400 text-xs">University Partner</div>
                    </div>
                  </div>
                </div> */}
                
                {/* <div className="absolute -bottom-4 -left-3 lg:-bottom-6 lg:-left-4 bg-black/50 backdrop-blur-lg border border-white/20 rounded-xl p-3 lg:p-4 shadow-xl">
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xs lg:text-sm">1:1 Mentoring</div>
                      <div className="text-gray-400 text-xs">Industry experts</div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Professional Stats Section */}
          <div className="mb-15 bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-6 lg:p-8 mt-16 lg:mt-24">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <div className="text-center">
                <div className="text-2xl lg:text-4xl font-bold text-blue-400 mb-2">50K+</div>
                <div className="text-gray-300 font-medium text-sm lg:text-base">Professionals Trained</div>
                <div className="text-xs text-gray-500 mt-1">Across 150+ countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-4xl font-bold text-purple-400 mb-2">200+</div>
                <div className="text-gray-300 font-medium text-sm lg:text-base">Enterprise Clients</div>
                <div className="text-xs text-gray-500 mt-1">Fortune 500 companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-4xl font-bold text-green-400 mb-2">95%</div>
                <div className="text-gray-300 font-medium text-sm lg:text-base">Completion Rate</div>
                <div className="text-xs text-gray-500 mt-1">Industry-leading engagement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-4xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-gray-300 font-medium text-sm lg:text-base">Expert Support</div>
                <div className="text-xs text-gray-500 mt-1">Premium assistance</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
      <About/>
      <Courses/>
    </>
  );
}