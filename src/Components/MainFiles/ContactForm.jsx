import React, { useState } from "react";
import axios from "axios";
import Headers from "../Utils/Header";
import Footer from "../Utils/Footer";
import LoginImage from '../../Images/LoginImage.jpg';
import { useNavigate,NavLink } from "react-router-dom"; // Assuming you're using React Router
import JoditEditor from "jodit-react";
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
  const navigate = useNavigate();
  const [name ,setName] = useState('');
  const [email ,setEmail] = useState('');
  const [subject ,setSubject] = useState('');
  const [message ,setMessage] = useState('');


  const handleChange = (value) => {
    setMessage(value);
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, subject, message };
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      const response = await axios.post(`${backendUrl}/api/v1/users/save-notification`, {name, email, subject, message});
      toast.success("We got your message ", { position: "bottom-right" });
      handleReset();
    } catch (error) {
      toast.error("Problem in message please reattempt after a few moments", { position: "bottom-right" });
      console.error(error);
    }
  };

const handleReset = (e) => {
 setName('');
 setEmail('');
 setSubject('');
 setMessage('');

}
 
  return (
    <>
    <div className="bg-gradient-to-r from-yellow-50 to-yellow-200">
      <Headers />
      <div className="min-h-screen p-2 flex">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md mx-auto">
          
        <h1 className="text-3xl text-gray-700 font-bold mb-4 lg:mb-0 lg:text-left">Contact Us</h1>
            <img src={LoginImage} alt="Online Teaching" className="rounded-lg shadow-lg border-4 border-yellow-200"/>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <form className="w-full max-w-md border-2 border-slate-400  bg-white rounded-lg p-4" onSubmit={handleSubmit}>
            <label className="block font-semibold text-sm mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              placeholder="Enter Your Name"
              className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded"
              required
            />
            <label className="block font-semibold text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              placeholder="name@mail.com"
              className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded"
              required
            />
            <label className="block font-semibold text-sm mb-2">Subject</label>
            <input
              type="text"
              name='subject'
              value={subject}
              onChange={(e)=>{setSubject(e.target.value)}}
              placeholder="I am interested ..."
              className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded"
              required
            />
            <label className="block font-semibold text-sm mb-2">Message</label>
            <textarea
              name="message"
             value={message}
             onChange={(e)=>{setMessage(e.target.value)}}
              rows={5}
              placeholder="Hello, I am ..."
              className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded"
              required
            />
            {/* <JoditEditor
                value={message}
                onChange={(newContent) => setMessage(newContent)}
                className="mb-4"
              /> */}
            <div className="flex justify-center">
              <button type="submit" className="w-32 h-8 text-sm font-semibold bg-yellow-400 text-black border-2 border-slate-300 rounded mr-4">
                Submit
              </button>
              <button type="button" onClick={handleReset} theme="snow" className="w-32 h-8 text-sm font-semibold bg-white text-black border-2 border-slate-300 rounded">
                Reset
              </button>
            </div>
            
          </form>
        </div>
      </div>
      
      <ToastContainer />
      <Footer />
      </div>
    </>
  );
};

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

  const formats = [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
      'video',
    ]
export default ContactForm;
