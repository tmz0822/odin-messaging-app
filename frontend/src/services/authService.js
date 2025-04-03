const API_URL = 'http://localhost:3000/auth';

export const signup = async (userData) => {
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
