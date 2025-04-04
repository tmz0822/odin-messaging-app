const API_URL = 'http://localhost:3000';

export const fetchUser = async () => {
  const response = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user');
  }

  return data;
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch users');
  }

  return data.users;
};

export const userService = {
  fetchUser,
  fetchUsers,
};
