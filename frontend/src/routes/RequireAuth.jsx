import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Navigate } from 'react-router';

const RequireAuth = ({ children, redirectTo }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
