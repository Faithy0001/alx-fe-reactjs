import { Navigate } from 'react-router-dom';

const useAuth = () => {
  // Simulated authentication check
  const isAuthenticated = false; // Change to true to simulate login
  return isAuthenticated;
};

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return children;
}

export default ProtectedRoute;