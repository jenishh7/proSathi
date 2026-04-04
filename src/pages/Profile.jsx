import { useEffect, useState } from "react";
import { MainLayout } from "../components/Layout";
import { SkeletonLoader } from "../components/SkeletonLoader";
import profileData from "../data/profile.json";
import { Mail, Phone, MapPin, Globe, Edit2, Clock, Award } from "lucide-react";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="space-y-8">
          <h1 className="text-2xl font-bold text-brand-navy">Profile</h1>
          <SkeletonLoader count={3} type="card" />
        </div>
      </MainLayout>
    );
  }

  const profile = profileData.userProfile;

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-brand-orange to-yellow-500"></div>

          {/* Profile Info */}
          <div className="px-6 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
              {/* Avatar */}
              <div className="relative -mt-24">
                <div className="w-32 h-32 bg-brand-navy text-white rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white shadow-lg">
                  {profile.avatar}
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-brand-navy">
                  {profile.name}
                </h1>
                <p className="text-gray-600 mt-1">{profile.role}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {profile.department}
                </p>
              </div>

              <button className="px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-opacity-90 transition flex items-center gap-2">
                <Edit2 size={18} />
                Edit Profile
              </button>
            </div>

            {/* Bio */}
            <p className="text-gray-700 mb-6">{profile.bio}</p>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="text-brand-orange" size={20} />
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="font-medium text-gray-800">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-brand-orange" size={20} />
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="font-medium text-gray-800">{profile.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-brand-orange" size={20} />
                <div>
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="font-medium text-gray-800">
                    {profile.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="text-brand-orange" size={20} />
                <div>
                  <p className="text-xs text-gray-600">Website</p>
                  <p className="font-medium text-gray-800 truncate text-sm">
                    johndoe.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">
              Projects Completed
            </p>
            <p className="text-3xl font-bold text-brand-navy mt-2">
              {profile.stats.projectsCompleted}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Tasks Completed</p>
            <p className="text-3xl font-bold text-brand-navy mt-2">
              {profile.stats.tasksCompleted}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Team Size</p>
            <p className="text-3xl font-bold text-brand-navy mt-2">
              {profile.stats.teamSize}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">
              Performance Rating
            </p>
            <p className="text-3xl font-bold text-brand-navy mt-2">
              {profile.stats.performanceRating}/5
            </p>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-bold text-brand-navy">Activity Log</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {profileData.activityLog.map((activity) => (
              <div
                key={activity.id}
                className="px-6 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Clock className="text-gray-400 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.device}
                      </p>
                      <p className="text-xs text-gray-500">IP: {activity.ip}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 whitespace-nowrap">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
