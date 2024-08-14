import React from "react";
import DevMatrix_Logo from "../../Images/DevMatrix_Logo.png";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../Utils/Logout";

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
        navigate("/admin/my-team");
        break;

      case 5:
        navigate("/admin/course-management");
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
                My Team
              </li>
              <li
                className=" py-4 hover:bg-yellow-300 p-4 "
                onClick={() => navigateTo(5)}
              >
                Course Management
              </li>
              <li
                className=" py-4 hover:bg-yellow-300 p-4 "
                onClick={() => navigateTo(7)}
              >
              </li>
            </ul>
         
        </header>
      </navbar>
    </div>
  );
};

export const AdminDashboardTop = () => {
  const navigate = useNavigate();

  const handleLogout = () =>{
    navigate('/logout')
  }

  return (
    <div>
      <navbar>
        <header>
          <section className="bg-gradient-to-r from-yellow-200 to-yellow-400 w-full h-16">
          <div className="flex justify-content-between">


            <img src={DevMatrix_Logo} className="h-10 p-1" />
          <button type="button" className="px-2 m-4 rounded border-2 bg-white border-grey-800" onClick={handleLogout}>
          Log Out
          </button>
          </div>
          </section>
        </header>
      </navbar>
    </div>
  );
};

