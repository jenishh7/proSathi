import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Breadcrumb = () => {
  const location = useLocation();

  // Generate breadcrumbs from current path
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbs = [
    { label: "Home", path: "/", icon: Home },
    ...pathnames.map((name, index) => {
      const path = `/${pathnames.slice(0, index + 1).join("/")}`;
      const label = name.charAt(0).toUpperCase() + name.slice(1);
      return { label, path };
    }),
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6"
    >
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center">
          {index > 0 && <ChevronRight size={16} className="mx-2" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {crumb.icon && <crumb.icon size={16} className="inline mr-1" />}
              {crumb.label}
            </span>
          ) : (
            <Link
              to={crumb.path}
              className="hover:text-brand-orange-600 transition-colors duration-200 flex items-center"
            >
              {crumb.icon && <crumb.icon size={16} className="mr-1" />}
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};
