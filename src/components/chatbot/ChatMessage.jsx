import React from "react";
import PropTypes from 'prop-types';
import "./ChatMessage.css";

const ChatMessage = ({ message, isUser, timestamp, imageUrl }) => {
  return (
    <div className="message-container">
      <div className={`message-content ${isUser ? 'user-message' : 'bot-message'}`}>
        {!isUser && <span className="message-time">{timestamp}</span>}
        <div className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
          {message}
          {imageUrl && <img src={imageUrl} alt="Generated" className="generated-image" />}
        </div>
        {isUser && <span className="message-time">{timestamp}</span>}
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired,
  timestamp: PropTypes.string.isRequired,
  imageUrl: PropTypes.string
};

export default ChatMessage;