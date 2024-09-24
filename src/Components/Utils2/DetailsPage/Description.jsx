import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import slugify from 'slugify';

const Description = ({ course }) => {
    return (
      <>
        {course ? (
          <>
            <h1>Description</h1>
            <p>{course.title}</p>
            <div dangerouslySetInnerHTML={{ __html: course.description }} />
          </>
        ) : (
          <p>Error in getting data</p>
        )}
      </>
    );
  };
  
  export default Description;