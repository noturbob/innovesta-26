import { LucideIcon } from "lucide-react";

// Simple Helper Component for the Info Grid
export default function InfoCard({icon: Icon, label, value}: { icon: LucideIcon, label: string, value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-2.5 sm:p-4 rounded-lg sm:rounded-xl flex flex-col items-center text-center hover:bg-white/10 transition-colors">
      <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-pink-400 mb-1 sm:mb-2" />
      <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
      <span className="font-bold text-white text-sm sm:text-base">{value}</span>
    </div>
  );
}