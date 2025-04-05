import { useContext } from 'react';
import '../styles/Header.css';
import { AuthContext } from '../contexts/authContext';
import { Link } from 'react-router';
import { API_URL } from '../config/api';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <Link to="/">
        <div className="header-left">
          <h1>Messager</h1>
        </div>
      </Link>

      <div className="header-right">
        <Link to={`/${user.username}`}>
          <div className="header-right__user-profile">
            <img
              src={`${API_URL}${user.avatar}`}
              alt="User Avatar"
              className="header-right__user-avatar"
            />
            <span className="header-right__user-name">{user.username}</span>
          </div>
        </Link>

        <button className="header-right__logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
