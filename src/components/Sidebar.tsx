import { LucideSidebarClose } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    // Sidebar Panel
    <aside
      className={`fixed inset-0 z-40 h-screen w-screen md:w-64 bg-slate-900 text-slate-100 shadow-2xl
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"}`}
    >
      {/* Items */}
      <div className="mt-16 p-4 h-[calc(100vh-4rem)] w-full select-none">
        <nav className="overflow-hidden">
          <ul className="flex flex-col gap-1">
            <li className="px-4 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors duration-150 text-lg font-medium">
              Tickets
            </li>
            <li className="px-4 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors duration-150 text-lg font-medium">
              Create Ticket
            </li>
            <li className="px-4 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors duration-150 text-lg font-medium truncate">
              KBAs (Documentation)
            </li>
          </ul>
        </nav>
      </div>

      {/* Close Button*/}
      <div>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-slate-200 ${!isOpen ? "opacity-0" : "opacity-100"} transition-opacity`}
        >
          <LucideSidebarClose />
        </button>
      </div>
    </aside>
  );
}
