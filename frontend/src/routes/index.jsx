import { createBrowserRouter } from 'react-router';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Home from '../pages/Home';
import App from '../App';
import RequireAuth from './RequireAuth';
import RedirectIfAuthenticated from './RedirectIfAuthenticated';
import UserProfile from '../pages/UserProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth redirectTo="/login">
        <App />
      </RequireAuth>
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
    element: (
      <RedirectIfAuthenticated>
        <Signup />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: '/login',
    element: (
      <RedirectIfAuthenticated>
        <Login />
      </RedirectIfAuthenticated>
    ),
  },
]);

export default router;
