import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCopy } from 'react-icons/fa';
import TeacherBlogManagement from '../TeacherFiles/TeacherBlogManagement';
import { TbCopy, TbCopyCheckFilled } from 'react-icons/tb';

const TeacherUploadResource = () => {
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [resource, setResource] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');
  const [uploadHistory, setUploadHistory] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const loginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));

    if (accessToken && loginInfo) {
      setUserId(loginInfo.userId);
    }
  }, []);

  const handleFileChange = (e) => {
    setResource(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!userId || !title || !resource) {
      alert('Please fill out all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('title', title);
    formData.append('resourceFile', resource);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8085';
      const response = await axios.post(`${backendUrl}/api/v1/teacher/upload-blog-resource`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const url = response.data.data;
      setCloudinaryUrl(url);
      fetchUploadHistory();
    } catch (error) {
      console.error('Error uploading resource:', error);
      alert('Error uploading resource. Please try again.');
    }
  };

  const fetchUploadHistory = async () => {
    if (!userId) return;
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8085';
      const response = await axios.get(`${backendUrl}/api/v1/teacher/uploaded-blog-resource/${userId}`);
      setUploadHistory(response.data.data);
    } catch (error) {
      console.error('Error fetching upload history:', error);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  useEffect(() => {
    if (userId) {
      fetchUploadHistory();
    }
  }, [userId]);

  const truncateUrl = (url, length = 30) => {
    return url.length > length ? `${url.substring(0, length)}...` : url;
  };

  // Filter uploaded resources based on search term
  const filteredUploads = uploadHistory.filter((resource) =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(resource.date).toLocaleDateString().includes(searchTerm)
  );

  return (
    <TeacherBlogManagement>
      <div className="container mx-auto py-10 px-4 md:px-8">
        <h2 className="text-2xl font-semibold mb-6">Upload Resource</h2>
        <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter resource title"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="resource" className="block text-gray-700">Resource File</label>
            <input
              type="file"
              id="resource"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#01C567] text-white py-2 px-4 rounded-lg"
          >
            Upload
          </button>
        </form>

        {/* Search Box */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search by title or date"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Display Uploaded Cloudinary URL */}
        {cloudinaryUrl && (
          <div className="mt-6 bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Resource Uploaded Successfully!</h3>
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={cloudinaryUrl}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <button
                className="ml-4 text-blue-500 flex items-center"
                onClick={() => copyToClipboard(cloudinaryUrl, null)}
              >
                <FaCopy className="mr-2" /> Copy URL
              </button>
            </div>
          </div>
        )}

        {/* Display Previous Uploads */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">Uploaded Resources</h2>
          {filteredUploads.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">URL</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUploads.map((resource, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{resource.title}</td>
                    <td className="py-2 px-4 w-1/3 truncate border-b">
                      <a
                        href={resource.resourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline" 
                      >
                        {truncateUrl(resource.resourceUrl)}
                      </a>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className={`flex items-center ${copiedIndex === index ? 'text-green-500' : 'text-blue-500'}`}
                        onClick={() => copyToClipboard(resource.resourceUrl, index)}
                      >
                        {copiedIndex === index ? <><TbCopyCheckFilled className="mr-2" /> Copied</> : <><TbCopy className="mr-2" /> Copy URL</>}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No resources uploaded yet.</p>
          )}
        </div>
      </div>
    </TeacherBlogManagement>
  );
};

export default TeacherUploadResource;
