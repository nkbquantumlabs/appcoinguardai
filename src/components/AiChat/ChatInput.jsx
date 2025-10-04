import React, { useState } from "react";
import { FiMic } from "react-icons/fi";
import { TbSend } from "react-icons/tb";

const ChatInput = ({ placeholder = "Search anything", onSend, onVoice }) => {
  const [value, setValue] = useState("");
  const [listening, setListening] = useState(false);
  const isEmpty = value.trim().length === 0;

  const handleSend = () => {
    const text = value.trim();
    if (!text) return;
    onSend?.(text);
    setValue("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      {/* Inline styles for mic animation */}
      <style>{`
        .mic {
          position: relative;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          border-radius: 9999px; /* fully rounded */
          overflow: visible; /* allow pseudo element to show */
        }
        .mic::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          background-color: #CCFF00be; /* pulse color as requested */
          z-index: 0; /* ensure visibility behind icon but above background */
          pointer-events: none;
          opacity: 0; /* hidden when not listening */
        }
        .mic.listening::before {
          opacity: 0.25;
          animation: listening 1.3s infinite;
        }
        @keyframes listening {
          from { opacity: 0.25; transform: scale(1); }
          to { opacity: 0; transform: scale(2); }
        }
      `}</style>
      <div className="flex items-center gap-4 w-full max-w-2xl">
        {/* Mic */}
        <button
          onClick={() => {
            setListening((prev) => !prev);
            onVoice?.();
          }}
          aria-pressed={listening}
          className={`mic flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 transition ${
            listening ? "listening hover:border-gray-500" : "hover:border-gray-500"
          }`}
          aria-label="Voice input"
        >
          <FiMic className="w-5 h-5 text-[#ccff00]" />
        </button>
        {/* Input */}
        <div className="flex-1 h-12 bg-[#2f2f2f] border border-gray-700 rounded-full flex items-center px-4">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-white placeholder:text-white/60"
          />
        </div>

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={isEmpty}
          aria-disabled={isEmpty}
          className={`flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 transition ${
            isEmpty
              ? "opacity-50 cursor-not-allowed hover:border-gray-700"
              : "hover:border-gray-500"
          }`}
          aria-label="Send"
        >
          <TbSend className="w-5 h-5 text-[#ccff00]" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
