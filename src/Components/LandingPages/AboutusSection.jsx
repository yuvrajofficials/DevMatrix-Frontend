import React from "react";
import Header from "../Utility/utils1/Headers";
import Footer from "../Utility/utils1/Footers";

const AboutusSection = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Welcome Section */}
        <section className="px-6 sm:px-12 py-12 text-center bg-white shadow-md rounded-lg mx-4 sm:mx-auto max-w-4xl">
          <p className="font-semibold text-2xl text-[#304261] leading-relaxed">
            Welcome to{" "}
            <span className="font-extrabold text-[#ff5b2b]">DevMatrix</span>, your premier online teaching platform
            dedicated to providing top-notch educational resources and comprehensive courses to learners around the globe. 
            We are passionate about empowering individuals through knowledge and education, making learning both accessible 
            and enjoyable.
          </p>
        </section>

        {/* Vision, Mission, and Core Values */}
        <section className="px-4 sm:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Vision */}
            <div className="bg-[#fdf8f2] border border-gray-200 rounded-lg shadow-lg p-6 transform transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
              <h2 className="font-extrabold text-[#ff5b2b] text-3xl mb-4">Our Vision</h2>
              <hr className="border-2 border-[#ff5b2b] mb-4" />
              <p className="text-[#304261] text-lg leading-relaxed">
                We envision a world where everyone has the opportunity to learn and grow, regardless of their location 
                or background. Our goal is to bridge the gap between traditional education and the modern needs of 
                learners, offering flexible and affordable learning solutions that can be accessed anytime, anywhere.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-[#fdf8f2] border border-gray-200 rounded-lg shadow-lg p-6 transform transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
              <h2 className="font-extrabold text-[#ff5b2b] text-3xl mb-4">Our Mission</h2>
              <hr className="border-2 border-[#ff5b2b] mb-4" />
              <p className="text-[#304261] text-lg leading-relaxed">
                Our mission is to democratize education by making it accessible and engaging for everyone, everywhere. 
                We believe that learning should be a lifelong journey, filled with opportunities for growth and discovery. 
                Our platform is designed to cater to the diverse needs of learners, providing them with the tools and 
                resources they need to succeed.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-[#fdf8f2] border border-gray-200 rounded-lg shadow-lg p-6 transform transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
            <h2 className="font-extrabold text-[#ff5b2b] text-3xl mb-4">Our Core Values</h2>
            <hr className="border-2 border-[#ff5b2b] mb-4" />
            <ul className="list-disc list-inside text-lg text-[#304261] leading-relaxed">
              <li className="mb-3">
                <span className="font-semibold">Integrity</span>: We uphold the highest standards of integrity in all our actions.
              </li>
              <li className="mb-3">
                <span className="font-semibold">Innovation</span>: We constantly seek innovative solutions to enhance the learning experience.
              </li>
              <li className="mb-3">
                <span className="font-semibold">Inclusivity</span>: We are committed to creating an inclusive environment where everyone feels welcome.
              </li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default AboutusSection;
