import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = useSelector((s) => s.auth.token);
  return token ? children : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
