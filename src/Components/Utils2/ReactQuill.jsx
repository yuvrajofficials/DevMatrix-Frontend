import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const RichTextEditor = () => {
  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formatted Text:', text);sdsd
    // You can send the formatted text to the backend or process it as needed
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rich Text Editor</h1>
      <form onSubmit={handleSubmit}>
        <ReactQuill value={text} onChange={handleChange} className="mb-4" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RichTextEditor;
