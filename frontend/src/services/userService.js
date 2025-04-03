const API_URL = 'http://localhost:3000';

export const getUser = async () => {
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

export const userService = {
  getUser,
};
