import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "../../CSS/fetchCourseCard.css"; // Assuming this file has shared CSS styles

const CombinedSlider = () => {
    // Testimonials Data
    const testimonials = [
        {
            id: 1,
            name: "Arjun Kumar",
            title: "Software Engineer",
            message:
                "This platform has transformed the way I approach coding. The tutorials are clear and the community support is fantastic!",
            image: "https://th.bing.com/th/id/OIP.v0lLAjRJ5PW927DZz3qUoQAAAA?pid=ImgDet&w=181&h=180&c=7",
        },
        {
            id: 2,
            name: "Raghav Sharma",
            title: "Product Manager",
            message:
                "I love how user-friendly this platform is! The tools provided have streamlined our workflow significantly.",
            image: "https://th.bing.com/th/id/OIP.nGOQO0G5jD94afno4sZEnQAAAA?pid=ImgDet&w=181&h=201&c=7",
        },
        {
            id: 3,
            name: "Vikram Singh",
            title: "Web Designer",
            message:
                "The design resources available here are top-notch. I’ve been able to elevate my projects with ease.",
            image: "https://www.kevinashleyphotography.com/wp-content/uploads/2015/11/person.jpg",
        },
    ];

    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleSliderChange = (direction) => {
        if (isTransitioning) return;
        setIsTransitioning(true);

        setTestimonialIndex((prevIndex) => {
            const newIndex =
                direction === "next"
                    ? (prevIndex + 1) % testimonials.length
                    : (prevIndex - 1 + testimonials.length) % testimonials.length;
            return newIndex;
        });

        setTimeout(() => setIsTransitioning(false), 500); // Transition timeout
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleSliderChange("next");
        }, 5000);
        return () => clearInterval(interval); // Clear interval on unmount
    }, []);

    return (
        <div className="text-center mt-8  mb-12">
            <h2 className="text-4xl font-bold text-gray-800">What People Say</h2>
            <p className="text-lg text-gray-500 mt-2">
                Hear from our users who love our platform.
            </p>

            <div className="relative flex justify-center items-center mt-8">
                {/* Backward Button */}
                <button
                    onClick={() => handleSliderChange("prev")}
                    className="absolute left-4 z-10 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all"
                >
                    <IoIosArrowBack className="w-6 h-6 text-gray-800" />
                </button>

                {/* Testimonial Content */}
                <div className="flex transition-transform duration-500 ease-in-out">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <img
                            src={testimonials[testimonialIndex].image}
                            alt={testimonials[testimonialIndex].name}
                            className="w-16 h-16 rounded-full mx-auto"
                        />
                        <h3 className="text-xl font-semibold mt-4">
                            {testimonials[testimonialIndex].name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {testimonials[testimonialIndex].title}
                        </p>
                        <p className="text-gray-700 mt-4">
                            {testimonials[testimonialIndex].message}
                        </p>
                    </div>
                </div>

                {/* Forward Button */}
                <button
                    onClick={() => handleSliderChange("next")}
                    className="absolute right-4 z-10 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all"
                >
                    <IoIosArrowForward className="w-6 h-6 text-gray-800" />
                </button>
            </div>
        </div>
    );
};

export default CombinedSlider;
