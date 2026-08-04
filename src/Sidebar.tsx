import React, { useState, useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  // 1. Mount during render: If prop says open but it's not in DOM, queue mount.
  if (isOpen && !isMounted) {
    setIsMounted(true);
  }

  // 2. Un-animate during render: If prop says closed but it's still animating, trigger exit.
  if (!isOpen && isAnimating) {
    setIsAnimating(false);
  }

  // 3. Effect is purely for the asynchronous entrance delay.
  // No synchronous state updates exist in this block anymore.
  useEffect(() => {
    if (isOpen && isMounted && !isAnimating) {
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMounted, isAnimating]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsMounted(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Sidebar Panel */}
      <div
        className={`z-10 w-full md:w-64 h-full bg-slate-900 text-white shadow-2xl transition-transform duration-300 ease-in-out will-change-transform ${
          isAnimating ? "translate-x-0" : "-translate-x-full"
        }`}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Menu</h2>

          <nav className="flex flex-col gap-4">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Dashboard
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Projects
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Settings
            </a>
          </nav>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
};

export default Sidebar;
