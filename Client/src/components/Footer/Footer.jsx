import React from 'react';
import logo from "../../assets/curiox logo 1.png"
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  ArrowUp,
  Github
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Browse Courses', href: '#courses' },
        { name: 'Find Instructors', href: '#instructors' },
        { name: 'Student Community', href: '#community' },
        { name: 'Mobile Learning', href: '#mobile' },
        { name: 'Certification', href: '#certification' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About CurioX', href: '#about' },
        { name: 'Our Mission', href: '#mission' },
        { name: 'Careers', href: '#careers' },
        { name: 'Press Kit', href: '#press' },
        { name: 'Partnerships', href: '#partners' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '#help' },
        { name: 'Study Guides', href: '#guides' },
        { name: 'Blog', href: '#blog' },
        { name: 'Webinars', href: '#webinars' },
        { name: 'Success Stories', href: '#stories' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Support', href: '#support' },
        { name: 'System Status', href: '#status' },
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' },
        { name: 'Accessibility', href: '#accessibility' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/dipayan.dey.489987', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, href: 'https://x.com/DipayanDey1711?t=jXzyq4QeQY_OtsrFp6jYvw&s=09', color: 'hover:text-sky-500' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/dipayan.official.2006/', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/dipayan-dey-033b38309/', color: 'hover:text-blue-600' },
    { name: 'YouTube', icon: Github , href: 'https://github.com/Dipayan-Dey', color: 'hover:text-grey-500' }
  ];

  return (
    <footer className="relative bg-gray-900 text-center">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 ">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
              <img src={logo} alt=""  className="h-20 w-40 pt-2"/>
            
            <p className="text-sm text-center md:text-left leading-relaxed text-gray-300 max-w-sm">
              Where curiosity meets experience. Transform your potential into expertise with our interactive e-learning platform designed for the modern learner.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 ">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <span>deydipayan2006@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+91 83898 06944</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Kolkata</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`p-2 rounded-xl transition-all duration-300 bg-gray-800 hover:bg-gray-700 text-gray-400 ${social.color} hover:scale-110 shadow-sm hover:shadow-md`}
                    aria-label={social.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-semibold text-lg text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm transition-all duration-300 hover:translate-x-1 text-gray-300 hover:text-white hover:underline underline-offset-2"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        {/* <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-2 text-white">
                Stay Updated
              </h4>
              <p className="text-sm text-gray-300">
                Get the latest courses, tips, and learning resources delivered to your inbox.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>© 2025 CurioX. All rights reserved.</span>
            <span>Developed By Dipayan</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for learners worldwide</span>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white hover:scale-105"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;