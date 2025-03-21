import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Utility/utils1/Headers';
import Footer from '../Utility/utils1/Footers';
import { BiComment, BiShare, BiUpvote } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import axios from 'axios';
import { FaCopy, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa6';

const BlogDetails = () => {
    const location = useLocation();
    const [blogData, setBlogData] = useState(location.state?.blog || null);
    const [content, setContent] = useState(0); // 0 for Blog, 1 for Comments
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [sharePopup, setSharePopup] = useState(false);
    const shareRef = useRef(); // Reference for the share popup

    useEffect(() => {
        if (!blogData) {
            console.error("Blog data not available. Please navigate through the blog list.");
        }
    }, [blogData]);

    // Close share popup when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (shareRef.current && !shareRef.current.contains(event.target)) {
                setSharePopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleComment = async () => {
        if (comment.trim()) {
            const newComment = {
                userDetails: {
                    username: 'User', // Replace with actual user data if available
                    avatar: 'default-avatar-url' // Replace with actual user avatar
                },
                comment: {
                    text: comment,
                    date: new Date().toISOString(),
                },
            };
            setComments([...comments, newComment]);

            // Save comment to the database
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            try {
                await axios.post(`${backendUrl}/api/v1/comments`, {
                    blogId: blogData._id, // Assuming you have a blog ID
                    comment: newComment
                });
            } catch (error) {
                console.error('Error saving comment:', error);
            }

            setComment('');
        }
    };

    const handleShare = () => {
        setSharePopup(!sharePopup);
    };

    const handleShareOptionClick = (platform) => {
        const shareUrl = window.location.href; // Current blog URL
        let shareMessage;

        switch (platform) {
            case 'facebook':
                shareMessage = `Check out this blog: ${shareUrl}`;
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
                break;
            case 'twitter':
                shareMessage = `Check out this blog: ${shareUrl}`;
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`, '_blank');
                break;
            case 'linkedin':
                shareMessage = `Check out this blog: ${shareUrl}`;
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
                break;
            default:
                break;
        }
        setSharePopup(false); // Close the popup after selecting
    };

    const handleCopyToClipboard = async () => {
        const shareUrl = window.location.href; // Current blog URL
        try {
            await navigator.clipboard.writeText(shareUrl);
            alert('URL copied to clipboard!'); // Provide feedback to the user
        } catch (error) {
            console.error('Failed to copy: ', error);
        }
    };

    // If blogData is not available, display an error message
    if (!blogData) return <p className="text-center text-red-500">Blog data not found.</p>;

    return (
        <>
            <Header />
            <div className="container mx-auto bg-[#fff] min-h-screen sm:w-full md:w-3/4 lg:w-3/4  p-6 flex flex-col items-center">
                <div className="sm:w-full md:w-3/4 lg:w-3/4 bg-[#fff] p-4 min-h-screen rounded-lg flex flex-col items-center">
                    {/* Navigation for Blog and Comments */}
                    {/* <nav className="text-sm text-gray-500 mb-4 flex items-center justify-start ">
                        <button
                            onClick={() => {
                                setContent(0); // Switch to Blog content
                                setSharePopup(false); // Close share popup when switching tabs
                            }}
                            className={`hover:bg-[#ff5b2b] hover:text-[#ff5b2b] transition-colors duration-200 px-4 py-2 rounded ${content === 0 ? 'bg-[#ff5b2b] text-white' : 'bg-transparent text-[#304261]'
                                }`}
                        >
                            Blog
                        </button>

                        <button
                            onClick={() => {
                                setContent(1); // Switch to Comments
                                setSharePopup(false); // Close share popup when switching tabs
                            }}
                            className={`hover:bg-[#ff5b2b] hover:text-[#ff5b2b] transition-colors duration-200 px-4 py-2 rounded ${content === 1 ? 'bg-[#ff5b2b] text-white' : 'bg-transparent text-[#304261]'
                                }`}
                        >
                            Comments
                        </button>
                    </nav> */}

                    {/* Display Blog content */}
                    {content === 0 ? (
                        <div className="bg-[#fff] sm:p-0 w-full flex flex-col items-center ">
                            <h1 className="text-2xl font-semibold mb-4 text-gray-800 text-left">{blogData.title}</h1>
                            <div className="flex justify-between items-center text-gray-500 mb-4 w-full">
                                <p className="text-sm">By {blogData.author}</p>
                                <p className="text-sm">{new Date(blogData.publishedDate).toLocaleDateString()}</p>
                            </div>
                            <img src={blogData.thumbnail} alt={blogData.title} className="rounded-lg border-2 w-auto h-36 object-cover" />
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Abstract</h2>
                            <p className="text-gray-600 mb-6 text-center">{blogData.abstract}</p>
                            <div className="prose lg:prose-xl max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: blogData.description }} />
                        </div>
                    ) : (
                        // Display Comments section
                        <div className="bg-white p-6 rounded-lg shadow-md w-full flex flex-col items-center">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Comments</h2>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-4 w-full">
                                <h3 className="text-lg font-semibold mb-2">Write a Comment</h3>
                                <textarea
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={5}
                                    placeholder="Share your thoughts..."
                                />
                                <div className="flex justify-end space-x-4">
                                    <button onClick={() => setComment('')} className="px-6 py-2 text-white bg-[#304261] border border-gray-300 hover:bg-gray-100 rounded-lg">
                                        Reset
                                    </button>
                                    <button onClick={handleComment} 
                                    className="px-6 py-2 text-white  bg-[#ff5b2b] hover:bg-[#ffa146] rounded-lg">
                                        Comment
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 space-y-4 w-full">
                                {comments.length === 0 ? (
                                    <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
                                ) : (
                                    comments.map((commentData, index) => (
                                        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md w-full">
                                            <div className="flex items-center mb-2">
                                                <img
                                                    src={commentData.userDetails.avatar}
                                                    alt={commentData.userDetails.username}
                                                    className="w-10 h-10 rounded-full mr-2"
                                                />
                                                <div>
                                                    <p className="font-semibold">{commentData.userDetails.username}</p>
                                                    <p className="text-gray-500 text-sm">Posted on: {new Date(commentData.comment.date).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-700">{commentData.comment.text}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="relative w-3/4">
                    <div className={`absolute bottom-0 w-full bg-white shadow-md grid grid-cols-4 py-3 border-t border-gray-200 ${sharePopup ? 'pb-36' : ''}`}>
                        {/* Bottom Navigation Items */}
                        <div className="flex flex-col items-center text-[#304261] hover:text-[#ff5b2b] cursor-pointer transition duration-300" onClick={() => setContent(0)}>
                            <BiUpvote className="h-6 w-6" />
                            <span className="text-sm">Upvote</span>
                        </div>
                        <div className="flex flex-col items-center text-[#304261] hover:text-[#ff5b2b] cursor-pointer transition duration-300" onClick={() => setContent(0)}>
                            <BsEye className="h-6 w-6" />
                            <span className="text-sm">Views</span>
                        </div>
                        <div className="flex flex-col items-center text-[#304261] hover:text-[#ff5b2b] cursor-pointer transition duration-300" onClick={handleShare}>
                            <BiShare className="h-6 w-6" />
                            <span className="text-sm">Share</span>
                        </div>
                        <div className="flex flex-col items-center text-[#304261] hover:text-[#ff5b2b] cursor-pointer transition duration-300" onClick={() => setContent(1)}>
                            <BiComment className="h-6 w-6" />
                            <span className="text-sm">Comment</span>
                        </div>
                    </div>

                    {sharePopup && (
                        <div ref={shareRef} className="absolute bottom-20 w-full bg-white shadow-lg rounded-md p-4 z-10">
                            <h3 className="text-lg font-bold mb-2">Share this blog</h3>
                            <div className="flex justify-around">
                                <FaFacebook onClick={() => handleShareOptionClick('facebook')} className="w-8 h-8 text-[#304261] rounded-md cursor-pointer hover:text-[#3b5998] transition duration-300"/>
                                <FaTwitter onClick={() => handleShareOptionClick('twitter')} className="w-8 h-8 text-[#304261] rounded-md cursor-pointer hover:text-[#1DA1F2] transition duration-300"/>
                                <FaLinkedin onClick={() => handleShareOptionClick('linkedin')} className="w-8 h-8 text-[#304261] rounded-md cursor-pointer hover:text-[#0077b5] transition duration-300"/>
                                <FaCopy onClick={handleCopyToClipboard} className="w-8 h-8 text-[#304261] rounded-md cursor-pointer hover:text-gray-600 transition duration-300"/>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogDetails;
