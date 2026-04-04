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
        <div className="space-y-8">
          <h1 className="text-2xl font-bold text-brand-navy">Notifications</h1>
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
              <h1 className="text-3xl font-bold text-brand-navy mb-2">
                Notifications
              </h1>
              <p className="text-gray-600">
                You have{" "}
                <span className="font-bold text-brand-orange">
                  {unreadCount}
                </span>{" "}
                unread notifications
              </p>
            </div>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium">
              Mark All as Read
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-lg p-6 flex items-start justify-between transition ${
                notification.read
                  ? "bg-gray-50 border border-gray-200"
                  : "bg-white border-l-4 border-brand-orange shadow"
              }`}
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="inline-block w-2 h-2 bg-brand-orange rounded-full"></span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(notification.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg">No notifications yet</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Notifications;
