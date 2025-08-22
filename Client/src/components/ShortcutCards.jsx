import { QrCode, FileText, Settings } from "lucide-react";

export default function ShortcutCards() {
  const cards = [
    { title: "Scan QR Code", icon: QrCode },
    { title: "My Access Logs", icon: FileText },
    { title: "Settings", icon: Settings },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-10">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center justify-center gap-3 cursor-pointer"
          >
            <Icon className="w-8 h-8 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-700">{card.title}</h3>
          </div>
        );
      })}
    </div>
  );
}
