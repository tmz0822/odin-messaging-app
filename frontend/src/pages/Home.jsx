import { useContext, useState } from 'react';
import MessageContainer from '../components/MessageContainer';
import { AuthContext } from '../contexts/authContext';
import { messagesService } from '../services/messagesService';
import UserList from '../components/UserList';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState(null);

  const handleFetchMessages = async (userId) => {
    try {
      const fetchedMessages = await messagesService.fetchMessages(userId);

      setReceiverId(userId);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (message) => {
    if (!receiverId) return;

    const tempMessage = {
      id: Date.now(),
      senderId: user.id,
      receiverId,
      content: message,
      createdAt: new Date().toISOString(),
    };

    // Optimistically update the state
    setMessages((prevMessages) => [...prevMessages, tempMessage]);

    try {
      const sentMessage = await messagesService.sendMessage(
        receiverId,
        message
      );

      setMessages((prevMessages) =>
        prevMessages
          .filter((msg) => msg.id !== tempMessage.id)
          .concat(sentMessage)
      );
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove the temporary message if send fails
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== tempMessage.id)
      );
    }
  };

  return (
    <>
      {messages ? (
        <MessageContainer
          messages={messages}
          handleSendMessage={handleSendMessage}
        />
      ) : (
        <div>Loading messages...</div>
      )}
      <UserList onSelectUser={handleFetchMessages} />
    </>
  );
};

export default Home;
