import React, { useRef, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import '../App.css';

const Messages = ({ messages = [] }) => {
  const messagesEnd = useRef(null);

  const scrollToBottom = () => {
    if (!messagesEnd) {
      return;
    }
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(function() {
    scrollToBottom();
  });

  return (
    <div className="messageContainer">
        <Scrollbars className="scrollbars">
        {messages.map((message, i) => (
          <div key={i} className="eachMessage">
            <p className="name">{message.name}</p>
            <br />
            <p className="text">{message.text}</p>
          </div>
        ))}
        <div ref={messagesEnd} />
        </Scrollbars>
    </div>
  );
};

export default Messages;
