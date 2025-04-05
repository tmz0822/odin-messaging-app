const API_URL = 'http://localhost:3000/auth';

const signup = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to signup');
    }

    return data;
  } catch (error) {
    console.error('Signup error:', error.message);
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include', // Include cookies in the request
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to login');
    }

    return data;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};

const logout = async () => {
  try {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Failed to logout: ', error);
  }
};

export const authService = {
  login,
  signup,
  logout,
};
