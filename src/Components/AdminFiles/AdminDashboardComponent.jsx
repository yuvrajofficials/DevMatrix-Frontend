import React from "react";
import DevMatrix_Logo from "../../Images/DevMatrix_Logo.png";
import { useNavigate } from "react-router-dom";

export const AdminDashboardSide = (props) => {
  const navigate = useNavigate();

  const navigateTo = (routeNo) => {
    switch (routeNo) {
      case 1:
        navigate("/admin/home");
        break;
      case 2:
        navigate("/admin/dashboard");
        break;
      case 3:
        navigate("/admin/notifications");
        break;
      case 4:
        navigate("/admin/to-do-list");
        break;

      case 5:
        navigate("/admin/upload-video");
        break;

      case 6:
        navigate("/admin/create-course");
        break;

      default:
        navigate("/admin/to-do-list");
        break;
    }
  };

  return (
    <div>
      <navbar>
        <header>
        
     
            <ul>
              <li
                className=" py-4 hover:bg-yellow-300 p-4 "
                onClick={() => navigateTo(1)}
              >
                Home
              </li>
              <li
                className=" py-4 hover:bg-yellow-300 p-4 "
                onClick={() => navigateTo(2)}
              >
                Dashboard
              </li>
              <li
                className=" py-4 hover:bg-yellow-300 p-4 "
                onClick={() => navigateTo(3)}
              >
                Notifications
              </li>
              <li
                className=" py-4 hover:bg-yellow-300 p-4 "
                onClick={() => navigateTo(4)}
              >
                To do List
              </li>
              <li
                className=" py-4 hover:bg-yellow-300 p-4 "
                onClick={() => navigateTo(5)}
              >
                Upload Video
              </li>
              <li
                className=" py-4 hover:bg-yellow-300 p-4 "
                onClick={() => navigateTo(6)}
              >
                Create Course
              </li>
            </ul>
         
        </header>
      </navbar>
    </div>
  );
};

export const AdminDashboardTop = () => {

  return (
    <div>
      <navbar>
        <header>
          <section className="bg-yellow-400 w-full h-16">
            <img src={DevMatrix_Logo} className="h-10 p-1" />
          </section>
        
        </header>
      </navbar>
    </div>
  );
};

