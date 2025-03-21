import React, { useState } from 'react';
import { RiArrowDropDownLine,RiArrowDropUpLine } from 'react-icons/ri';

const Description = ({ course }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="my-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Course Description</h2>
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-700 transition-all"
        >
          {isExpanded ? <> <RiArrowDropUpLine className='w-8 h-8'/> </> :<RiArrowDropDownLine className='w-8 h-8'/> }
       </div>

        
      </div>

      {/* Course Description */}
      <div className={`${isExpanded ? "block" : "hidden"} mt-4 text-gray-700`}>
        <p className="font-medium">{course.title}</p>
        <div dangerouslySetInnerHTML={{ __html: course.description }} className="mt-2 text-gray-600"></div>
      </div>
    </div>
  );
};

export default Description;
