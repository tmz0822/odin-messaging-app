import { useContext, useEffect, useState } from 'react';
import { userService } from '../services/userService';

import '../styles/UserList.css';
import { AuthContext } from '../contexts/authContext';
import { API_URL } from '../config/api';

const UserList = ({ onSelectUser }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await userService.fetchUsers();

        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    onSelectUser(userId);
  };

  return (
    <div className="user-list">
      <h3 className="user-list__title">Users</h3>

      <ul className="user-list__items">
        {users.map(
          (user) =>
            currentUser.id !== user.id && (
              <li
                key={user.id}
                className={`user-list__item 
              ${selectedUserId === user.id && 'user-list__item--active'}`}
                onClick={() => handleUserClick(user.id)}
              >
                <img
                  src={`${API_URL}${user.avatar}`}
                  alt={`${user.username}'s avatar`}
                  className="user-list__avatar"
                />
                <strong className="user-list__username">{user.username}</strong>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default UserList;
