import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function About() {
  const [activeSection, setActiveSection] = useState("mission");
  const [stats, setStats] = useState({ projects: 0, clients: 0, years: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ projects: 150, clients: 80, years: 5 });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const AnimatedCounter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let startTime;
      const animate = (time) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, [end, duration]);

    return <span>{count}</span>;
  };

  const sections = {
    mission: {
      title: "Our Mission",
      content:
        "We create impactful digital solutions that connect people and technology. Our mission is to deliver innovation that drives meaningful results.",
    },
    story: {
      title: "Our Story",
      content:
        "What started as a small dream turned into a global vision. Today, we proudly serve clients worldwide with unmatched dedication.",
    },
    values: {
      title: "Our Values",
      content:
        "Integrity, creativity, and collaboration guide us. We are committed to transparency, learning, and measurable results.",
    },
    team: {
      title: "Our Team",
      content:
        "A diverse family of designers, developers, and strategists—united by passion and purpose.",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 text-center px-6">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Us
        </motion.h1>
        <motion.p
          className="max-w-2xl mx-auto text-lg opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Crafting exceptional digital experiences with passion, precision, and
          purpose.
        </motion.p>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { label: "Projects Completed", value: stats.projects, color: "text-blue-400" },
          { label: "Happy Clients", value: stats.clients, color: "text-purple-400" },
          { label: "Years Experience", value: stats.years, color: "text-green-400" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="bg-white/10 rounded-2xl p-8 text-center backdrop-blur-md hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <div className={`text-4xl font-bold ${stat.color}`}>
              <AnimatedCounter end={stat.value} />+
            </div>
            <div className="mt-2 text-gray-300">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Section Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {Object.keys(sections).map((key) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            aria-pressed={activeSection === key}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeSection === key
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {sections[key].title}
          </button>
        ))}
      </div>

      {/* Active Section */}
      <motion.div
        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-4">{sections[activeSection].title}</h2>
        <p className="text-gray-300">{sections[activeSection].content}</p>
      </motion.div>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-16 text-center">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8">
          <h3 className="text-3xl font-bold mb-3">Ready to Collaborate?</h3>
          <p className="opacity-90 mb-6">
            Let’s create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition"
            >
              Get In Touch
            </a>
            <a
              href="/portfolio"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
