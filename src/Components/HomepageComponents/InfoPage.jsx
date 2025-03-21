import React from 'react';
import { BsGraphUpArrow } from 'react-icons/bs';
import { FaBlog, FaBook } from 'react-icons/fa6';
import { GiTakeMyMoney } from 'react-icons/gi';
import { PiShootingStarLight } from 'react-icons/pi';

const InfoPage = () => {
    return (
        <>
            {/* Desktop View */}
            <div className="hidden md:flex flex-col">
                <div className="flex justify-between">
                    <div className="m-4 p-3">
                        <p className="text-5xl text-gray-800">
                            What we are providing to 
                            <div>you through our platform</div>
                        </p>
                        <p className="text-lg py-2 text-gray-500">
                            We will help in many ways for your personal growth, skill development, soft skills, and more.
                        </p>
                    </div>
                    <div className="flex justify-end space-x-6">
                        <DataBlock
                            icon={<PiShootingStarLight className="text-white p-2 rounded-lg bg-pink-400 w-10 h-10" />}
                            title="Want to be a creator"
                            description="We are providing you a platform to showcase and monetize your skills."
                        />
                        <DataBlock
                            icon={<FaBook className="text-white p-2 rounded-lg bg-green-400 w-10 h-10" />}
                            title="Want to learn a skill"
                            description="We have all the courses for your skills. Just sign up and explore courses."
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-6">
                    <DataBlock
                        icon={<FaBlog className="text-white p-2 rounded-lg bg-yellow-400 w-10 h-10" />}
                        title="Want to be a blogger"
                        description="We have a tailored user base who will read and increase the reach of your blogs."
                    />
                    <DataBlock
                        icon={<BsGraphUpArrow className="text-white p-2 rounded-lg bg-red-400 w-10 h-10" />}
                        title="Want to be consistent"
                        description="We provide continuous tracking and monitoring of your performance."
                    />
                    <DataBlock
                        icon={<GiTakeMyMoney className="text-white p-2 rounded-lg bg-purple-400 w-10 h-10" />}
                        title="Want a side hustle"
                        description="By creating courses, you'll earn tokens that can be redeemed for money."
                    />
                </div>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden p-4 sm:p-6 lg:p-12 bg-gray-50">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
                        What we are providing to you through our platform
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg mt-2 text-gray-500">
                        We will help in many ways for your personal growth, skill development, soft skills, and more.
                    </p>
                </div>

                {/* Data Blocks Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DataBlockM
                        icon={<PiShootingStarLight className="text-white p-2 rounded-lg bg-pink-400 w-10 h-10 sm:w-12 sm:h-12" />}
                        title="Want to be a creator"
                        description="We are providing you a platform to showcase and monetize your skills."
                    />
                    <DataBlockM
                        icon={<FaBook className="text-white p-2 rounded-lg bg-green-400 w-10 h-10 sm:w-12 sm:h-12" />}
                        title="Want to learn a skill"
                        description="We have all the courses for your skills. Just sign up and explore courses."
                    />
                    <DataBlockM
                        icon={<FaBlog className="text-white p-2 rounded-lg bg-yellow-400 w-10 h-10 sm:w-12 sm:h-12" />}
                        title="Want to be a blogger"
                        description="We have a tailored user base who will read and increase the reach of your blogs."
                    />
                    <DataBlockM
                        icon={<BsGraphUpArrow className="text-white p-2 rounded-lg bg-red-400 w-10 h-10 sm:w-12 sm:h-12" />}
                        title="Want to be consistent"
                        description="We provide continuous tracking and monitoring of your performance."
                    />
                    <DataBlockM
                        icon={<GiTakeMyMoney className="text-white p-2 rounded-lg bg-purple-400 w-10 h-10 sm:w-12 sm:h-12" />}
                        title="Want a side hustle"
                        description="By creating courses, you'll earn tokens that can be redeemed for money."
                    />
                </div>
            </div>
        </>
    );
};

export default InfoPage;

const DataBlock = ({ icon, title, description }) => (
    <div className="flex bg-gray-100 m-4 rounded-lg flex-col items-start w-64 p-3 transition-shadow duration-300">
        {icon}
        <div className="flex">
            <span className="text-lg font-semibold text-gray-900">{title}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
);

const DataBlockM = ({ icon, title, description }) => (
    <div className="flex bg-white rounded-lg shadow-lg flex-col items-start p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
        {icon}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-2">{title}</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2">{description}</p>
    </div>
);
