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

const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch(`${API_URL}/users/avatar`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to upload avatar');
  }

  return data;
};

export const userService = {
  fetchUser,
  fetchUsers,
  uploadAvatar,
};
