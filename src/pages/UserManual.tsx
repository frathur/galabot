import { useState } from 'react';
import { 
  BookOpen, AlertTriangle, Settings, PenTool, ChevronRight, 
  Cpu, Layers, Sprout, ShieldAlert, Zap, Droplet, 
  Clock, RefreshCcw, Compass, Battery, Lightbulb, Anchor, Sliders, Info
} from 'lucide-react';

export default function UserManual() {
  const [activeTab, setActiveTab] = useState<'overview' | 'hardware' | 'filtration' | 'farmer'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'hardware', label: 'Hardware', icon: Cpu },
    { id: 'filtration', label: 'Filtration', icon: Layers },
    { id: 'farmer', label: 'Farmer Guide', icon: Sprout },
  ];

  const overviewSections = [
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

  const hardwareComponents = [
    { name: "Raspberry Pi Pico", desc: "Controls the wiper motors", icon: Cpu },
    { name: "Solar Charge Controller", desc: "Protects battery from over charging and prevents reserve current", icon: Zap },
    { name: "Wiper Motors", desc: "Powers 2 front wheels", icon: Sliders },
    { name: "DC Pump", desc: "Pumps liquid biochar onto contaminated land", icon: Droplet },
    { name: "DC Motor", desc: "Rotates biochar mixer", icon: RefreshCcw },
    { name: "Motor Driver", desc: "Controls the speed and direction of the DC motors", icon: Sliders },
    { name: "LED module", desc: "Provides visibility for the camera", icon: Lightbulb },
    { name: "MB102 Breadboard Power Module", desc: "Power supply module", icon: Battery },
    { name: "Lithium ion batteries", desc: "Stores electrical energy", icon: Battery },
    { name: "ESP 32-CAM", desc: "Supports WI-FI, Bluetooth and camera interface and display", icon: Cpu },
    { name: "Ultrasonic sensors", desc: "Detects obstacles in the bot's path", icon: Compass },
    { name: "Arduino Nano V3.0", desc: "Controls Ultrasonic sensor", icon: Cpu },
    { name: "Relay modules", desc: "Uses signals from Pico to control the wiper motors", icon: Sliders },
    { name: "LCD Display", desc: "Projects 'GalaBot Filtration System' on the bot", icon: Info },
    { name: "Two back wheels", desc: "Aid in the movement of the bot", icon: Sliders },
    { name: "One caster wheel", desc: "Aid in the movement of the bot", icon: Sliders },
    { name: "The Rake", desc: "Creates furrows in the land", icon: Anchor },
  ];

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto px-4 sm:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-brand-brown tracking-tight">Operator Manual</h1>
        <p className="text-gray-500 mt-1">Documentation, technical specifications, and farmer guides for GalaBot.</p>
      </div>

      {/* Modern Tabs Navigation */}
      <div className="flex space-x-2 bg-brand-white border border-gray-200 p-1 rounded-xl shadow-sm mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-brand-green text-white shadow-sm'
                : 'text-gray-500 hover:text-brand-green hover:bg-brand-light'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {overviewSections.map((section, idx) => (
              <div key={idx} className="bg-brand-white border border-gray-200 rounded-xl p-5 shadow-sm group hover:border-brand-green/30 transition-colors">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center text-brand-green group-hover:bg-brand-green/10 transition-colors shadow-inner">
                    <section.icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-brand-brown">{section.title}</h2>
                </div>
                <div className="pl-14 text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Hardware */}
        {activeTab === 'hardware' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hardwareComponents.map((comp, idx) => (
              <div key={idx} className="bg-brand-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-4 hover:border-brand-green/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center text-brand-green/80 flex-shrink-0 shadow-inner">
                  <comp.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-brown">{comp.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">{comp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Filtration */}
        {activeTab === 'filtration' && (
          <div className="space-y-6">
            <div className="bg-brand-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-brand-brown mb-4 flex items-center gap-2">
                <Droplet className="w-5 h-5 text-brand-green" />
                Hydraulic Components
              </h3>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 flex-shrink-0" />
                  <span><strong>Pump 1:</strong> Pumps the contaminated water into the filtration tube stack.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 flex-shrink-0" />
                  <span><strong>Pump 2:</strong> Pumps clean treated water into the community tank and nutrient mixer.</span>
                </li>
              </ul>
            </div>

            <div className="bg-brand-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-brand-brown mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-green" />
                Filtration media stack (4-Layers)
              </h3>
              
              <div className="space-y-3 max-w-md mx-auto">
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                  <span className="text-xs font-bold text-gray-500 tracking-wider">INPUT WATER</span>
                </div>

                {/* Layer 1 */}
                <div className="bg-amber-100/80 border border-amber-200 rounded-xl p-4 flex items-center justify-between shadow-sm relative overflow-hidden group">
                  <div>
                    <span className="text-xs font-bold text-amber-800 tracking-widest uppercase">Layer 1</span>
                    <h4 className="font-bold text-gray-800">Polypads</h4>
                  </div>
                  <span className="text-xs text-amber-900 bg-amber-200/50 px-2 py-1 rounded font-medium">Filters heavy sediments</span>
                </div>

                {/* Layer 2 */}
                <div className="bg-stone-800 border border-stone-900 rounded-xl p-4 flex items-center justify-between shadow-sm text-white group">
                  <div>
                    <span className="text-xs font-bold text-stone-400 tracking-widest uppercase">Layer 2</span>
                    <h4 className="font-bold">Biochar Filter</h4>
                  </div>
                  <span className="text-xs text-stone-200 bg-white/10 px-2 py-1 rounded font-medium">Absorbs harmful chemicals</span>
                </div>

                {/* Layer 3 */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between shadow-sm group">
                  <div>
                    <span className="text-xs font-bold text-yellow-700 tracking-widest uppercase">Layer 3</span>
                    <h4 className="font-bold text-gray-800">Fine Sand</h4>
                  </div>
                  <span className="text-xs text-yellow-800 bg-yellow-100 px-2 py-1 rounded font-medium">Additional sediment filtering</span>
                </div>

                {/* Layer 4 */}
                <div className="bg-slate-200 border border-slate-300 rounded-xl p-4 flex items-center justify-between shadow-sm group">
                  <div>
                    <span className="text-xs font-bold text-slate-600 tracking-widest uppercase">Layer 4</span>
                    <h4 className="font-bold text-gray-800">Gravels</h4>
                  </div>
                  <span className="text-xs text-slate-700 bg-slate-300/50 px-2 py-1 rounded font-medium">Stabilizes stack & fine filter</span>
                </div>

                <div className="bg-brand-light border-2 border-brand-green/30 rounded-xl p-4 text-center">
                  <span className="text-xs font-bold text-brand-green tracking-wider">TREATED OUTPUT WATER</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Farmer Guide */}
        {activeTab === 'farmer' && (
          <div className="space-y-6">
            <div className="bg-brand-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-brand-brown mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-green" />
                Soil Reclamation Phase 1
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-green font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-brand-brown">The Incubation Year</h4>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    Once the land has been fully saturated with the liquid biochar mix, the soil ecosystem must be left <strong>completely undisturbed for one Year</strong> to allow absorption and active nutrient recovery.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-brand-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-brand-brown mb-5 flex items-center gap-2">
                <RefreshCcw className="w-5 h-5 text-brand-green" />
                Phase 2: Season Land Rotation Plan
              </h3>
              
              <div className="relative pl-6 border-l border-dashed border-gray-200 space-y-5">
                {/* Step 2.1 */}
                <div className="relative">
                  <div className="absolute -left-[30px] w-[18px] h-[18px] rounded-full bg-brand-green border-4 border-white shadow" />
                  <h4 className="text-sm font-semibold text-brand-brown">Coordinate Grid Partition</h4>
                  <p className="text-xs text-gray-500">Divide target lands into parallel grid lots: Plot A and Plot B.</p>
                </div>

                {/* Step 2.2 */}
                <div className="relative">
                  <div className="absolute -left-[30px] w-[18px] h-[18px] rounded-full bg-gray-300 border-4 border-white shadow" />
                  <h4 className="text-sm font-semibold text-gray-700">First 6-Month Cycle (Season 1)</h4>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2 text-center">
                      <span className="text-[10px] font-bold text-emerald-800">PLOT A</span>
                      <p className="text-xs font-bold text-emerald-900">Food Crops</p>
                    </div>
                    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-2 text-center">
                      <span className="text-[10px] font-bold text-indigo-800">PLOT B</span>
                      <p className="text-xs font-bold text-indigo-900">Phytoremediation</p>
                    </div>
                  </div>
                </div>

                {/* Step 2.3 */}
                <div className="relative">
                  <div className="absolute -left-[30px] w-[18px] h-[18px] rounded-full bg-gray-300 border-4 border-white shadow" />
                  <h4 className="text-sm font-semibold text-gray-700">Next 6-Month Cycle (Season 2)</h4>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-2 text-center">
                      <span className="text-[10px] font-bold text-indigo-800">PLOT A</span>
                      <p className="text-xs font-bold text-indigo-900">Phytoremediation</p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2 text-center">
                      <span className="text-[10px] font-bold text-emerald-800">PLOT B</span>
                      <p className="text-xs font-bold text-emerald-900">Food Crops</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phytoremediation Alert */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3 border-b border-orange-100 pb-2">
                <ShieldAlert className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-bold text-orange-800">Phytoremediation Operations & Safety</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                Phytoremediation crops extract heavy metals permanently out of the soil via their roots, stems, and leaves.
              </p>
              <h4 className="text-xs font-bold text-orange-800 tracking-wider mb-2 uppercase">Critical Disposal Rules:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
                <li className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-orange-600" />
                  <span>Do NOT consume or feed to livestock.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-orange-600" />
                  <span>Collect all biomass promptly after harvest.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-orange-600" />
                  <span>Dispose via secure burial or controlled burning.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-orange-600" />
                  <span>Coordinate with authorities for handling.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 bg-brand-green/10 rounded-xl p-5 border border-brand-green/20 flex items-center justify-between">
        <div>
          <h3 className="text-brand-green font-bold mb-1">Need Technical Support?</h3>
          <p className="text-sm text-brand-brown/80 font-medium leading-tight">Contact the ecology team or run diagnostics suite.</p>
        </div>
        <button className="px-5 py-2 bg-brand-green text-white font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-green-700 transition-colors shadow-sm">
          Run Diagnostics
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

