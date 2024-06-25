import React from "react";
import { AdminDashboardSide, AdminDashboardTop } from "./AdminDashboardComponent";
import Headers from "../Utils/Header";

const AdminDashboard = () => {
  return (
    <>
    
      <AdminDashboardTop />
      <div className="flex">
        <section className=".bg-black-800 w-48 border-2 border-grey-500 h-screen">
          <AdminDashboardSide />
        </section>
        <div className="main-admin-component">

          <p>Yiu are under dashboard</p>
        </div>


      </div>
    </>
  );
};

export default AdminDashboard;
