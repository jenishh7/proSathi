import { useEffect, useState } from "react";
import { MainLayout } from "../components/Layout";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { Breadcrumb } from "../components/Breadcrumb";
import dashboardData from "../data/dashboard.json";
import { TrendingUp } from "lucide-react";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate 3 second loading
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="space-y-8 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-brand-navy dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Loading your dashboard...
            </p>
          </div>
          <SkeletonLoader count={4} type="card" />
          <SkeletonLoader count={5} type="table" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <Breadcrumb />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-navy dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's your overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardData.stats.map((stat) => (
            <div
              key={stat.id}
              className="card group hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl group-hover:animate-bounce-subtle">
                  {stat.icon}
                </span>
                <span className="badge badge-success flex items-center gap-1">
                  <TrendingUp size={12} />
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-brand-navy dark:text-white mt-2">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-lg font-bold text-brand-navy dark:text-white">
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {dashboardData.recentActivity.map((activity) => {
              const statusColors = {
                success:
                  "border-l-success-500 bg-success-50 dark:bg-success-900/20",
                warning:
                  "border-l-warning-500 bg-warning-50 dark:bg-warning-900/20",
                info: "border-l-info-500 bg-info-50 dark:bg-info-900/20",
              };

              return (
                <div
                  key={activity.id}
                  className={`px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 ${
                    statusColors[activity.status] || "bg-white dark:bg-gray-900"
                  } border-l-4`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.description}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
