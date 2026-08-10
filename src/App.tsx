import { useState } from "react";
import { LucideSidebarOpen } from "lucide-react";
import Sidebar from "./components/Sidebar";
import TicketTable from "./components/TicketTable";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-200">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-30 cursor-pointer text-gray-400 transition-colors hover:text-slate-900"
          aria-label="Open menu"
        >
          <LucideSidebarOpen />
        </button>
      )}

      <main
        className={`h-screen transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-full md:ml-64 md:w-[calc(100vw-16rem)]" : "ml-0 w-full"}
        `}
      >
        {/* Changed w-[96ch] to responsive max-w-[96ch] to prevent horizontal overflow on mobile */}
        <div className="mx-auto w-full max-w-[40ch] md:max-w-[96ch] px-4 md:px-0 h-[calc(100vh-2rem)] mt-12 md:mt-4">
          <TicketTable />
        </div>
      </main>
    </div>
  );
};

export default App;
