import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import sections
import HomeSection from "./Components/LandingPages/HomeSection";
import ContactSection from "./Components/LandingPages/ContactSection";
import AboutSection from "./Components/LandingPages/AboutusSection";
import CourseSection from "./Components/LandingPages/CourseSection";
import BlogsSection from "./Components/LandingPages/BlogSection";

// Import utility pages and forms
import LoginForm from "./Components/Utility/utils1/LoginForm";
import RegisterUser from "./Components/Utility/utils1/RegisterUser";
import LogoutButton from "./Components/Utils/Logout";
import ReviewsForm from "./Components/Utils/ReviewsForm";
import PageNotFound from "./Components/Utils/PageNotFound";

// Import detail pages
import DetailsPage from "./Components/Utils2/DetailsPage";
import DummyPaymentGateway from "./Components/Utils2/DummyPaymentGateway";
import BlogDetails from "./Components/Utils2/BlogDetails";
import BlogComment from "./Components/Utils2/BlogComments";
import OfflineComponent from "./Components/Utils2/OfflineComponent";

// Import user components
import UserAuth from "./Components/UserFiles/UserAuth";
import UserDashboard from "./Components/UserFiles/UserDashboard";
import UserProfile from "./Components/UserFiles/UserProfile";
import UserMyCourses from "./Components/UserFiles/UserMyCourses";
import UserHistory from "./Components/UserFiles/UserHistory";
import Todolist from "./Components/UserFiles/Todolist";
import UserNotifications from "./Components/UserFiles/UserNotifications";
import MyLearningGallery from "./Components/MyLearning/MyLearningGallery";
import MyCourseLanding from "./Components/MyLearning/MyCourseLanding";
import AddToCart from "./Components/UserFiles/AddToCart";

// Import admin components
import AdminAuth from "./Components/AdminFiles/AdminAuth";
import AdminHome from "./Components/AdminFiles/AdminHome";
import AdminDashboard from "./Components/AdminFiles/AdminDashboard";
import AdminNotifications from "./Components/AdminFiles/AdminNotifications";
import AdminTodolist from "./Components/AdminFiles/AdminTodolist";
import AdminUploadVideo from "./Components/AdminFiles/AdminUploadVIdeo";
import AdminCourseManager from "./Components/AdminFiles/AdminCourse";
import MyTeam from "./Components/AdminFiles/MyTeam";

// Import teacher components
import TeacherAuth from "./Components/TeacherFiles/TeacherAuth";
import TeacherDashboard from "./Components/TeacherFiles/TeacherDashboard";
import TeacherProfile from "./Components/TeacherFiles/TeacherProfile";
import TeacherHistory from "./Components/TeacherFiles/TeacherHistory";
import TeacherNotifications from "./Components/TeacherFiles/TeacherNotifications";
import TeacherTasks from "./Components/TeacherFiles/TeacherTasks";
import TeacherCourseManagement from "./Components/TeacherFiles/TeacherCourseManagement";
import TeacherBlogManagement from "./Components/TeacherFiles/TeacherBlogManagement";

// Teacher course management utilities
import CreateCourseTeacher from "./Components/TeacherCourseManagementUtils/CreateCourse";
import ViewAllCourseTeacher from "./Components/TeacherCourseManagementUtils/ViewAllCourse";
import UploadVideo from "./Components/TeacherCourseManagementUtils/UploadVIdeo";
import CourseSettings from "./Components/TeacherCourseManagementUtils/CourseSettings";
import EditCourse from "./Components/TeacherCourseManagementUtils/EditCourse";
import CreateModule from "./Components/TeacherCourseManagementUtils/CreateModule";

// Teacher blog management utilities
import TeacherUploadResource from "./Components/TeacherBlogManagement/TeacherUploadResource";
import TeacherCreateBlog from "./Components/TeacherBlogManagement/TeacherCreateBlog";
import ViewAllBlogs from "./Components/TeacherBlogManagement/TeacherViewBlogs";
import BlogSettings from "./Components/TeacherBlogManagement/BlogSettings";
import MarkdownEditor from "./Components/LandingPages/MarkdownEditor";
import MyCourseCanvas from "./Components/MyLearning/MyCourseCanvas";

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {isOnline ? (
        
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomeSection />} />
            <Route path="/home" element={<HomeSection />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/courses" element={<CourseSection />} />
            <Route path="/markdown" element={<MarkdownEditor />} />
            <Route path="/blogs" element={<BlogsSection />} />
            <Route path="/share-reviews" element={<ReviewsForm />} />
            <Route path="/courses/detailspage" element={<DetailsPage />} />
            <Route path="/courses/detailspage/payments" element={<DummyPaymentGateway />} />
            <Route path="/blogs/detailspage/content/:title/:blogId" element={<BlogDetails />} />
            <Route path="/blogs/detailspage/comments/:title/:blogId" element={<BlogComment />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/logout" element={<LogoutButton />} />
            <Route path="/mycourses" element={<MyLearningGallery />} />
            <Route path="/mycourses/:title/:courseId" element={<MyCourseLanding />} />

            {/* User authenticated routes */}
            <Route path="/user" element={<UserAuth />}>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="profile" element={<UserProfile />} />

              <Route path="mycourses" element={<UserMyCourses />} />
              {/* <Route path="mycanvas/:title/:courseId" element={<MyCourseCanvas />} /> */}
              <Route path="mycourses/:title/:courseId" element={<MyCourseLanding />} />

              <Route path="mylearning" element={<UserMyCourses />} />
              <Route path="myhistory" element={<UserHistory />} />
              <Route path="mycart" element={<AddToCart />} />
              <Route path="notifications" element={<UserNotifications />} />
            </Route>

            {/* Teacher authenticated routes */}
            <Route path="/teacher" element={<TeacherAuth />}>
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="profile" element={<TeacherProfile />} />
              <Route path="myhistory" element={<TeacherHistory />} />
              <Route path="my-tasks" element={<TeacherTasks />} />
              <Route path="notification-management" element={<TeacherNotifications />} />
              <Route path="course-management" element={<TeacherCourseManagement />} />
              <Route path="course-management/create-course" element={<CreateCourseTeacher />} />
              <Route path="course-management/view-all-course" element={<ViewAllCourseTeacher />} />
              <Route path="course-management/upload-video" element={<UploadVideo />} />
              <Route path="course-management/course-settings" element={<CourseSettings />} />
              <Route path="course-management/edit-course" element={<EditCourse />} />
              <Route path="course-management/create-modules" element={<CreateModule />} />
              <Route path="blog-management" element={<TeacherBlogManagement />} />
              <Route path="blog-management/upload-resources" element={<TeacherUploadResource />} />
              <Route path="blog-management/create-blog" element={<TeacherCreateBlog />} />
              <Route path="blog-management/view-all-blogs" element={<ViewAllBlogs />} />
              <Route path="blog-management/blog-settings" element={<BlogSettings />} />
            </Route>

            {/* Admin authenticated routes */}
            <Route path="/admin" element={<AdminAuth />}>
              <Route path="home" element={<AdminHome />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="to-do-list" element={<AdminTodolist />} />
              <Route path="upload-video" element={<AdminUploadVideo />} />
              <Route path="course-management" element={<AdminCourseManager />} />
              <Route path="my-team" element={<MyTeam />} />
            </Route>

            {/* Page not found */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <OfflineComponent />
      )}
    </>
  );
};

export default App;
