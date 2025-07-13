import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const SocialMedia = () => {
  return (
    <div className="mt-5 font-sans">
      {/* Facebook */}
      <Link
        to={"https://www.facebook.com/mehedi.hasan.312630"}
        className="flex justify-between items-center bg-[#3b5998] text-white px-4 py-3 my-5 hover:bg-black"
      >
        <div className="flex items-center space-x-2">
          <FaFacebookF className="text-xl" />
          <span className="font-semibold text-lg">20,831</span>
          <span>Fans</span>
        </div>
        <button className="text-sm font-bold">LIKE</button>
      </Link>

      {/* Twitter */}
      <Link
        to={"https://www.instagram.com/meheeeeedi_hasan/"}
        className="flex justify-between items-center bg-[#f13cb5] text-white px-4 py-3 my-5 hover:bg-black"
      >
        <div className="flex items-center space-x-2">
          <FaInstagram className="text-xl" />
          <span className="font-semibold text-lg">3,912</span>
          <span>Followers</span>
        </div>
        <button className="text-sm font-bold">FOLLOW</button>
      </Link>

      {/* YouTube */}
      <Link
        to={"https://youtube.com/@meheeeedi_hasan"}
        className="flex justify-between items-center bg-[#cd201f] text-white px-4 py-3 my-5 rounded-b hover:bg-black"
      >
        <div className="flex items-center space-x-2">
          <FaYoutube className="text-xl" />
          <span className="font-semibold text-lg">22,400</span>
          <span>Subscribers</span>
        </div>
        <button className="text-sm font-bold">SUBSCRIBE</button>
      </Link>
    </div>
  );
};

export default SocialMedia;
