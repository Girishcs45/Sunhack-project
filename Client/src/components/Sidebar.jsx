import { Home, FileText, Settings, LogOut } from "lucide-react";

const sidebarLinks = [
  { id: "home", name: "Home", icon: Home },
  { id: "reports", name: "Reports", icon: FileText },
  { id: "settings", name: "Settings", icon: Settings },
  { id: "logout", name: "Logout", icon: LogOut },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
      <div>
        <div className="p-6 text-2xl font-bold text-gray-800">
          Health<span className="text-green-600">Lock</span>
        </div>

        <nav className="mt-6 flex flex-col gap-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`flex items-center gap-3 px-6 py-3 text-left transition rounded-lg ${
                  activeTab === link.id
                    ? "bg-gray-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                {link.name}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
