import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white text-sm mt-10">
      {/* Top section */}
      <div className="w-11/12 mx-auto px-6 py-10 grid md:grid-cols-3 gap-6 items-start">
        {/* Logo and Tagline */}
        <div>
          <h1 className="text-2xl font-extrabold">
            <span className="text-white">DAILY </span>
            <span className="text-blue-500">NEWS</span>
          </h1>
          <p className="mt-1 text-gray-400 italic">the art of publishing</p>
        </div>

        {/* About Section */}
        <div>
          <h2 className="font-bold text-lg mb-2">ABOUT US</h2>
          <p className="text-gray-300 leading-relaxed">
            Newspaper is your news, entertainment, music fashion website. <br />
            We provide you with the latest breaking news and videos straight
            from the entertainment industry.
          </p>
          <p className="mt-2">
            Contact us:{" "}
            <a
              href="mailto:mdmehedihasanroby@gmail.com"
              className="text-blue-400 hover:underline"
            >
              mdmehedihasanroby@gmail.com
            </a>
          </p>
        </div>

        {/* Social + Email Subscription */}
        <div>
          <h2 className="font-bold text-lg mb-2">FOLLOW US</h2>
          <div className="flex space-x-4 mt-2 mb-4">
            <a href="https://www.facebook.com/mehedi.hasan.312630" className="bg-gray-800 hover:bg-blue-600 p-2 rounded">
              <FaFacebookF size={20} />
            </a>
            <a href="https://www.instagram.com/meheeeeedi_hasan/" className="bg-gray-800 hover:bg-pink-500 p-2 rounded">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.linkedin.com/in/mehedi-hasan-85278b2a0/" className="bg-gray-800 hover:bg-blue-400 p-2 rounded">
              <FaLinkedin size={20} />
            </a>
          </div>

          {/* Email input & Subscribe button */}
          <div className="flex flex-col space-y-3 mt-10">
            <label htmlFor="email" className="text-2xl font-medium text-gray-200">
              Subscribe to Newsletter
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-xl bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition duration-200">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#000] text-gray-400 text-center md:flex md:justify-between items-center px-6 py-4 border-t border-gray-700">
        <p className="text-xs text-center md:text-left">
          © Daily News
        </p>
        <div className="flex justify-center md:justify-end space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">Disclaimer</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Advertisement</a>
          <a href="#" className="hover:text-white">Contact us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
