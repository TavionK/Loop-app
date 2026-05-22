import { SquareCheck, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="flex items-center gap-2 text-lg">
          <SquareCheck
            aria-hidden="true"
            className="text-purple-600 size-5"
            strokeWidth={2.5}
          />
          <span className="text-purple-600">Loop</span>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/settings"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300 ease-in-out"
        >
          <Settings size={16} />
          <span className="hidden sm:inline">Settings</span>
        </Link>
        <button
          onClick={onLogout}
          className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-red-50 transition-colors duration-300 ease-in-out"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
}
