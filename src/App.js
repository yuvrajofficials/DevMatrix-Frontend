import React from "react";

import HeroSection from "./Components/MainFiles/HeroSection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactForm from "./Components/MainFiles/ContactForm";
import AboutSection from "./Components/MainFiles/AboutSection";
import CourseSection from "./Components/MainFiles/CourseSection";
import BlogsSection from "./Components/MainFiles/BlogsSection";
import CreateAccount from "./Components/Utils/CreateAccount";
import LoginForm from "./Components/Utils/LoginForm";
import UserDashboard from "./Components/UserFiles/UserDashboard";
import AdminAuth from "./Components/AdminFiles/AdminAuth";
import PageNotFound from "./Components/Utils/PageNotFound";
import { StoreAdmin } from "./Components/AdminFiles/StoreAdmin";
import UserAuth from "./Components/UserFiles/UserAuth";
import LogoutButton from "./Components/Utils/Logout";
import AdminHome from "./Components/AdminFiles/AdminHome";
import CheckStatus from "./Components/Utils/CheckStatus";
import AdminDashboard from "./Components/AdminFiles/AdminDashboard";
import AdminNotifications from "./Components/AdminFiles/AdminNotifications";
import AdminTodolist from "./Components/AdminFiles/AdminTodolist";
import AdminUploadCourse from "./Components/AdminFiles/AdminUploadVIdeo";
import AdminUploadVideo from "./Components/AdminFiles/AdminUploadVIdeo";
import AdminCreateCourse from "./Components/AdminFiles/AdminCreateCourse";
import PaymentsPage from "./Components/Utils/Payments";
import DetailsPage from "./Components/Utils2/DetailsPage";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* main content */}
          <Route exact path="/" element={<HeroSection />} />
          <Route exact path="/home" element={<HeroSection />} />
          <Route exact path="/contact" element={<ContactForm />} />
          <Route exact path="/about" element={<AboutSection />} />
          <Route exact path="/courses" element={<CourseSection />} />
          <Route exact path="/blogs" element={<BlogsSection />} />

          {/* other utility routes */}
          <Route exact path="/courses/detailspage" element={<DetailsPage />} />
          <Route exact path="/courses/detailspage/payments" element={<PaymentsPage />} />

          

          {/* pages */}
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/register" element={<CreateAccount />} />
          <Route exact path="/logout" element={<LogoutButton />} />

          {/* page not found */}

          <Route path="*" element={<PageNotFound />} />


          {/* authentified routes */}
          <Route path="/user" element={<UserAuth />}>
            <Route path="dashboard" element={<UserDashboard />} />
          </Route>

          {/* authentified routes */}
          <Route path="/admin" element={<AdminAuth />}>
            <Route path="home" element={<AdminHome />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="notifications" element={<AdminNotifications/>} />
            <Route path="to-do-list" element={<AdminTodolist />} />
            <Route path="upload-video" element={<AdminUploadVideo />} />
            <Route path="create-course" element={<AdminCreateCourse />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
