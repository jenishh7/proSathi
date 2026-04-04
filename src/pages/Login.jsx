import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { showToast } from "../components/ToastNotification";
import { getValidationError } from "../utils/validation";
import loginData from "../data/login.json";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border-t-4 border-brand-orange">
        {/* Header */}
        <div className="bg-brand-navy px-8 py-8 text-white">
          <h1 className="text-3xl font-bold mb-2">ProSathi</h1>
          <p className="text-gray-300">Professional Dashboard Login</p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {/* General Error Message */}
          {generalError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle
                className="text-red-600 mt-0.5 flex-shrink-0"
                size={20}
              />
              <div>
                <p className="font-semibold text-red-800">{generalError}</p>
              </div>
            </div>
          )}

          {/* Demo Credentials Info */}
          <div className="bg-brand-bg border border-brand-navy border-opacity-20 rounded-lg p-4 mb-6">
            <p className="text-xs font-bold text-brand-navy mb-2">
              Demo Credentials:
            </p>
            <p className="text-xs text-gray-700">📧 test@pro.com</p>
            <p className="text-xs text-gray-700">🔐 password123</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="your@email.com"
                className={`w-full px-4 py-3 border rounded-lg outline-none transition focus:ring-2 ${
                  touched.email && emailError
                    ? "border-red-400 focus:ring-red-200 bg-red-50"
                    : "border-gray-300 focus:ring-brand-orange focus:ring-opacity-50"
                }`}
              />
              {touched.email && emailError && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded flex items-start gap-2">
                  <AlertCircle
                    className="text-red-600 mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <p className="text-sm font-medium text-red-700">
                    {emailError}
                  </p>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur("password")}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 border rounded-lg outline-none transition focus:ring-2 ${
                    touched.password && passwordError
                      ? "border-red-400 focus:ring-red-200 bg-red-50"
                      : "border-gray-300 focus:ring-brand-orange focus:ring-opacity-50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {touched.password && passwordError && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded flex items-start gap-2">
                  <AlertCircle
                    className="text-red-600 mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <p className="text-sm font-medium text-red-700">
                    {passwordError}
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brand-orange to-yellow-500 text-white py-3 rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 mt-6 text-xs">
            Contact your administrator for access to the system
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
