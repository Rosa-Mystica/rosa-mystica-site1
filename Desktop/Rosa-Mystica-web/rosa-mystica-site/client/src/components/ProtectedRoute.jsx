import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (adminOnly && decoded.role !== 'admin') {
      return <Navigate to="/" replace />;
    }
    return children;
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;
