import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../context/ThemeContext";

/**
 * Toast Notification Provider Component
 * Wrap your app with this component to enable toast notifications
 */
export const ToastProvider = ({ children }) => {
  const { theme } = useTheme();

  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        toastClassName={() =>
          "relative flex p-4 min-h-10 rounded-lg justify-between overflow-hidden cursor-pointer shadow-lg border border-gray-200 dark:border-gray-700"
        }
        bodyClassName={() => "text-sm font-medium"}
        progressClassName="fancy-progress-bar"
      />
    </>
  );
};

/**
 * Custom toast notifications
 */
export const showToast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  warning: (message) => toast.warning(message),
  info: (message) => toast.info(message),
};
