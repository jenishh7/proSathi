import { useEffect, useState } from "react";
import { MainLayout } from "../components/Layout";
import { SkeletonLoader } from "../components/SkeletonLoader";
import reportsData from "../data/reports.json";
import { Download, Eye, Clock } from "lucide-react";

const Reports = () => {
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
            Reports
          </h1>
          <SkeletonLoader count={6} type="table" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-navy dark:text-white mb-2">
            Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and download your generated reports.
          </p>
        </div>

        {/* Reports Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    Report
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    Type
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    Stats
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportsData.reports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">
                          {report.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {report.description}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="badge badge-info">{report.type}</span>
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                      {report.date}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`badge ${
                          report.status === "Completed"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Eye size={16} className="text-blue-600" />{" "}
                          {report.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download size={16} className="text-green-600" />{" "}
                          {report.downloads}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button className="btn btn-primary text-sm flex items-center gap-2">
                        <Download size={16} />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales Data Table */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-lg font-bold text-brand-navy dark:text-white">
              Recent Sales
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    Client
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    Product
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    Amount
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportsData.salesData.map((sale) => (
                  <tr
                    key={sale.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <td className="py-4 px-6 font-medium text-gray-800 dark:text-gray-200">
                      {sale.client}
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                      {sale.product}
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-800 dark:text-gray-200">
                      {sale.amount}
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <Clock
                        size={16}
                        className="text-gray-400 dark:text-gray-500"
                      />
                      {sale.date}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`badge ${
                          sale.status === "Closed"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
