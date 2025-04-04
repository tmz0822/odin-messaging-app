import { createBrowserRouter } from 'react-router';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Home from '../pages/Home';
import App from '../App';
import ProtectedRoute from './ProtectedRoute';
import UserProfile from '../pages/UserProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ':username',
        element: <UserProfile />,
      },
    ],
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
