import { createBrowserRouter } from 'react-router';
import Signup from '../pages/Signup';
import Login from '../pages/Login';

const routes = [
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];

const router = createBrowserRouter(routes);

export default router;
