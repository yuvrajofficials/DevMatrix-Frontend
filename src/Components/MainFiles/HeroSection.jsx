import React, { useState } from "react";
import DevMatrix_Logo from "../../Images/DevMatrix_Logo.png";
import Header from '../Utils/Header'
import Footer from '../Utils/Footer'
import heroImage from '../../Images/heroImage.jpg'
import '../../CSS/main.css'
import ContactForm from "./ContactForm";
import HeroContent from "../Utils/HeroContent";

const HeroSection = () => {

  const [isLoggedIn,loginStatus] = useState(false)

  return (
    <>
      <nav className="bg-gradient-to-r from-yellow-50 to-yellow-200" >
       <Header/>
      <HeroContent/>
       <Footer/>
      </nav>
    </>
  );
};

export default HeroSection;
