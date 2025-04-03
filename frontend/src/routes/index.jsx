import { createBrowserRouter } from 'react-router';
import Signup from '../pages/Signup';
import Login from '../pages/Login';

const router = createBrowserRouter([
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
