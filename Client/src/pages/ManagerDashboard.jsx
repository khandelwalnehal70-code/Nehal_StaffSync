import React, { useState } from "react";
import LeaveApplications from "@/components/manager/LeaveApplications";
import TrainingManagement from "@/components/manager/TrainingManagement";
import DashboardLayout from "@/components/DashboardLayout";

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("leave");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <DashboardLayout
      role="Manager"
      title="Lead with clarity"
      tabs={[
        { id: "leave", label: "Leave applications" },
        { id: "training", label: "Learning & growth" },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={handleLogout}
    >
      {activeTab === "leave" ? <LeaveApplications /> : <TrainingManagement />}
    </DashboardLayout>
  );
};

export default ManagerDashboard;
