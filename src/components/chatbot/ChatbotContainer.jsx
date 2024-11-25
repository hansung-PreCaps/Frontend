import React from "react";
import PropTypes from 'prop-types';
import ChatMessage from "./ChatMessage";

const ChatbotContainer = ({ messages }) => {
  return (
    <div className="chat-container">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message.text}
          isUser={message.isUser}
          timestamp={message.timestamp}
        />
      ))}
    </div>
  );
};

ChatbotContainer.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string.isRequired,
      isUser: PropTypes.bool.isRequired,
      timestamp: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ChatbotContainer;