import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="mt-5 font-sans">
      {/* Facebook */}
      <div className="flex justify-between items-center bg-[#3b5998] text-white px-4 py-3 my-5 hover:bg-black">
        <div className="flex items-center space-x-2">
          <FaFacebookF className="text-xl" />
          <span className="font-semibold text-lg">20,831</span>
          <span>Fans</span>
        </div>
        <button className="text-sm font-bold">LIKE</button>
      </div>

      {/* Twitter */}
      <div className="flex justify-between items-center bg-[#00aced] text-white px-4 py-3 my-5 hover:bg-black">
        <div className="flex items-center space-x-2">
          <FaTwitter className="text-xl" />
          <span className="font-semibold text-lg">3,912</span>
          <span>Followers</span>
        </div>
        <button className="text-sm font-bold">FOLLOW</button>
      </div>

      {/* YouTube */}
      <div className="flex justify-between items-center bg-[#cd201f] text-white px-4 py-3 my-5 rounded-b hover:bg-black">
        <div className="flex items-center space-x-2">
          <FaYoutube className="text-xl" />
          <span className="font-semibold text-lg">22,400</span>
          <span>Subscribers</span>
        </div>
        <button className="text-sm font-bold">SUBSCRIBE</button>
      </div>
    </div>
  );
};

export default SocialMedia;
