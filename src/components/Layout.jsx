import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthButton } from "./AuthButton";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { SearchModal } from "./SearchModal";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  User,
  Settings,
  HelpCircle,
  Bell,
  Menu,
  X,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";

/**
 * Sidebar Navigation Component
 */
export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: HelpCircle, label: "Help & Support", path: "/help" },
  ];

  const isActive = (path) => location.pathname === path;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 lg:hidden p-2 bg-white dark:bg-gray-800 text-brand-navy dark:text-gray-200 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-900 text-brand-navy dark:text-gray-200 transition-transform duration-300 z-30 lg:translate-x-0 border-r border-gray-200 dark:border-gray-700 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-brand-navy dark:text-white">
            ProSathi
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Professional Dashboard
          </p>
        </div>

        {/* Search */}
        <div className="p-4">
          <div
            className="relative cursor-pointer"
            onClick={() => setSearchModalOpen(true)}
          >
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Search... (Ctrl+K)"
              className="input pl-10 text-sm cursor-pointer"
              readOnly
            />
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-brand-orange-500 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Theme
            </span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
};

/**
 * Top Navigation Bar
 */
export const TopNav = () => {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white dark:bg-gray-900 shadow-sm z-20 w-full lg:w-auto border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center gap-2 px-3 sm:px-4 lg:px-8 py-3 lg:py-4">
        <div className="lg:hidden w-8"></div>
        <h1 className="text-lg lg:text-xl font-bold text-brand-navy dark:text-white hidden lg:block flex-1">
          Dashboard
        </h1>
        <div className="flex items-center gap-3">
          <AuthButton />
        </div>
      </div>
    </header>
  );
};

/**
 * Main Layout Wrapper
 */
export const MainLayout = ({ children }) => {
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <MobileNav />
      <div className="flex flex-col h-full lg:ml-64">
        <TopNav />
        <main className="flex-1 overflow-auto pt-16 pb-16 lg:pb-0 w-full">
          <div className="p-3 sm:p-4 lg:p-6 max-w-full mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
