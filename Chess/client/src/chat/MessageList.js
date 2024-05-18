// In MessageList.js
import React from 'react';
import TimeAgo from 'react-timeago';

const MessageList = ({ messages }) => (
  <div className="message-list">
    {messages.map((message, index) => (
      <div key={index} className="message">
        <span className="sender">{message.sender}: </span>
        <span className="content">{message.content}</span>
        <span className="timestamp"><TimeAgo date={message.timestamp} /></span>
      </div>
    ))}
  </div>
);

export default MessageList;
