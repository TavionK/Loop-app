import { SquareCheck, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  completeTaskCount: number;
  onLogout: () => void;
}

export default function Header({ completeTaskCount, onLogout }: HeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1>
          Simple{" "}
          <span className="inline">
            <SquareCheck
              aria-hidden="true"
              className="text-purple-600 inline size-7 -translate-y-1"
              strokeWidth={2.5}
            />
          </span>
          <br />
          TODO List
        </h1>

        <p aria-live="polite" className="text-gray-500 text-xs mt-2 uppercase">
          {completeTaskCount} tasks remaining
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/settings"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300 ease-in-out"
        >
          <Settings size={16} />
          Settings
        </Link>
        <button
          onClick={onLogout}
          className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-red-50 transition-colors duration-300 ease-in-out"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}
