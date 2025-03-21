import React from 'react';
import { useOutletContext } from 'react-router-dom';

const BlogPage = () => {
  const context = useOutletContext();
  const blogData = context?.blogData; // Ensure blogData is not null

  if (!blogData) {
    return <p>Blog data not found.</p>; // Render a fallback UI if blogData is null
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{blogData.title}</h1>
      <div className="flex justify-between items-center text-gray-500 mb-4">
        <p className="text-sm">By {blogData.author}</p>
        <p className="text-sm">{new Date(blogData.publishedDate).toLocaleDateString()}</p>
      </div>
      <img src={blogData.thumbnail} alt={blogData.title} className="rounded-lg border-2 w-full h-96 object-cover mb-6" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Abstract</h2>
      <p className="text-gray-600 mb-6">{blogData.abstract}</p>
      <div className="prose lg:prose-xl max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: blogData.description }} />
    </div>
  );
};

export default BlogPage;
