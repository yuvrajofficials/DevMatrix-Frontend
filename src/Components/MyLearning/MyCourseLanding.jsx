import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
const MyCourseLanding = () => {
    const [course, setCompleteCourseDetails] = useState({});
    const [expandedModule, setExpandedModule] = useState(null);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { courseId } = useParams();
   
    useEffect(() => {
        const getCourseDetails = async () => {
            try {
                console.log(courseId);
                const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
                const accessToken = getLoginInfo?.token;

                const response = await axios.post(
                    `${BACKEND_URI}/api/v1/users/mylearning/get-course-details`,
                    { courseId },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                );
                console.log(response.data)
                setCompleteCourseDetails(response.data.data[0]);
            } catch (error) {
                alert('Failed to fetch course details.');
            }
        };

        getCourseDetails();
    }, [courseId]);

    const toggleModule = (moduleIndex) => {
        setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex);
    };

    const handleVideoSelect = (video) => {
        setCurrentVideo(video);
        setIsSidebarOpen(false); // Close sidebar on video selection (mobile)
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-50 relative">
            {/* Hamburger button for mobile */}
            <button 
                className="lg:hidden absolute top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded-md focus:outline-none"
                onClick={toggleSidebar}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="2" 
                    stroke="currentColor" 
                    className="w-6 h-6"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M4 6h16M4 12h16M4 18h16" 
                    />
                </svg>
            </button>

            {/* Sidebar with modules */}
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:relative lg:bg-transparent lg:opacity-100 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} lg:opacity-100`}
                onClick={toggleSidebar}
            ></div>
            <ModulesList 
                courseTitle={course.title}
                modules={course.modules} 
                expandedModule={expandedModule} 
                toggleModule={toggleModule} 
                onVideoSelect={handleVideoSelect} 
                isSidebarOpen={isSidebarOpen} 
                toggleSidebar={toggleSidebar} 
            />

            {/* Main video player */}
            <div className="flex-1 bg-blue-100 text-white p-6 flex flex-col overflow-y-auto">
                <Player currentVideo={currentVideo} />
                {currentVideo && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg ">
                        <h2 className="text-2xl text-blue-600 font-bold mb-2">{currentVideo.title}</h2>
                        <p className="text-gray-500 text-sm">{currentVideo.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const ModulesList = ({ modules, courseTitle, expandedModule, toggleModule, onVideoSelect, isSidebarOpen, toggleSidebar }) => {
    return (
        <div 
            className={`fixed z-50 inset-y-0 left-0 w-64 shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-1/4 lg:block overflow-auto`}
        >
            <h1 className="text-2xl font-bold mb-6  p-2 text-gray-100 bg-blue-600">{courseTitle}</h1>
            {modules && modules.map((module, index) => (
                <div key={index} className="mb-3">
                    <div 
                        className="flex justify-between items-center p-1  rounded-lg cursor-pointer hover:text-blue-600 transition-all duration-300"
                        onClick={() => toggleModule(index)}
                    >
                        <h2 className=" text-md text-gray-800  hover:text-blue-600">{module.module.title}</h2>
                        <span className="text-2xl text-gray-500  hover:text-blue-600">{expandedModule === index ? '-' : '+'}</span>
                    </div>
                     
                    {expandedModule === index && (
                        <div className="mt-2  px-2 rounded-lg ">
                            {module.videos.map((video) => (
                                <div 
                                    key={video._id} 
                                    className="flex items-center p-1 hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-lg"
                                    onClick={() => onVideoSelect(video)}
                                >
                                    <img src={video.thumbnail} alt="thumbnail" className="w-20 h-10 rounded-lg shadow-md" />
                                    <div className="ml-4">
                                        <p className="font-semibold text-sm text-gray-700">{video.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                            <div className='w-full h-[1px] bg-gray-200'></div>
                </div>
            ))}
        </div>
    );
};

const Player = ({ currentVideo }) => {
    return (
        <div className="flex flex-col items-center justify-center flex-grow bg-blue-50 ">
            {currentVideo ? (
                <div className="w-full">
                    <ReactPlayer 
                        url={currentVideo.videoFile}
                        controls
                        playing
                        volume={null}
                        width="100%"
                        height="100%"
                        className="react-player rounded-lg"
                    />
                </div>
            ) : (
                <div className="text-center text-gray-500 text-xl">Select a video to play</div>
            )}
        </div>
    );
};

export default MyCourseLanding;
