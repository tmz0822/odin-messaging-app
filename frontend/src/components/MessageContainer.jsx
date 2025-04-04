import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import { messagesService } from '../services/messagesService';

import '../styles/MessageContainer.css';

const MessageContainer = ({ messages, handleSendMessage }) => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  if (!messages) {
    return <div>Loading messages...</div>;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (message.trim() === '') return;

    handleSendMessage(message);
    setMessage('');
  };

  return (
    <div className="message">
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.senderId === user.id ? 'You' : 'Other'}:</strong>
            {message.content}
          </li>
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
