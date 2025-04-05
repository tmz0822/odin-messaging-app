import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Navigate } from 'react-router';

const RedirectIfAuthenticated = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default RedirectIfAuthenticated;
