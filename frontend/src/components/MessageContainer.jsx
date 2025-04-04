const MessageContainer = ({ handleFetchMessages, messages }) => {
  if (!messages) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="message-container">
      <h1>You are chatting with ...</h1>
      <h2>Messages</h2>

      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>
              {message.senderId === message.receiverId ? 'You' : 'Other'}:
            </strong>
            {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageContainer;
