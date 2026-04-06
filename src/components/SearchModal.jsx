import { useState, useEffect } from "react";
import { Search, X, Command } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  // Mock search data - in a real app, this would come from an API
  const searchData = [
    { title: "Dashboard", path: "/dashboard", type: "page" },
    { title: "Analytics", path: "/analytics", type: "page" },
    { title: "Reports", path: "/reports", type: "page" },
    { title: "Notifications", path: "/notifications", type: "page" },
    { title: "Profile", path: "/profile", type: "page" },
    { title: "Settings", path: "/settings", type: "page" },
    { title: "Help & Support", path: "/help", type: "page" },
    { title: "User Management", path: "/settings", type: "feature" },
    { title: "Theme Settings", path: "/settings", type: "feature" },
    { title: "Account Settings", path: "/profile", type: "feature" },
  ];

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleSelect = (item) => {
    navigate(item.path);
    onClose();
    setQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-96 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search pages, features..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-left"
                >
                  <div className="w-8 h-8 bg-brand-orange-100 dark:bg-brand-orange-900/20 rounded flex items-center justify-center">
                    <Search size={16} className="text-brand-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {item.type}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No results found for "{query}"
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <Command size={48} className="mx-auto mb-4 opacity-50" />
              <p>Start typing to search...</p>
              <p className="text-sm mt-2">Press ESC to close</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
