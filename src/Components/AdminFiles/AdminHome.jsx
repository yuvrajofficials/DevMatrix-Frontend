import React from "react";
import { AdminDashboardSide, AdminDashboardTop } from "./AdminDashboardComponent";
import Headers from "../Utils/Header";

const AdminHome = () => {
  return (
    <>
      <div className="m-0">

        <Headers />
      </div>
      <AdminDashboardTop />
      <div className="flex">
        <section className=".bg-black-800 w-48 border-2 border-grey-500 h-screen">
          <AdminDashboardSide />
        </section>
        <div className="main-admin-component">
          <iframe
            width="800"
            height="600"
            src="https://www.figma.com/proto/PMsHC6Q1nKpoH3zvWc99q4/Untitled?t=TiJBSN2NN4QmwOLY-1"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
