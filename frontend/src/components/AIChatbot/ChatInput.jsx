// src/components/AIChatBot/ChatInput.jsx
import React from 'react';
import { FiSend } from 'react-icons/fi';

const ChatInput = ({ input, setInput, onSend, loading }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSend();
  };

  return (
    <div className="px-4   py-3 border-t border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about expense management..."
          className="input-box flex-1"
        />
        <button
          onClick={onSend}
          disabled={loading}
          className="bg-primary rounded-full px-4 py-3 flex items-center justify-center"
          aria-label="Send Message"
        >
          <FiSend size={20} color="white" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
