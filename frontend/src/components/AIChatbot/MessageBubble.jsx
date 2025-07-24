// src/components/AIChatBot/MessageBubble.jsx
import React from 'react';

const MessageBubble = ({ sender, text }) => {
  const isUser = sender === 'user';
  const bubbleStyles = isUser
    ? 'bg-primary text-white rounded-br-none'
    : 'bg-slate-200 text-gray-900 rounded-bl-none';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[90%] sm:max-w-[70%] md:max-w-[60%] px-4 py-3 text-sm sm:text-base rounded-2xl shadow-sm whitespace-pre-wrap ${bubbleStyles}`}
      >
        {text}
      </div>
    </div>
  );
};

export default MessageBubble;
