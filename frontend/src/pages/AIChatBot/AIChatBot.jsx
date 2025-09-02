import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { TbRobot } from 'react-icons/tb'; // Icon for the AI avatar

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
  const navigate = useNavigate();

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
    // ... (your existing send message logic remains the same)
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    const userMessage = { sender: 'user', text: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const res = await axiosInstance.post(API_PATHS.EXPENSO_AI.CHAT, { query: trimmedInput });
      const botReply = res?.data?.reply || 'Sorry, I had trouble responding.';
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Something went wrong. Try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
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

        <main className="flex-1 flex flex-col bg-gray-50">
          {/* The Back button has been REMOVED from its old position */}
          
          <div className="w-full max-w-5xl mx-auto h-full flex flex-col border-x border-gray-200 bg-white shadow-sm">
            
            {/* --- NEW, INTERACTIVE HEADER --- */}
            <div className="flex items-center gap-3 p-3 border-b border-slate-200">
              <button
                onClick={handleBack}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                title="Go Back"
              >
                <IoMdArrowBack size={22} className="text-slate-600" />
              </button>

              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
                <TbRobot size={24} />
              </div>
              
              <div>
                <h1 className="text-base font-semibold text-slate-800">Expenso AI</h1>
                <div className="text-xs text-slate-500">
                  {loading ? (
                    <div className="flex items-center gap-1.5">
                      <span>Typing</span>
                      <span className="h-1 w-1 rounded-full bg-slate-400 animate-pulse [animation-delay:-0.3s]"></span>
                      <span className="h-1 w-1 rounded-full bg-slate-400 animate-pulse [animation-delay:-0.15s]"></span>
                      <span className="h-1 w-1 rounded-full bg-slate-400 animate-pulse"></span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span>Online</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

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