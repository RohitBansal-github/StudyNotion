import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";

function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-richblack-900 text-richblack-200">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-richblack-900 text-white">

      {/* ✅ Desktop Sidebar Only */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* ✅ Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-11/12 max-w-[1200px] py-8 sm:py-10">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
