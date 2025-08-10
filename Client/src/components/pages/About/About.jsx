import React, { useState, useEffect } from 'react'

function About() {
  const [activeSection, setActiveSection] = useState('mission')
  const [isVisible, setIsVisible] = useState(false)
  const [stats, setStats] = useState({ projects: 0, clients: 0, years: 0 })

  // Animation for stats counter
  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setStats({ projects: 150, clients: 80, years: 5 })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Animate numbers
  const AnimatedCounter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0)
    
    useEffect(() => {
      let startTime
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, [end, duration])

    return <span>{count}</span>
  }

  const sections = {
    mission: {
      title: "Our Mission",
      content: "We believe in creating digital experiences that make a real difference in people's lives. Our mission is to bridge the gap between innovative technology and meaningful human connections."
    },
    story: {
      title: "Our Story", 
      content: "Founded with a passion for excellence, we've grown from a small team of dreamers to a dynamic company serving clients worldwide. Every project we take on is an opportunity to push boundaries and exceed expectations."
    },
    values: {
      title: "Our Values",
      content: "Innovation drives us forward, integrity guides our decisions, and collaboration fuels our success. We believe in transparency, continuous learning, and delivering results that speak for themselves."
    },
    team: {
      title: "Our Team",
      content: "We're a diverse group of creators, thinkers, and problem-solvers united by our love for what we do. From designers to developers, each team member brings unique perspectives that strengthen our collective vision."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 ">
      {/* Hero Section */}
      <div className={`pt-32 pb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
            About Us
          </h1>
          <p className="text-xl text-white mb-12 max-w-2xl mx-auto leading-relaxed">
            Crafting exceptional digital experiences with passion, precision, and purpose.
          </p>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <AnimatedCounter end={stats.projects} />+
              </div>
              <div className="text-gray-600 text-lg">Projects Completed</div>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                <AnimatedCounter end={stats.clients} />+
              </div>
              <div className="text-gray-600 text-lg">Happy Clients</div>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-green-600 mb-2">
                <AnimatedCounter end={stats.years} />+
              </div>
              <div className="text-gray-600 text-lg">Years Experience</div>
            </div>
          </div>
        </div>

        {/* Interactive Content Sections */}
        <div className="max-w-4xl mx-auto px-6">
          {/* Section Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(sections).map((key) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeSection === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md hover:scale-105'
                }`}
              >
                {sections[key].title}
              </button>
            ))}
          </div>

          {/* Active Section Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              {sections[activeSection].title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
              {sections[activeSection].content}
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto px-6 mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Work Together?</h3>
            <p className="text-xl mb-8 opacity-90">
              Let's create something amazing that makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                Get In Touch
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105">
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About