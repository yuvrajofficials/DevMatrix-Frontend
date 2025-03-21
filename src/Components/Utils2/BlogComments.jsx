import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const BlogComments = () => {
  const context = useOutletContext();
  const blogData = context?.blogData; // Ensure blogData is not null
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(blogData?.comments || []);

  if (!blogData) {
    return <p>Blog data not found.</p>; // Render a fallback UI if blogData is null
  }

  const handleComment = () => {
    setComments([
      ...comments,
      {
        userDetails: { username: 'Current User' },
        comment: { text: comment, date: new Date().toISOString() },
      },
    ]);
    setComment('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Comments</h2>
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          placeholder="Share your thoughts..."
        />
        <div className="flex justify-end mt-4 space-x-4">
          <button onClick={handleComment} className="px-6 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg">
            Comment
          </button>
          <button onClick={() => setComment('')} className="px-6 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg">
            Reset
          </button>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((commentData, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <img
                  src={commentData.userDetails.avatar || 'default-avatar-url'}
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
  );
};

export default BlogComments;
