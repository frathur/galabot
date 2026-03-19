import { BookOpen, AlertTriangle, Settings, PenTool, ChevronRight } from 'lucide-react';

export default function UserManual() {
  const sections = [
    {
      title: "How Galabot Works",
      icon: BookOpen,
      content: "Galabot is an autonomous environmental robot designed to traverse polluted water bodies and filter the water using a specialized biochar filtration system. It uses an ESP32-CAM for navigation and obstacle avoidance, while streaming live data back to this dashboard."
    },
    {
      title: "Setup & Deployment",
      icon: Settings,
      content: "1. Ensure the power cell is fully charged (>80%).\n2. Verify biochar tank is filled.\n3. Turn on the main power switch on the robot chassis.\n4. Connect to the 'Galabot-Network' via WiFi.\n5. Wait for the 'System Online' indicator on the dashboard."
    },
    {
      title: "Safety Guidelines",
      icon: AlertTriangle,
      content: "• Do not deploy Galabot in rapid currents exceeding 2m/s.\n• Keep hands away from the propulsion system when active.\n• Always retrieve the robot if battery level drops below 15%."
    },
    {
      title: "Maintenance Guide",
      icon: PenTool,
      content: "• The biochar filter should be replaced or regenerated every 48 hours of active use.\n• Clean the optical lens of the ESP32-CAM before every deployment.\n• Validate waterproof seals on the electronics enclosure weekly."
    }
  ];

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-brown tracking-tight">Operator Manual</h1>
        <p className="text-gray-500 mt-1">Documentation, setup instructions, and safety protocols for Galabot.</p>
      </div>

      <div className="flex-1 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-brand-white border border-gray-200 rounded-2xl p-6 shadow-sm group hover:border-brand-green/30 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-brand-green group-hover:bg-brand-green/10 transition-colors shadow-inner">
                <section.icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-brand-brown">{section.title}</h2>
            </div>
            
            <div className="pl-16 text-gray-600 text-sm leading-relaxed whitespace-pre-line font-medium">
              {section.content}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-brand-green/10 rounded-2xl p-6 border border-brand-green/20 flex items-center justify-between">
        <div>
          <h3 className="text-brand-green font-bold mb-1">Need Technical Support?</h3>
          <p className="text-sm text-brand-brown/80 font-medium">Contact the ecology team or run the onboard diagnostic suite.</p>
        </div>
        <button className="px-5 py-2.5 bg-brand-green text-white font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-green-700 transition-colors shadow-sm">
          Run Diagnostics
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
