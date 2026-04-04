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
        <div className="space-y-8">
          <h1 className="text-2xl font-bold text-brand-navy">Reports</h1>
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
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Reports</h1>
          <p className="text-gray-600">
            View and download your generated reports.
          </p>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Report
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Stats
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportsData.reports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {report.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {report.description}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {report.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{report.date}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          report.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-4 text-sm text-gray-600">
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
                      <button className="px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-opacity-90 transition text-sm font-medium flex items-center gap-2">
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
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-bold text-brand-navy">Recent Sales</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Client
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportsData.salesData.map((sale) => (
                  <tr
                    key={sale.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-6 font-medium text-gray-800">
                      {sale.client}
                    </td>
                    <td className="py-4 px-6 text-gray-600">{sale.product}</td>
                    <td className="py-4 px-6 font-semibold text-gray-800">
                      {sale.amount}
                    </td>
                    <td className="py-4 px-6 text-gray-600 flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      {sale.date}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          sale.status === "Closed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
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
