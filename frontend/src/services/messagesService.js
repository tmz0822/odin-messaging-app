const API_URL = 'http://localhost:3000';

const fetchMessages = async (receiverId) => {
  const response = await fetch(`${API_URL}/messages/${receiverId}`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  console.log(data);
};

export const messagesService = {
  fetchMessages,
};
