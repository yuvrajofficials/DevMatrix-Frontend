import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';



const AboutInstructor = ({ course }) => {
  const [instructorData, setInstructorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const instructorId = course?.tutor;

  const [isVisible, setIsVisible] = useState(true);


  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };


  useEffect(() => {
    const fetchInstructorData = async () => {
      if (instructorId) {
        try {
          // Uncomment the following line to use the actual API data
          // const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/get-tutor/${instructorId}`);
          // setInstructorData(response.data.data);

          // Dummy data for testing
          const dummyData = {
            avatar: "https://via.placeholder.com/150",
            name: "John Doe",
            skills: "JavaScript, React, Node.js, Teaching",
            education: [
              { degree: "B.Sc. in Computer Science", institution: "XYZ University", year: 2018 },
              { degree: "M.Sc. in Software Engineering", institution: "ABC University", year: 2020 }
            ],
            totalCourses: 15,
            abstract: "Experienced software engineer with a passion for teaching. Skilled in modern web technologies and dedicated to helping students succeed.",
            ratings: 4.8,
            followers: 250,
            courses: ["JavaScript Basics", "Advanced React", "Node.js for Beginners", "Full Stack Development"],
            socialMedia: {
              linkedIn: "https://www.linkedin.com/in/johndoe",
              twitter: "https://twitter.com/johndoe"
            }
          };
          setInstructorData(dummyData);
          setLoading(false);
        } catch (error) {
          toast.error("Error fetching instructor data");
          setLoading(false);
        }
      } else {
        toast.info("No Instructor Data Available");
        setLoading(false);
      }
    };

    fetchInstructorData();
  }, [instructorId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading instructor data...</p>;
  }

  if (!instructorData) {
    return <p className="text-center text-gray-500">No instructor data available.</p>;
  }

  const { avatar, name, skills, education, totalCourses, abstract, ratings, followers, courses, socialMedia } = instructorData;

  return (
    <div className="w-full bg-white m-0">

<div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-gray-800">About Instructor</h2>
      <div
        onClick={toggleVisibility}
        className="text-blue-500 hover:text-blue-700 transition-all"
      >
        {isVisible ? <> <RiArrowDropUpLine className='w-8 h-8' /> </> : <RiArrowDropDownLine className='w-8 h-8' />}
      </div>
      </div>

      <div className={`${isVisible ? "block" : "hidden"} px-8 mt-4`}>

        <div className="flex justify-start items-center my-6">

          <img
            className="rounded-lg w-32 h-32 object-contain border-2 border-gray-500"
            src="https://th.bing.com/th/id/OIP.Blj2M36K5WYTyNd6v6Jz0QHaJf?rs=1&pid=ImgDetMain"
            alt="Instructor Profile"
          />
          <div className='text-left px-4'>

            <h1 className="text-3xl font-bold  mb-2">{name}</h1>
            <p className=" text-gray-600">{skills}</p>
            <div className=" mt-4 mb-4">
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-bold">{ratings} ★</span>
              <span className="mx-2 text-gray-500">{followers} Followers</span>
              <span className="mx-2 text-gray-500">{totalCourses} Courses</span>
            </div>
          </div>
        </div>
        <div className=" py-6 ">
          <h2 className="text-2xl text-blue-500 font-semibold mb-2">Abstract</h2>
          <p>{abstract}</p>
        </div>
        <div className=" py-6 ">
          <h2 className="text-2xl text-blue-500 font-semibold mb-2">Education</h2>
          <ul className="list-disc pl-5">
            {education.map((edu, index) => (
              <li key={index} className="text-gray-700">
                {edu.degree} from {edu.institution} ({edu.year})
              </li>
            ))}
          </ul>
        </div>
        <div className="py-6 ">
          <h2 className="text-2xl text-blue-500 font-semibold mb-2">Courses Taught</h2>
          <ul className="list-disc pl-5">
            {courses.map((course, index) => (
              <li key={index} className="text-gray-700">{course}</li>
            ))}
          </ul>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AboutInstructor;
