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
    <div className="w-11/12 mx-auto mb-6 sm:mb-10">
      <h1 className="text-center bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 sm:px-8 lg:px-16 xl:px-32 py-2 sm:py-3 font-semibold shadow-md mb-4 sm:mb-5 text-lg sm:text-xl lg:text-2xl rounded-sm">
        Video News
      </h1>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-6">
        {/* Main Video Player */}
        <div className="w-full lg:w-2/3">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-sm"
              src={currentVideo.embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Playlist Sidebar */}
        <div className="w-full lg:w-1/3">
          <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">
            Playlist
          </h3>

          <div
            className="max-h-[300px] sm:max-h-[400px] lg:max-h-[400px] overflow-y-auto pr-2"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#e91e63 #f1f1f1",
            }}
          >
            {videos.map((video, index) => {
              const videoId = getYouTubeId(video.embedUrl);
              const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

              return (
                <div
                  key={index}
                  onClick={() => setCurrentVideo(video)}
                  className={`flex items-start sm:items-center gap-2 sm:gap-3 p-2 sm:p-3 mb-2 sm:mb-3 cursor-pointer rounded-lg border transition-all duration-200 ${
                    currentVideo.embedUrl === video.embedUrl
                      ? "bg-pink-50 border-pink-300 shadow-sm"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:shadow-sm"
                  }`}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={thumbnailUrl}
                      alt={video.title}
                      className="w-16 h-12 sm:w-20 sm:h-14 lg:w-24 lg:h-16 object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs sm:text-sm lg:text-sm text-gray-800 line-clamp-2 leading-tight">
                      {video.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoNews;
