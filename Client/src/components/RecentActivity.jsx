import { CheckCircle, XCircle } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    { name: "John Doe", record: "Blood Test", date: "21 Aug 2025", status: "Success" },
    { name: "Jane Smith", record: "X-Ray", date: "20 Aug 2025", status: "Denied" },
    { name: "David Lee", record: "MRI Scan", date: "19 Aug 2025", status: "Success" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="p-3 border">Patient</th>
            <th className="p-3 border">Record</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((item, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="p-3 border">{item.name}</td>
              <td className="p-3 border">{item.record}</td>
              <td className="p-3 border">{item.date}</td>
              <td className="p-3 border">
                {item.status === "Success" ? (
                  <span className="flex items-center gap-2 text-green-600 font-medium">
                    <CheckCircle size={18} /> Success
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-red-600 font-medium">
                    <XCircle size={18} /> Denied
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
