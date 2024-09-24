import React from 'react';
import FetchCourseCard from './FetchCourseCard';

const FetchCourseList = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <FetchCourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default FetchCourseList;
