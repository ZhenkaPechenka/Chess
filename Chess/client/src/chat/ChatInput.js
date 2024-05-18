import React, { useState } from 'react';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, onEmojiClick }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
      <button type="button" onClick={onEmojiClick}> Emoji </button>
    </form>
  );
};

export default ChatInput;
