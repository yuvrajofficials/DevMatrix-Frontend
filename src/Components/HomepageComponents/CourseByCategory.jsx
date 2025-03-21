import React from "react";
import { FaBook } from "react-icons/fa6";
import { PiShootingStarLight } from "react-icons/pi";
import "../../CSS/fetchCourseCard.css"; // Assuming this file contains styles for scrolling animations

const CourseByCategory = () => {
  const categories = [
    {
      icon: (
        <PiShootingStarLight className="text-white p-2 rounded-lg bg-pink-400 w-10 h-10" />
      ),
      title: "Want to be a creator",
      description:
        "We provide you a platform to showcase and monetize your skills.",
      price: "499",
      creator: "Creative Platform",
    },
    {
      icon: <FaBook className="text-white p-2 rounded-lg bg-green-400 w-10 h-10" />,
      title: "Want to learn skills",
      description:
        "We have all the courses for your skills. Just sign up and explore courses.",
      price: "399",
      creator: "Skill Builder",
    },
    {
      icon: (
        <FaBook className="text-white p-2 rounded-lg bg-yellow-400 w-10 h-10" />
      ),
      title: "Want to be a blogger",
      description:
        "We have a tailored userbase who will read and increase the reach of your blogs.",
      price: "299",
      creator: "Blog Booster",
    },
    {
      icon: <FaBook className="text-white p-2 rounded-lg bg-red-400 w-10 h-10" />,
      title: "Want to be consistent",
      description:
        "We provide continuous tracking and monitoring of your performance.",
      price: "199",
      creator: "Performance Tracker",
    },
    {
      icon: (
        <FaBook className="text-white p-2 rounded-lg bg-purple-400 w-10 h-10" />
      ),
      title: "Want a side hustle",
      description:
        "Explore ways to create and grow alongside your main career.",
      price: "599",
      creator: "Side Hustle Hub",
    },
  ];

//   useEffec(() => {
//     const fetchCourses = async () => {
//         try {
//             const response = await axios.get(`${BACKEND_URI}/api/v1/users/get-allcourse`);
//             setCourses(response.data.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     fetchCourses();
// }, [owner]);


  return (
    <div className="overflow-hidden w-full py-8">
      {/* Scrolling Container */}
      <div className="m-4 text-center p-3">
                    <p className="text-5xl text-gray-800">Browse Course By Categories</p>
                    <p className="text-lg py-2 text-gray-500">
                        We will help you in ways for your personal growth, skill development, soft skills, and many more.
                    </p>
                </div>


      <div className="animate-scroll flex space-x-6">
        {categories.map((course, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md border-[1px] min-w-fit flex items-center flex-col flex-shrink-0"
          >
            {/* Icon */}
            <div className="mb-4">{course.icon}</div>

            {/* Title */}
            <h2 className="text-xl font-bold">{course.title}</h2>

        
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseByCategory;
