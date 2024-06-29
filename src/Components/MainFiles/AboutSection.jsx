import React from 'react';
import Header from '../Utils/Header';
import Footer from '../Utils/Footer';

const AboutSection = () => {
  return (
    <>
    
    <div className="bg-gradient-to-r from-yellow-50 to-yellow-200">
      <Header />

      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">About Us</h1>
        <p className="text-base mb-6 text-gray-700 leading-relaxed">
          Welcome to <span className="font-semibold">[Website Name]</span>, your premier online teaching platform dedicated to providing top-notch educational resources and comprehensive courses to learners around the globe. We are passionate about empowering individuals through knowledge and education, making learning both accessible and enjoyable.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-gray-800">Our Mission</h2>
        <p className="text-base mb-6 text-gray-700 leading-relaxed">
          Our mission is to democratize education by making it accessible and engaging for everyone, everywhere. We believe that learning should be a lifelong journey, filled with opportunities for growth and discovery. Our platform is designed to cater to the diverse needs of learners, providing them with the tools and resources they need to succeed.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-gray-800">Our Vision</h2>
        <p className="text-base mb-6 text-gray-700 leading-relaxed">
          We envision a world where everyone has the opportunity to learn and grow, regardless of their location or background. Our goal is to bridge the gap between traditional education and the modern needs of learners, offering flexible and affordable learning solutions that can be accessed anytime, anywhere.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-gray-800">Our History</h2>
        <p className="text-base mb-6 text-gray-700 leading-relaxed">
          Founded in <span className="font-semibold">[Year]</span>, <span className="font-semibold">[Website Name]</span> was created with the vision of bridging the educational divide. Our journey began with a small team of passionate educators and technologists who believed in the power of online learning. Over the years, we have grown into a trusted platform with a vast library of courses and a vibrant community of learners.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-gray-800">Our Core Values</h2>
        <ul className="list-disc list-inside text-base mb-6 text-gray-700 leading-relaxed">
          <li className="mb-2"><span className="font-semibold">Integrity</span>: We uphold the highest standards of integrity in all our actions.</li>
          <li className="mb-2"><span className="font-semibold">Innovation</span>: We constantly seek innovative solutions to enhance the learning experience.</li>
          <li><span className="font-semibold">Inclusivity</span>: We are committed to creating an inclusive environment where everyone feels welcome.</li>
        </ul>

      </div>
      
      <div className="p-6 max-w-4xl my-4 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl text-center font-semibold mb-3 text-gray-800">Meet the Team</h2>
        <p className="text-base mb-6 text-gray-700 leading-relaxed">
          Our team is composed of experienced educators, skilled developers, and creative designers, all dedicated to delivering an exceptional learning experience. Each member brings a unique set of skills and a shared commitment to our mission of providing quality education to all.
        </p>
        </div>
      <Footer />
</div>
    </>
  );
}

export default AboutSection;
