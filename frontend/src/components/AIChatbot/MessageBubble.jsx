// src/components/AIChatBot/MessageBubble.jsx
import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { UserContext } from '../../context/userContext'; // Adjust the path to your UserContext file if needed
import { TbRobot } from "react-icons/tb";

const aiAvatar = <TbRobot size={20} />;

const MessageBubble = ({ sender, text }) => {
  // Access the logged-in user from the context
  const { user } = useContext(UserContext);
  const isUser = sender === 'user';

  const bubbleStyles = isUser
    ? 'bg-primary text-white rounded-br-none'
    : 'bg-slate-200 text-gray-900 rounded-bl-none';

  const aiFormattingClasses = !isUser ? 'prose prose-sm prose-slate max-w-none' : '';

  const Avatar = () => {
    // Create a fallback initial from the user's full name
    const userInitial = user?.fullName?.[0]?.toUpperCase() || 'U';

    return (
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
        {isUser ? (
          // If the user has a profile image, display it
          user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="User"
              className="w-full h-full object-cover"
            />
          ) : (
            // Otherwise, display their initial as a fallback
            <div className="w-full h-full bg-primary text-white flex items-center justify-center font-bold text-sm">
              {userInitial}
            </div>
          )
        ) : (
          // AI Avatar
          <div className="w-full h-full bg-primary text-white flex items-center justify-center">
            {aiAvatar}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && <Avatar />}
      <div
        className={`max-w-[80%] sm:max-w-[65%] md:max-w-[55%] px-4 py-3 rounded-2xl shadow-sm ${bubbleStyles}`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap text-sm sm:text-base">{text}</div>
        ) : (
          <div className={aiFormattingClasses}>
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        )}
      </div>
      {isUser && <Avatar />}
    </div>
  );
};

export default MessageBubble;