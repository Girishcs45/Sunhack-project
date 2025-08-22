import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import ShortcutCards from "../components/ShortcutCards";
import RecentActivity from "../components/RecentActivity";

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <DashboardHeader />
        <ShortcutCards />
        <RecentActivity />
      </main>
    </div>
  );
}
