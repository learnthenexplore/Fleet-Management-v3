// src/components/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredPermissions = [], allowedRoles = [] }) => {
  const user = useSelector((state) => state.user.user);

  if (!user) return <Navigate to="/login" />;

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.employeeType)) {
    return <div className="p-6">⛔ Access Denied (Role not allowed)</div>;
  }

  if (requiredPermissions.length > 0) {
    const hasPermission = requiredPermissions.some((p) => user.permissions.includes(p));
    if (!hasPermission) return <div className="p-6">⛔ Access Denied (Missing Permission)</div>;
  }

  return children;
};

export default ProtectedRoute;
