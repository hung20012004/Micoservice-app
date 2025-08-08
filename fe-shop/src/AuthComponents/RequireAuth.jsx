import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  const checkTokenValidity = () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      
      if (!token) return false;
      
      const decoded = jwtDecode(token);
      
      // Kiểm tra token còn hạn không
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
      
    } catch (error) {
      console.error("Token validation error:", error);
      // Xóa token không hợp lệ
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      return false;
    }
  };

  const isAuthenticated = checkTokenValidity();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default RequireAuth;