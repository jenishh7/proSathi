import { useEffect, useState } from "react";
import { MainLayout } from "../components/Layout";
import { SkeletonLoader } from "../components/SkeletonLoader";
import analyticsData from "../data/analytics.json";
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="space-y-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-brand-navy dark:text-white">
            Analytics
          </h1>
          <SkeletonLoader count={3} type="chart" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-navy dark:text-white mb-2">
            Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your performance and metrics in real-time.
          </p>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsData.topMetrics.map((metric) => (
            <div
              key={metric.id}
              className="card group hover:scale-105 transition-transform duration-200"
            >
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                {metric.name}
              </p>
              <p className="text-3xl font-bold text-brand-navy dark:text-white mt-2">
                {metric.value}
              </p>
              <p className="text-xs text-success-600 dark:text-success-400 mt-2 font-semibold">
                {metric.trend}
              </p>
            </div>
          ))}
        </div>

        {/* Chart 1: Overview (Line + Bar) */}
        <div className="card">
          <h2 className="text-lg font-bold text-brand-navy dark:text-white mb-6">
            Monthly Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.analyticsData.overview}>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-gray-300 dark:stroke-gray-600"
              />
              <XAxis
                dataKey="month"
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tw-colors-gray-800)",
                  border: "1px solid var(--tw-colors-gray-700)",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#ff9800"
                strokeWidth={2}
                dot={{ fill: "#ff9800", r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#1a237e"
                strokeWidth={2}
                dot={{ fill: "#1a237e", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: User Growth */}
        <div className="card">
          <h2 className="text-lg font-bold text-brand-navy dark:text-white mb-6">
            User Growth Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.analyticsData.userGrowth}>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-gray-300 dark:stroke-gray-600"
              />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="newUsers" fill="#dd7e3e" name="New Users" />
              <Bar dataKey="activeUsers" fill="#1a2a4f" name="Active Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: Conversion by Channel */}
        <div className="card">
          <h2 className="text-lg font-bold text-brand-navy dark:text-white mb-6">
            Conversion Metrics
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Channel
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Visits
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Conversions
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.analyticsData.conversionMetrics.map((metric) => {
                  const rate = (
                    (metric.conversions / metric.visits) *
                    100
                  ).toFixed(2);
                  return (
                    <tr
                      key={metric.channel}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">
                        {metric.channel}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {metric.visits.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {metric.conversions.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="badge badge-success">{rate}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics;
