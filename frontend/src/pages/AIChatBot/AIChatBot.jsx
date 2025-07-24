// src/pages/AIChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

import Navbar from '../../components/layouts/Navbar';
import SideMenu from '../../components/layouts/SideMenu';

import MessageBubble from '../../components/AIChatbot/MessageBubble';
import TypingLoader from '../../components/AIChatbot/TypingLoader';
import ChatInput from '../../components/AIChatbot/ChatInput';

const AIChatBot = () => {
  const location = useLocation();
  const showSidebar = location.pathname === '/ai';

  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I’m Expenso AI. Ask me anything about expense management.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage = { sender: 'user', text: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axiosInstance.post(API_PATHS.EXPENSO_AI.CHAT, {
        query: trimmedInput,
      });

      const botReply = res?.data?.reply || 'Sorry, I had trouble responding.';
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Something went wrong. Try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <aside className="hidden md:block w-64 bg-white border-r border-gray-200">
            <SideMenu />
          </aside>
        )}

        <main className=" mt-2 flex-1 flex flex-col bg-gray-50">
          <div className="w-full max-w-5xl mx-auto h-full flex flex-col border-x border-gray-200 bg-white shadow-sm">
           
            <div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50">
              {messages.map((msg, idx) => (
                <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
              ))}
              {loading && <TypingLoader />}
              <div ref={bottomRef} />
            </div>

            
            <ChatInput input={input} setInput={setInput} onSend={handleSendMessage} loading={loading} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIChatBot;
