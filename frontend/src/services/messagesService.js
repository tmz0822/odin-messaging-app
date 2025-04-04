const API_URL = 'http://localhost:3000';

const fetchMessages = async (receiverId) => {
  const response = await fetch(`${API_URL}/messages/${receiverId}`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch messages');
  }

  return data.messages;
};

const sendMessage = async (receiverId, content) => {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ receiverId, content }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to send message');
    }

    return data.message;
  } catch (error) {
    console.error('Send message error:', error.message);
    throw error;
  }
};

export const messagesService = {
  fetchMessages,
  sendMessage,
};
