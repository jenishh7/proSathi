import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthButton } from "./AuthButton";
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
} from "lucide-react";
import { useState } from "react";

/**
 * Sidebar Navigation Component
 */
export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 lg:hidden p-2 bg-white text-brand-navy rounded-lg shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-brand-bg text-brand-navy transition-transform duration-300 z-30 lg:translate-x-0 border-r border-gray-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-[0.89rem] border-b border-gray-200">
          <h1 className="text-2xl font-bold text-brand-navy">ProSathi</h1>
          <p className="text-xs text-gray-500 mt-1">Professional Dashboard</p>
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  active
                    ? "bg-brand-orange text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

/**
 * Top Navigation Bar
 */
export const TopNav = () => {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white shadow-sm z-20 w-full lg:w-auto">
      <div className="flex justify-between items-center gap-2 px-3 sm:px-4 lg:px-8 py-3 lg:py-4">
        <div className="lg:hidden w-8"></div>
        <h1 className="text-lg lg:text-xl font-bold text-brand-navy hidden lg:block flex-1">
          Dashboard
        </h1>
        <AuthButton />
      </div>
    </header>
  );
};

/**
 * Main Layout Wrapper
 */
export const MainLayout = ({ children }) => {
  return (
    <div className="h-screen bg-brand-bg">
      <Sidebar />
      <div className="flex flex-col h-full lg:ml-64">
        <TopNav />
        <main className="flex-1 overflow-auto pt-16 w-full">
          <div className="p-3 sm:p-4 lg:p-6 max-w-full mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
