import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header Section */}
      <div className="text-center py-16 bg-gradient-to-r from-blue-950 to-indigo-200 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About DailyNews</h1>
        <p className="max-w-2xl mx-auto text-xl">
          Stay informed with the latest headlines, stories, and insights from
          around the world — all in one place.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-black">
            Our Mission
          </h2>
          <p className="text-black leading-relaxed max-w-3xl mx-auto text-xl">
            At <span className="font-semibold text-indigo-600">DailyNews</span>, 
            our mission is to deliver fast, accurate, and unbiased news coverage.
            We aim to empower readers with verified information and help them stay
            aware of global and local developments every day.
          </p>
        </section>

        {/* Team Section */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-8 text-gray-900">
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-gradient-to-r from-pink-200 to-blue-300 text-white shadow-md rounded-2xl p-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/NBC_News_Brian_Williams_%2852610976940%29_%28cropped%29.jpg"
                alt="Editor"
                className="w-28 h-28 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Aisha Rahman</h3>
              <p className="text-black">Chief Editor</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-gradient-to-r from-pink-200 to-blue-300 text-white shadow-md rounded-2xl p-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/NBC_News_Brian_Williams_%2852610976940%29_%28cropped%29.jpg"
                alt="Reporter"
                className="w-28 h-28 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Daniel Tan</h3>
              <p className="text-black">Senior Reporter</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-gradient-to-r from-pink-200 to-blue-300 text-white shadow-md rounded-2xl p-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/NBC_News_Brian_Williams_%2852610976940%29_%28cropped%29.jpg"
                alt="Developer"
                className="w-28 h-28 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Emon Hossain</h3>
              <p className="text-black">Web Developer</p>
            </div>
            {/* Team Member 4 */}
            <div className="bg-gradient-to-r from-pink-200 to-blue-300 text-white shadow-md rounded-2xl p-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/NBC_News_Brian_Williams_%2852610976940%29_%28cropped%29.jpg"
                alt="Developer"
                className="w-28 h-28 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Mehedi Hasan</h3>
              <p className="text-black">Web Developer</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
