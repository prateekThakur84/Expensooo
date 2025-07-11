import React, { useState } from "react";
import { LuImage, LuX } from "react-icons/lu";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 mb-6 w-full">
      <div
        className="flex items-center gap-3 cursor-pointer hover:bg-purple-100 transition-colors p-2 rounded-md w-fit"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg shadow-sm">
          {icon ? (
            <img src={icon} alt="Icon" className="w-12 h-12 object-cover rounded-lg" />
          ) : (
            <LuImage className="text-purple-600" />
          )}
        </div>
        <p className="font-medium text-sm text-gray-800">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {isOpen && (
        <div className="relative w-full sm:w-auto max-w-full sm:max-w-sm border border-gray-200 rounded-lg shadow-lg z-30">
          <button
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-full absolute -top-3 -right-3 shadow-sm hover:bg-gray-100 transition z-40"
            onClick={() => setIsOpen(false)}
          >
            <LuX className="text-gray-500" />
          </button>

          <div className="rounded-lg overflow-hidden max-h-[400px] overflow-y-auto">
            <EmojiPicker
              onEmojiClick={(emoji) => {
                onSelect(emoji.imageUrl || emoji.emoji || "");
                setIsOpen(false);
              }}
              theme="light"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
