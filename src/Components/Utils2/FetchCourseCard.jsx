import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../CSS/fetchCourseCard.css"; // Assuming you have a separate CSS file for this component

const FetchCourseCard = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            try {
                const response = await axios.get(`${backendUrl}/api/v1/users/get-allcourse`);
                setCourses(response.data.data); // Assuming the API returns the courses in response.data.data
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="overflow-hidden w-full  py-8">
            <div className="animate-scroll space-x-6">
                {courses.map((course) => (
                    <div key={course._id} className="w-80 flex-shrink-0 bg-white shadow-lg border border-gray-200 rounded-lg  overflow-hidden">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold">{course.title}</h2>
                            <p className="text-gray-600">{course.creator}</p>
                            <p className="text-gray-700 font-bold text-sm">&#x20B9; {course.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FetchCourseCard;
