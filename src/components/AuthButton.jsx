import { useNavigate } from "react-router-dom";
import { LogOut, User, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { showToast } from "./ToastNotification";
import { useState } from "react";

/**
 * Login/Logout Button Component
 */
export const AuthButton = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    showToast.success("Logged out successfully!");
    navigate("/login");
  };

  if (!isAuthenticated) {
    return (
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="btn btn-primary"
      >
        Login
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
        aria-label="User menu"
      >
        <div className="w-8 h-8 bg-brand-navy-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <ChevronDown size={18} className="text-gray-600 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Logged in as
            </p>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {user?.name || "User"}
            </p>
          </div>

          <button
            onClick={() => {
              navigate("/profile");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm"
          >
            <User size={16} />
            Account Settings
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 text-sm border-t border-gray-200 dark:border-gray-700"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};
