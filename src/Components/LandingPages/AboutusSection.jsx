import React from 'react'
import Header from '../Utility/utils1/Headers';
import Footer from '../Utility/utils1/Footers';


const AboutusSection = () => {
  return (
    <>
      <div>
        <Header />
        <p className="font-semibold text-xl px-2 py-4  text-center  text-gray-600 leading-relaxed">
          Welcome to <span className="font-semibold text-[#01C567]">DevMatrix</span>, your premier online teaching platform dedicated to providing top-notch educational resources and comprehensive courses to learners around the globe. We are passionate about empowering individuals through knowledge and education, making learning both accessible and enjoyable.
        </p>


        <div className="lg:w-full h-auto">
          <div className="grid px-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
            <div className=" bg-[#002333] border border-gray-200 rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="p-4">
                <h2 className="font-extrabold text-[#01ff85] text-3xl w-full my-1">Our Vission</h2>
                <hr className="border-2 text-bg-danger my-2"/>
                <p className="text-white  text-md ">   We envision a world where everyone has the opportunity to learn and grow, regardless of their location or background. Our goal is to bridge the gap between traditional education and the modern needs of learners, offering flexible and affordable learning solutions that can be accessed anytime, anywhere.
                </p>
              </div>

            </div>
            <div className="bg-[#002333] border border-gray-200 rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="p-4">
                <h2 className="font-extrabold text-[#01ff85] text-3xl w-full my-1">Our Mission</h2>
                <hr className="border-2 text-bg-danger my-2"/>
              
                <p className="text-white text-md ">       Our mission is to democratize education by making it accessible and engaging for everyone, everywhere. We believe that learning should be a lifelong journey, filled with opportunities for growth and discovery. Our platform is designed to cater to the diverse needs of learners, providing them with the tools and resources they need to succeed.
                </p>

              </div>
            </div>

          </div>
          <div className='p-4'>

            <div className=" bg-[#002333] border border-gray-200 rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">

              <div className="p-4">
                <h2 className="font-extrabold text-[#01ff85] text-3xl w-full my-1">Our Core Values</h2>
                <hr className="border-2 text-bg-danger my-2"/>
              
                <p className="text-white text-md  ">   <ul className="list-disc list-inside text-base mb-6 text-gray-700 leading-relaxed">
                  <li className="mb-2 text-white text-md"><span className="font-semibold">Integrity</span>: We uphold the highest standards of integrity in all our actions.</li>
                  <li className="mb-2 text-white text-md "><span className="font-semibold">Innovation</span>: We constantly seek innovative solutions to enhance the learning experience.</li>
                  <li className='mb-2 text-white text-md '><span className="font-semibold">Inclusivity</span>: We are committed to creating an inclusive environment where everyone feels welcome.</li>
                </ul>
                </p>
              </div>
          </div>

            </div>



        </div>


        <Footer />
      </div>
    </>
  )
}

export default AboutusSection
