import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCopy } from 'react-icons/fa';
import { TbCopy, TbCopyCheckFilled } from 'react-icons/tb';
import TeacherBlogManagement from '../TeacherFiles/TeacherBlogManagement';

const TeacherUploadResource = () => {
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [resource, setResource] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');
  const [uploadHistory, setUploadHistory] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const loginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));

    if (accessToken && loginInfo) {
      setUserId(loginInfo.userId);
    }
  }, []);

  const handleFileChange = (e) => setResource(e.target.files[0]);

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
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setCloudinaryUrl(response.data.data);
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

  useEffect(() => { if (userId) fetchUploadHistory(); }, [userId]);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const truncateUrl = (url, length = 30) => url.length > length ? `${url.substring(0, length)}...` : url;

  const filteredUploads = uploadHistory.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(resource.date).toLocaleDateString().includes(searchTerm)
  );

  return (
    <TeacherBlogManagement>
      <section className="p-4 bg-blue-50  rounded-xl min-h-screen  border-1 border-blue-400">
     
      <div className="container mx-auto  px-4 md:px-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Upload Resource</h2>

        {/* Upload Form */}
        <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-lg border border-blue-200">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-1">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Enter resource title"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="resource" className="block text-gray-700 font-semibold mb-1">Resource File</label>
            <input
              type="file"
              id="resource"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Display Uploaded Cloudinary URL */}
        {cloudinaryUrl && (
          <div className="mt-6 bg-blue-100 p-4 rounded-lg border border-blue-300">
            <h3 className="text-lg font-semibold text-blue-800">Resource Uploaded Successfully!</h3>
            <div className="flex items-center mt-2">
              <input type="text" value={cloudinaryUrl} readOnly className="w-full p-3 border border-gray-300 rounded-lg" />
              <button className="ml-4 text-blue-600 flex items-center" onClick={() => copyToClipboard(cloudinaryUrl, null)}>
                <FaCopy className="mr-2" /> Copy URL
              </button>
            </div>
          </div>
        )}

        {/* Display Previous Uploads */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Uploaded Resources</h2>
          {filteredUploads.length > 0 ? (
            <table className="w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">URL</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUploads.map((resource, index) => (
                  <tr key={index} className="border-b hover:bg-blue-50 transition duration-300">
                    <td className="py-3 px-4">{resource.title}</td>
                    <td className="py-3 px-4 w-1/3 truncate">
                      <a href={resource.resourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {truncateUrl(resource.resourceUrl)}
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className={`flex items-center ${copiedIndex === index ? 'text-green-600' : 'text-blue-600 hover:text-blue-700'}`}
                        onClick={() => copyToClipboard(resource.resourceUrl, index)}
                      >
                        {copiedIndex === index ? <TbCopyCheckFilled className="mr-2" /> : <TbCopy className="mr-2" />}
                        {copiedIndex === index ? 'Copied' : 'Copy URL'}
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

      </section>
    </TeacherBlogManagement>
  );
};

export default TeacherUploadResource;
