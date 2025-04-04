import { useContext, useState } from 'react';
import MessageContainer from '../components/MessageContainer';
import { AuthContext } from '../contexts/authContext';
import { messagesService } from '../services/messagesService';
import UserList from '../components/UserList';

const Home = () => {
  const { user } = useContext(AuthContext);
  const { messages, setMessages } = useState([]);

  const handleFetchMessages = async (receiverId) => {
    try {
      const fetchedMessages = await messagesService.fetchMessages(receiverId);

      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <>
      <h1>Home</h1>
      <MessageContainer
        handleFetchMessages={handleFetchMessages}
        messages={messages}
      />

      <UserList />
    </>
  );
};

export default Home;
