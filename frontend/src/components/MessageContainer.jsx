import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import { messagesService } from '../services/messagesService';

import '../styles/MessageContainer.css';
import MessageItem from './MessageItem';

const MessageContainer = ({ messages, handleSendMessage }) => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (message.trim() === '') return;

    handleSendMessage(message);
    setMessage('');
  };

  if (!messages) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="message">
      <h2>Messages</h2>
      <ul className="message-list">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </ul>

      <form className="message-input" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessageContainer;
