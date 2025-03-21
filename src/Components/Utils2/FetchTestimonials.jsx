import React, { useState, useEffect } from 'react';

// Demo data for testing purposes
const demoTestimonials = [
  {
    id: 1,
    name: "Jane Doe",
    title: "Software Engineer",
    message: "This platform has transformed the way I approach coding. The tutorials are clear and the community support is fantastic!",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "John Smith",
    title: "Product Manager",
    message: "I love how user-friendly this platform is! The tools provided have streamlined our workflow significantly.",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Alice Johnson",
    title: "Web Designer",
    message: "The design resources available here are top-notch. I’ve been able to elevate my projects with ease.",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    name: "Michael Brown",
    title: "Data Scientist",
    message: "A great resource for anyone looking to improve their skills. I found exactly what I needed!",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 5,
    name: "Sarah Connor",
    title: "Project Coordinator",
    message: "The collaboration tools offered are fantastic! They really help keep everyone on the same page.",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 6,
    name: "Tom Hardy",
    title: "UX Researcher",
    message: "I appreciate the emphasis on user experience. This platform has made my job so much easier!",
    image: "https://via.placeholder.com/150"
  }
];

const FetchTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    // In a real scenario, replace this with an API call
    setTestimonials(demoTestimonials);
  }, []);

  return (
    <div className=" py-10">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-700 mb-4">{testimonial.message}</p>
              <div className="flex justify-start items-start">
              <div className=''>

                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-lg mx-auto" />
              </div>
                <div className="flex flex-col justify-start items-start ml-4">
                  <h2 className="text-xl font-semibold text-gray-800 text-left">{testimonial.name}</h2>
                  <h3 className="text-gray-600 text-left">{testimonial.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FetchTestimonials;
