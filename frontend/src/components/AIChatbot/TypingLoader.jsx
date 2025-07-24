// src/components/AIChatBot/TypingLoader.jsx
import React from 'react';

const TypingLoader = () => (
  <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
    </div>
    <span>Expenso AI is typing...</span>
  </div>
);

export default TypingLoader;
