import { useState } from "react";
import Sidebar from "./Sidebar";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-9xl">Hello</h1>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
};

export default App;
