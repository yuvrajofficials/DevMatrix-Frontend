import React from "react";
import { useState, useEffect } from "react";

import HomeSection from "./Components/LandingPages/HomeSection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactSection from "./Components/LandingPages/ContactSection"
import AboutSection from "./Components/LandingPages/AboutusSection";
import CourseSection from "./Components/LandingPages/CourseSection";
import BlogsSection from "./Components/LandingPages/BlogSection";
import LoginForm from "./Components/Utility/utils1/LoginForm";
import UserDashboard from "./Components/UserFiles/UserDashboard";
import AdminAuth from "./Components/AdminFiles/AdminAuth";
import PageNotFound from "./Components/Utils/PageNotFound";
import UserAuth from "./Components/UserFiles/UserAuth";
import LogoutButton from "./Components/Utils/Logout";
import AdminHome from "./Components/AdminFiles/AdminHome";
import AdminDashboard from "./Components/AdminFiles/AdminDashboard";
import AdminNotifications from "./Components/AdminFiles/AdminNotifications";
import AdminTodolist from "./Components/AdminFiles/AdminTodolist";
import AdminUploadCourse from "./Components/AdminFiles/AdminUploadVIdeo";
import AdminUploadVideo from "./Components/AdminFiles/AdminUploadVIdeo";
import AdminCreateCourse from "./Components/AdminFiles/AdminCreateCourse";
import PaymentsPage from "./Components/Utils2/Payments";
import DetailsPage from "./Components/Utils2/DetailsPage";
import BlogDetails from "./Components/Utils2/BlogDetails";
import OfflineComponent from "./Components/Utils2/OfflineComponent";
import MyTeam from "./Components/AdminFiles/MyTeam";
import AdminCourseManager from "./Components/AdminFiles/AdminCourse";
import ReviewsForm from "./Components/Utils/ReviewsForm";
import RegisterUser from "./Components/Utility/utils1/RegisterUser";
import UserProfile from "./Components/UserFiles/UserProfile";
import UserMyCourses from "./Components/UserFiles/UserMyCourses";
import UserHistory from "./Components/UserFiles/UserHistory";
import Todolist from "./Components/UserFiles/Todolist";
import UserNotifications from "./Components/UserFiles/UserNotifications";
import TeacherAuth from "./Components/TeacherFiles/TeacherAuth";
import TeacherDashboard from "./Components/TeacherFiles/TeacherDashboard";
import TeacherCourseManagement from "./Components/TeacherFiles/TeacherCourseManagement";
import TeacherProfile from "./Components/TeacherFiles/TeacherProfile";
import TeacherHistory from "./Components/TeacherFiles/TeacherHistory";
import TeacherNotifications from "./Components/TeacherFiles/TeacherNotifications";
import TeacherBlogManagement from "./Components/TeacherFiles/TeacherBlogManagement";
import TeacherTasks from "./Components/TeacherFiles/TeacherTasks";
import CreateCourseTeacher from "./Components/TeacherCourseManagementUtils/CreateCourse";
import ViewAllCourseTeacher from "./Components/TeacherCourseManagementUtils/ViewAllCourse";
import UploadVideo from "./Components/TeacherCourseManagementUtils/UploadVIdeo";
import CourseSettings from "./Components/TeacherCourseManagementUtils/CourseSettings";
import EditCourse from "./Components/TeacherCourseManagementUtils/EditCourse";
import DummyPaymentGateway from "./Components/Utils2/DummyPaymentGateway";
import CreateModule from "./Components/TeacherCourseManagementUtils/CreateModule";
import MyCourseLanding from "./Components/MyLearning/MyCourseLanding";
import MyLearningGallery from "./Components/MyLearning/MyLearningGallery";
import AddToCart from "./Components/UserFiles/AddToCart";
import TeacherUploadResource from "./Components/TeacherBlogManagement/TeacherUploadResource";
import TeacherCreateBlog from "./Components/TeacherBlogManagement/TeacherCreateBlog";
import ViewAllBlogs from "./Components/TeacherBlogManagement/TeacherViewBlogs";


const App = () => {

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);


  return (
    <>

      {isOnline ? <>
        <BrowserRouter>
          <Routes>
            {/* main content */}
            <Route exact path="/" element={<HomeSection />} />
            <Route exact path="/home" element={<HomeSection />} />
            <Route exact path="/contact" element={<ContactSection />} />
            <Route exact path="/about" element={<AboutSection />} />

            <Route exact path="/courses" element={<CourseSection />} />
            <Route exact path="/blogs" element={<BlogsSection />} />
            <Route exact path="/share-reviews" element={<ReviewsForm />} />


            {/* other utility routes */}
            <Route exact path="/courses/detailspage" element={<DetailsPage />} />
            <Route exact path="/courses/detailspage/payments" element={<DummyPaymentGateway />} />
            <Route exact path="/blogs/detailspage" element={<BlogDetails />} />
            
            
            <Route exact path="/mycourses" element={<MyLearningGallery />} />
            <Route exact path="/mycourses/:title/:courseId" element={<MyCourseLanding />} />
            <Route exact path="/mycourses/:title/:courseId" element={<MyCourseLanding />} />

            


            {/* pages */}
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/register" element={<RegisterUser />} />
            <Route exact path="/logout" element={<LogoutButton />} />

            {/* page not found */}

            <Route path="*" element={<PageNotFound />} />


            {/* authentified routes */}
            <Route path="/user" element={<UserAuth />}>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="mylearning" element={<UserDashboard />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="mycourses" element={<UserMyCourses />} />
              <Route path="myhistory" element={<UserHistory />} />
              <Route path="mytasks" element={<Todolist />} />
              <Route path="addtocart" element={<AddToCart />} />
              <Route path="notifications" element={<UserNotifications />} />

            </Route>

            {/* authentified routes */}
            <Route path="/teacher" element={<TeacherAuth />}>
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="profile" element={<TeacherProfile />} />
              <Route path="myhistory" element={<TeacherHistory />} />
              <Route path="my-tasks" element={<TeacherTasks />} />
              <Route path="notification-management" element={<TeacherNotifications />} />
              {/* course management route */}
              <Route path="course-management" element={<TeacherCourseManagement />} />
              <Route path="course-management/create-course" element={<CreateCourseTeacher />} />
              <Route path="course-management/view-all-course" element={<ViewAllCourseTeacher />} />
              <Route path="course-management/upload-video" element={<UploadVideo />} />
              <Route path="course-management/course-settings" element={<CourseSettings />} />
              <Route path="course-management/edit-course" element={<EditCourse />} />
              <Route path="course-management/create-modules" element={<CreateModule />} />

              <Route path="blog-management" element={<TeacherBlogManagement />} />
              <Route path="blog-management/upload-resources" element={<TeacherUploadResource />} />
              <Route path="blog-management/create-blog" element={<TeacherCreateBlog/>} />
              <Route path="blog-management/view-all-blogs" element={<ViewAllBlogs/>} />


            </Route>


            {/* authentified routes */}
            <Route path="/admin" element={<AdminAuth />}>
              <Route path="home" element={<AdminHome />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="to-do-list" element={<AdminTodolist />} />
              <Route path="upload-video" element={<AdminUploadVideo />} />
              <Route path="course-management" element={<AdminCourseManager />} />
              <Route path="my-team" element={<MyTeam />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
        :
        <>
          <OfflineComponent />
        </>
      }
    </>
  );
};

export default App;
