import { useEffect, useState } from "react";
import { MainLayout } from "../components/Layout";
import { SkeletonLoader } from "../components/SkeletonLoader";
import notificationsData from "../data/notifications.json";
import { CheckCircle, AlertCircle, Info, Bell, Trash2 } from "lucide-react";

const Notifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(notificationsData.notifications);
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="space-y-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-brand-navy dark:text-white">
            Notifications
          </h1>
          <SkeletonLoader count={6} type="table" />
        </div>
      </MainLayout>
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type) => {
    const iconProps = { size: 20 };
    switch (type) {
      case "success":
        return <CheckCircle {...iconProps} className="text-green-600" />;
      case "warning":
        return <AlertCircle {...iconProps} className="text-yellow-600" />;
      case "info":
        return <Info {...iconProps} className="text-blue-600" />;
      default:
        return <Bell {...iconProps} className="text-gray-600" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-brand-navy dark:text-white mb-2">
                Notifications
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                You have{" "}
                <span className="font-bold text-brand-orange">
                  {unreadCount}
                </span>{" "}
                unread notifications
              </p>
            </div>
            <button className="btn btn-secondary">Mark All as Read</button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`card transition-all duration-200 ${
                notification.read
                  ? "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                  : "bg-white dark:bg-gray-800 border-l-4 border-brand-orange shadow-md"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">{getIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-800 dark:text-gray-200">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="inline-block w-2 h-2 bg-brand-orange rounded-full"></span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="btn btn-secondary text-sm"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell
              size={48}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
            />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No notifications yet
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Notifications;
