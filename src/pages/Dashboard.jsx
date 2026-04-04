import { useEffect, useState } from "react";
import { MainLayout } from "../components/Layout";
import { SkeletonLoader } from "../components/SkeletonLoader";
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
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-brand-navy mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
          <SkeletonLoader count={4} type="card" />
          <SkeletonLoader count={5} type="table" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardData.stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{stat.icon}</span>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp size={12} />
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-brand-navy mt-2">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-bold text-brand-navy">
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {dashboardData.recentActivity.map((activity) => {
              const statusColors = {
                success: "bg-green-50 border-l-4 border-green-500",
                warning: "bg-yellow-50 border-l-4 border-yellow-500",
                info: "bg-blue-50 border-l-4 border-blue-500",
              };

              return (
                <div
                  key={activity.id}
                  className={`px-6 py-4 hover:bg-gray-50 transition ${
                    statusColors[activity.status] || "bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-1">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.description}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
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
