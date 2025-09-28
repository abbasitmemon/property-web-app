import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);

  if (token && user?.type === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default GuestRoute;
