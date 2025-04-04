import { useContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router';
import { AuthContext } from './contexts/authContext';

function App() {
  return (
    <div>
      <Header />
      <main className="main-container">
        <Outlet />
      </main>
    </div>
  );
}

export default App;

