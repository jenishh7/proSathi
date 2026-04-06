import { useState } from "react";
import { MainLayout } from "../components/Layout";
import settingsData from "../data/settings.json";
import { Save, Bell, Lock, Eye, Globe } from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState(settingsData.settingsData);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleSetting = (category, key) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [key]: !settings[category][key],
      },
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-navy dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account preferences and settings.
          </p>
        </div>

        {/* Account Settings */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center gap-2">
            <Lock className="text-brand-orange" size={20} />
            <h2 className="text-lg font-bold text-brand-navy dark:text-white">
              Account Settings
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.account.email}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={settings.account.phone}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.account.twoFactorAuth}
                  onChange={() => toggleSetting("account", "twoFactorAuth")}
                  className="w-4 h-4 rounded"
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Enable Two-Factor Authentication
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.account.activityLogging}
                  onChange={() => toggleSetting("account", "activityLogging")}
                  className="w-4 h-4 rounded"
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Activity Logging
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center gap-2">
            <Bell className="text-brand-orange" size={20} />
            <h2 className="text-lg font-bold text-brand-navy dark:text-white">
              Notification Settings
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => toggleSetting("notifications", key)}
                  className="w-4 h-4 rounded"
                />
                <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center gap-2">
            <Eye className="text-brand-orange" size={20} />
            <h2 className="text-lg font-bold text-brand-navy dark:text-white">
              Privacy Settings
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Visibility
              </label>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    privacy: {
                      ...settings.privacy,
                      profileVisibility: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option>public</option>
                <option>private</option>
                <option>friends-only</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.activityVisible}
                  onChange={() => toggleSetting("privacy", "activityVisible")}
                  className="w-4 h-4 rounded"
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Show Activity Status
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.allowMessages}
                  onChange={() => toggleSetting("privacy", "allowMessages")}
                  className="w-4 h-4 rounded"
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Allow Messages
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.dataCollection}
                  onChange={() => toggleSetting("privacy", "dataCollection")}
                  className="w-4 h-4 rounded"
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Allow Data Collection
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center gap-2">
            <Globe className="text-brand-orange" size={20} />
            <h2 className="text-lg font-bold text-brand-navy dark:text-white">
              Appearance
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theme
                </label>
                <select
                  value={settings.appearance.theme}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      appearance: {
                        ...settings.appearance,
                        theme: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option>light</option>
                  <option>dark</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={settings.appearance.language}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      appearance: {
                        ...settings.appearance,
                        language: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timezone
                </label>
                <select
                  value={settings.appearance.timezone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      appearance: {
                        ...settings.appearance,
                        timezone: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option>UTC-5</option>
                  <option>UTC-6</option>
                  <option>UTC-7</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition ${
              saved
                ? "bg-green-500 text-white"
                : "bg-brand-orange text-white hover:bg-opacity-90"
            }`}
          >
            <Save size={20} />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
