import { Bell } from "lucide-react";

export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">👋 Welcome, Dr. Smith</h1>
        <p className="text-gray-600 mt-1">
          Today is <span className="font-semibold">{today}</span>
        </p>
        <p className="text-sm text-gray-500">
          You have 3 recent patient record accesses
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Bell className="text-gray-600" />
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
}
