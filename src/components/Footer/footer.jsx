import React from "react";
import logo from "../../assets/logo.png";
import { FaFacebook, FaInstagram, FaTiktok, FaEnvelope, FaPhone, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-black py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-start">
          
          {/* Column 1 - Logo */}
          <div className="space-y-6">
            <div className="flex items-center"> 
              <img 
                src={logo} 
                alt="StoryForest Logo" 
                className="h-full w-auto object-contain"
              />
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
              StoryForest - A diverse collection of free, high-quality stories. 
              Where your reading passion comes alive.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebook />, label: 'Facebook' },
                { icon: <FaInstagram />, label: 'Instagram' },
                { icon: <FaTiktok />, label: 'TikTok' }
              ].map((social) => (
                <a 
                  key={social.label}
                  href="#" 
                  aria-label={social.label}
                  className="text-gray-600 hover:text-[#e94560] text-xl transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-2 border-b-2 border-gray-300">Quick Links</h3>
            <ul className="space-y-3">
                {[
                { name: 'Home', path: "/" },
                { name: 'Genres', path: "/" },
                { name: 'Manga', path: "/" },
                { name: 'Novels', path: "/" },
                { name: 'New Releases', path: "/" },
                { name: 'Rankings', path: "/" }
                ].map((item) => (
                <li key={item.path}>
                    <Link 
                    to={item.path}
                    className="text-gray-700 hover:text-[#e94560] flex items-center group transition-colors duration-200"
                    >
                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-transform duration-200 transform group-hover:translate-x-1" />
                    {item.name}
                    </Link>
                </li>
                ))}
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-2 border-b-2 border-gray-300">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <a href="mailto:support@storyforest.com" className="text-gray-700 hover:text-[#e94560] transition-colors">
                    support@storyforest.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <FaPhone className="mt-1 mr-3 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Phone</p>
                  <a href="tel:+84123456789" className="text-gray-700 hover:text-[#e94560] transition-colors">
                    +84 123 456 789
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4 - Sign Up */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold pb-2 border-b-2 border-gray-300">Full Experience</h3>
            <p className="text-gray-700">
              Register an account to unlock all features
            </p>
            <Link
              to="/signup"
              className="inline-block w-full bg-[#e94560] hover:bg-[#d13354] text-white text-center py-2.5 px-4 rounded-lg font-medium transition-colors"
            >
              Sign Up Free
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-6 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} <span className="text-gray-800 font-medium">StoryForest</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;