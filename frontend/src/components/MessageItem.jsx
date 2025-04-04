import { API_URL } from '../config/api';
import '../styles/MessageItem.css';
import { format } from 'date-fns';

const MessageItem = ({ message }) => {
  return (
    <li className="message-item">
      <div className="message-item__avatar">
        <img
          src={`${API_URL}${message.sender.avatar}`}
          alt={`${message.sender.username}'s avatar`}
        />
      </div>

      <div className="message-item__content">
        <div className="message-item__header">
          <span className="message-item__username">
            <strong>{message.sender.username}</strong>
          </span>
          <span className="message-item__timestamp">
            {format(new Date(message.createdAt), 'dd-MMM-yy h:mm a')}
          </span>
        </div>

        <div className="message-item__body">
          <p className="message-item__text">{message.content}</p>
        </div>
      </div>
    </li>
  );
};

export default MessageItem;
