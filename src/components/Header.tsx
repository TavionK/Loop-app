import { SquareCheck, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  remainingCount: number;
  displayName: string | null;
  onLogout: () => void;
}

export default function Header({ remainingCount, displayName, onLogout }: HeaderProps) {
  return (
    <header className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-1.5">
          <SquareCheck
            aria-hidden="true"
            className="text-purple-600 size-4"
            strokeWidth={2.5}
          />
          <span className="text-purple-600 text-xs font-semibold uppercase tracking-wider">
            Loop
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/settings"
            aria-label="Settings"
            className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 transition-colors duration-200"
          >
            <Settings size={14} />
            <span className="hidden sm:inline">Settings</span>
          </Link>
          <button
            onClick={onLogout}
            aria-label="Logout"
            className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 transition-colors duration-200 cursor-pointer"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {displayName && (
        <p className="text-sm text-gray-400 mb-1">Welcome back, {displayName}!</p>
      )}
      <h1 className="text-5xl font-light tracking-tight text-gray-900 leading-tight">
        Today,{" "}
        <span className="font-semibold">{remainingCount}</span>
        <br />
        <span className="text-gray-400">to go.</span>
      </h1>
    </header>
  );
}
