import React, { useState } from "react";

const VideoNews = () => {
  const videos = [
    {
      embedUrl: "https://www.youtube.com/embed/bYwuZQcXRR0?si=761OepfDI8M72-jA",
      title: "Iran VS Israel War",
    },
    {
      embedUrl: "https://www.youtube.com/embed/iUn5F52SNuY?si=11Q6O-Egh-EdqtSj",
      title: "Middle East Conflict Explained",
    },
    {
      embedUrl: "https://www.youtube.com/embed/FooC7gp4wk4?si=bADYLPu6JKXRIfGk",
      title: "Global Politics Update",
    },
    {
      embedUrl: "https://www.youtube.com/embed/yQW21heOYdw?si=8OV1Q9YCktrMAgeP",
      title: "Warzone Highlights",
    },
    {
      embedUrl: "https://www.youtube.com/embed/kB9pWG9o1LA?si=pE2jcygu2gVSXWq1",
      title: "Umar Bin Khattab | 2nd Khalifa of Islam",
    },
    {
      embedUrl: "https://www.youtube.com/embed/svH3_iyS_v8?si=u5YGNz6oqISX61dg",
      title: "1st WAR of Umar bin Khattab",
    },
  ];

  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  const getYouTubeId = (url) => {
    const match = url.match(/\/embed\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Video News
          </h1>
          <p className="text-center text-gray-600 text-sm sm:text-base">
            Stay updated with the latest news and stories
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Main Video Player */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={currentVideo.embedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
                  {currentVideo.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  Playlist
                </h3>
                <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {videos.length} videos
                </span>
              </div>

              <div
                className="space-y-3 max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-2"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#ec4899 #f3f4f6",
                }}
              >
                {videos.map((video, index) => {
                  const videoId = getYouTubeId(video.embedUrl);
                  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                  const isActive = currentVideo.embedUrl === video.embedUrl;

                  return (
                    <div
                      key={index}
                      onClick={() => setCurrentVideo(video)}
                      className={`group flex gap-3 p-2 sm:p-3 cursor-pointer rounded-xl border-2 transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-pink-50 to-purple-50 border-pink-400 shadow-md scale-[1.02]"
                          : "bg-white border-gray-200 hover:border-pink-300 hover:shadow-md hover:scale-[1.01]"
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={thumbnailUrl}
                          alt={video.title}
                          className="w-20 h-14 sm:w-24 sm:h-16 object-cover rounded-lg"
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-pink-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-medium text-xs sm:text-sm line-clamp-2 leading-snug ${
                            isActive
                              ? "text-pink-700"
                              : "text-gray-700 group-hover:text-pink-600"
                          }`}
                        >
                          {video.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Video {index + 1}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoNews;
