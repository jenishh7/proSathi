import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, BarChart3, FileText, User, Bell } from "lucide-react";

/**
 * Mobile Bottom Navigation Component
 */
export const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 lg:hidden z-50">
      <div className="flex justify-around items-center py-2 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                active
                  ? "text-brand-orange-600 bg-brand-orange-50 dark:bg-brand-orange-900/20"
                  : "text-gray-600 dark:text-gray-400 hover:text-brand-navy-600 dark:hover:text-brand-navy-400"
              }`}
              aria-label={item.label}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
