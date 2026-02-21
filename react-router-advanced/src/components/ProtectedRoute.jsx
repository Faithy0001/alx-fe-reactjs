import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = true; // Change to true to simulate login
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return children;
}

export default ProtectedRoute;