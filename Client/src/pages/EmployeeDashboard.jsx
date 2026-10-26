import React, { useState, useEffect } from "react";
import Announcements from "@/components/employee/Announcements";
import LeaveApply from "@/components/employee/LeaveApply";
import LeaveList from "@/components/employee/LeaveList";
import Attendance from "@/components/employee/Attendance";
import { getMyLeaves } from "@/api/api";
import DashboardLayout from "@/components/DashboardLayout";

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("announcements");
  const [leaves, setLeaves] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    window.location.href = "/login"; 
  };

  const fetchLeaves = async () => {
    try {
      const res = await getMyLeaves();
      setLeaves(res.data);
    } catch (err) {
      console.error("Failed to fetch leaves:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "leaves") {
      fetchLeaves();
    }
  }, [activeTab]);

  const handleLeaveApplied = () => {
    fetchLeaves();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "announcements":
        return <Announcements />;
      case "leaves":
        return (
          <div className="space-y-6">
            <LeaveApply onApplied={handleLeaveApplied} />
            <LeaveList leaves={leaves} />
          </div>
        );
      case "attendance":
        return <Attendance />;
      case "profile":
        return (
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-3">My Profile</h2>
            <div className="space-y-2 text-slate-300">
              <p><span className="text-slate-400">Name:</span> {user.name || "Not available"}</p>
              <p><span className="text-slate-400">Email:</span> {user.email || "Not available"}</p>
              <p><span className="text-slate-400">Role:</span> Employee</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      role="Employee"
      title="Welcome to your workspace"
      tabs={[
        { id: "announcements", label: "Announcements" },
        { id: "leaves", label: "Leave & time off" },
        { id: "attendance", label: "Attendance" },
        { id: "profile", label: "My profile" },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={handleLogout}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default EmployeeDashboard;