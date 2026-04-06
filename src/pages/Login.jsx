import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { showToast } from "../components/ToastNotification";
import { getValidationError } from "../utils/validation";
import loginData from "../data/login.json";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  // Get validation errors
  const emailError = getValidationError("email", email);
  const passwordError = getValidationError("password", password);

  // Handle blur to mark field as touched
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setGeneralError("");

    // Mark all fields as touched
    setTouched({ email: true, password: true });

    // Check for validation errors
    if (emailError || passwordError) {
      setGeneralError("Please fix the errors before submitting");
      showToast.error("Please fix the errors before submitting");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = loginData.validUsers.find(
        (u) => u.email === email && u.password === password,
      );

      if (user) {
        login(user);
        showToast.success(`Welcome ${user.name}!`);
        navigate("/dashboard");
      } else {
        setGeneralError("Invalid email or password");
        showToast.error(
          "Invalid email or password. Try: test@pro.com / password123",
        );
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-bg to-brand-navy-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-navy-600 to-brand-navy/90 px-8 py-10 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/10 to-transparent"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2 tracking-tight">ProSathi</h1>
            <p className="text-gray-200 text-sm">
              Professional Dashboard Login
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 space-y-6">
          {/* General Error Message */}
          {generalError && (
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                {generalError}
              </p>
            </div>
          )}

          {/* Demo Credentials Info */}
          <div className="bg-gradient-to-r from-brand-orange-50 to-brand-orange-100 dark:from-gray-800 dark:to-gray-700 border border-brand-orange-200 dark:border-gray-600 rounded-xl p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Demo Credentials:
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              📧 test@pro.com
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              🔐 password123
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="your@email.com"
                className={`w-full px-4 py-3 border rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                  touched.email && emailError
                    ? "border-red-300 focus:ring-red-200 bg-red-50/50 dark:bg-red-900/20 dark:border-red-600"
                    : "border-gray-200 dark:border-gray-600 focus:ring-brand-orange/50 focus:border-brand-orange bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                }`}
              />
              {touched.email && emailError && (
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                  {emailError}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur("password")}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-12 border rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                    touched.password && passwordError
                      ? "border-red-300 focus:ring-red-200 bg-red-50/50 dark:bg-red-900/20 dark:border-red-600"
                      : "border-gray-200 dark:border-gray-600 focus:ring-brand-orange/50 focus:border-brand-orange bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {touched.password && passwordError && (
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brand-orange-600 to-brand-orange/90 hover:from-brand-orange/90 hover:to-brand-orange-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-brand-orange/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <div className="w-0 group-hover:w-4 transition-all duration-200 overflow-hidden">
                    →
                  </div>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 dark:text-gray-400 mt-8 text-sm">
            Contact your administrator for access to the system
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
