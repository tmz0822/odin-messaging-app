import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/styles/global.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.jsx';
import { AuthProvider } from './contexts/authContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AuthProvider>
  </StrictMode>
);

