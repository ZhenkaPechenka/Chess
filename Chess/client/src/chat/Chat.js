import React, { useState } from 'react';
import { Picker } from 'emoji-mart';
import TimeAgo from 'react-timeago';
import './Chat.css';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

const Chat = ({ messages, onSendMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji) => {
    onSendMessage(emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <div className="chat-container">
      <MessageList messages={messages} />
      <ChatInput onSendMessage={onSendMessage} onEmojiClick={toggleEmojiPicker} />
      {showEmojiPicker && (
        <Picker onSelect={handleEmojiSelect} title="Pick an emoji" emoji="point_up" />
      )}
    </div>
  );
};

export default Chat;
