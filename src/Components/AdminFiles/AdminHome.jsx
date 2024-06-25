import React from "react";
import { AdminDashboardSide, AdminDashboardTop } from "./AdminDashboardComponent";
import Headers from "../Utils/Header";

const AdminHome = () => {
  return (
    <>
    <div className="m-0">

    <Headers/>
    </div>
      <AdminDashboardTop />
      <div className="flex">
        <section className=".bg-black-800 w-48 border-2 border-grey-500 h-screen">
          <AdminDashboardSide />
        </section>
        <div className="main-admin-component">

          <p>You are under home</p>
        </div>


      </div>
    </>
  );
};

export default AdminHome;
