import { Navigate, Outlet } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = useSelector((state) => state.user.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (!allowedRoles.includes(decoded.role)) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
