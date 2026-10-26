import AnnouncementsManager from "@/components/hr/AnnouncementsManager";
import AttendanceSummary from "@/components/hr/AttendanceSummary";
import EmployeeCRUD from "@/components/hr/EmployeeCRUD";
import LeaveApplications from "@/components/hr/LeaveApplications";
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";


const HrDashboard = () => {
  const [activeTab, setActiveTab] = useState("leaves");

  const renderContent = () => {
    switch (activeTab) {
      case "leaves":
        return <LeaveApplications />;
      case "employees":
        return <EmployeeCRUD />;
      case "announcements":
        return <AnnouncementsManager />;
      case "attendance":
        return <AttendanceSummary />;
      default:
        return null;
    }
  };

   const handleLogout = () => {
    localStorage.removeItem("token"); 
    window.location.href = "/login"; 
  };

  return (
    <DashboardLayout
      role="People team"
      title="People operations"
      tabs={[
        { id: "leaves", label: "Leave applications" },
        { id: "employees", label: "Team directory" },
        { id: "announcements", label: "Announcements" },
        { id: "attendance", label: "Attendance" },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={handleLogout}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default HrDashboard;
