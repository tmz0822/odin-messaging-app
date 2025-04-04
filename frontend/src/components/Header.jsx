import { useContext } from 'react';
import '../styles/Header.css';
import { AuthContext } from '../contexts/authContext';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-left">
        <h1>Messager</h1>
      </div>

      <div className="header-right">
        <div className="user-profile">
          <img src="" alt="User Avatar" className="user-avatar" />
          <span className="user-name">{user.username}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
