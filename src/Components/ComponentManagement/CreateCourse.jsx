import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from "jodit-react";
import { AiOutlineFullscreen } from "react-icons/ai";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [resourceTitle, setResourceTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [creator, setCreator] = useState('');
  const [loginData, setLoginData] = useState({});
  const accessToken = localStorage.getItem('accessToken');
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [description,setDescription] = useState('');
  const [price,setPrice] = useState('');

  useEffect(() => {
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    if (getLoginInfo != null) {
      setLoginData(getLoginInfo);
      setOwner(getLoginInfo.userId);
    }
  }, []);

  const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
  const handleThumbnailUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8085';
    const formData = new FormData();

    formData.append('title', resourceTitle);
    formData.append('userId', getLoginInfo.userId);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('resource', thumbnail); // Ensure 'thumbnail' is the file input element

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }


    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/teacher/upload-resource`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      toast.success("Resource uploaded successfully!", { position: "bottom-right" });
      handleReset();
    } catch (error) {
      toast.error("Error uploading resource. Please try again.", { position: "bottom-right" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  
  const handleChange = (value) => {
    setDescription(value);
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('creator', creator);
    formData.append('owner', owner);
    formData.append('resource', thumbnail);
    formData.append('description', description);
    formData.append('price', price);
    try {
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/teacher/create-course`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      toast.success("Course created successfully!", { position: "bottom-right" });
      setLoading(false);
      // Optionally, you can navigate to another page after successful creation
      // navigate('/some-other-page');
    } catch (error) {
      toast.error("Error creating course. Please try again.", { position: "bottom-right" });
      console.error(error);
    }
  };

  const handleReset = () => {
    setTitle('');
    setCreator('');
  };

  return (
    <>
        <section className="flex justify-center items-center">
       
              <div className="divide-y divide-gray-200 ">
              {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="ml-2">Creating your video Course <b>{title}</b>, please wait...</span>
                  </div>
                ) : (
                <form className="p-2 w-4/5 bg-[#EBECEC] " onSubmit={handleSubmit}>
                  <div className="m-4 p-1">
                    <label className="block font-semibold p-2">Title</label>
                    <input
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="border-1 block border-gray-200 p-2 rounded w-full"
                      placeholder="Title"
                      required
                    />
                    <label className="block  font-semibold  p-2">Creator</label>
                    <input
                      name="creator"
                      value={creator}
                      onChange={(e) => setCreator(e.target.value)}
                      className="block w-full  border-1 border-gray-200 p-2 rounded"
                      placeholder="Creator"
                      required
                    />
                    <label className="block  font-semibold  p-2">Price</label>
                    <input
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="block w-full border-1 border-gray-200 p-2 rounded"
                      placeholder="Price of Course"
                      required
                    />
                    <label className="block  font-semibold mt-2 p-2">Thumbnail</label>
                    <input type="file" name="resource" onChange={(e) => setThumbnail(e.target.files[0])} />
                    <label className="block  font-semibold mt-2 p-2">Description <span className="text-red-500 font-medium text-sm">(click on <AiOutlineFullscreen className="inline" /> to open in full screen)</span></label>

                    <JoditEditor
                value={description}
                onChange={(newContent) => setDescription(newContent)}
                className="mb-4"
              />
                  </div>
                  <div className="flex justify-center">
                    <button type="button" onClick={handleReset} className="w-full mx-4 h-10 text-md font-semibold bg-[#002333] text-white rounded-sm mr-4">
                      Reset
                    </button>
                    <button type="submit" className="w-full mx-4 h-10 text-md font-semibold bg-[#01ff85] text-[#002333] border border-gray-300 rounded-sm">
                      Create
                    </button>
                  </div>
                </form>
              )}
                {/* {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="ml-2">Uploading your video, please wait...</span>
                  </div>
                ) : (<form >
                  <label className="block p-2">Title</label>
                  <input
                    name="title"
                    value={resourceTitle}
                    onChange={(e) => setResourceTitle(e.target.value)}
                    className="border-1 block border-gray-200 p-2 rounded w-full"
                    placeholder="Title"
                    required
                  />
                  <label className="block p-2">Thumbnail</label>
                  <input type="file" name="resource" onChange={(e) => setThumbnail(e.target.files[0])} />

                  <div className="flex justify-center">
                    <button type="button" onClick={handleThumbnailUpload} className="w-32 h-8 text-sm font-semibold bg-yellow-400 text-black border-2 border-slate-300 rounded mr-4">
                      Submit
                    </button>
                    <button type="button" onClick={handleReset} className="w-32 h-8 text-sm font-semibold bg-white text-black border-2 border-slate-300 rounded">
                      Reset
                    </button>
                  </div>
                </form>
                )} */}
              </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default CreateCourse;
