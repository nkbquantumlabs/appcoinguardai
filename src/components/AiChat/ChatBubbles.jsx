import React, { useEffect, useRef } from "react";

const ChatBubbles = ({ history = [], loading = false }) => {
  const chatEndRef = useRef(null);
  const theme = {
    bubbleUser: "bg-[#CCFF00]/10 text-white border border-[#CCFF00]/20",
    bubbleAI: "bg-[#1a1a1a] text-white border border-white/10",
  };

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, history[0]?.ai]);

  // Function to parse markdown bold (**text**) and italic (*text*)
  const parseMarkdown = (text) => {
    if (!text) return text;
    
    const parts = [];
    let lastIndex = 0;
    // Match both **bold** and *italic* - use [^*] to avoid matching asterisks inside
    const regex = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
    let match;
    let keyCounter = 0;

    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      // Check if it's bold (**text**) or italic (*text*)
      if (match[1] !== undefined) {
        // Bold text (matched by \*\*([^*]+)\*\*)
        parts.push(<strong key={`bold-${keyCounter++}`} className="font-bold">{match[1]}</strong>);
      } else if (match[2] !== undefined) {
        // Italic text (matched by \*([^*]+)\*)
        parts.push(<em key={`italic-${keyCounter++}`} className="font-semibold italic">{match[2]}</em>);
      }
      
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="chat-container flex-1 overflow-y-auto px-2 py-2 pb-24 custom-scrollbar flex flex-col">
      <style>
        {`
          .chat-container::-webkit-scrollbar {
            width: 4px;
          }
          .chat-container::-webkit-scrollbar-thumb {
            background-color: rgba(255,255,255,0.2);
            border-radius: 2px;
          }
          .message-container {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding: 0.5rem 0;
            max-width: 48rem;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
          }
          .message-content {
            max-width: 80%;
            padding: 0.75rem 1.25rem;
            border-radius: 1.25rem;
            line-height: 1.5;
            word-break: break-word;
            transition: all 0.2s ease;
          }
          .user-message {
            display: flex;
            justify-content: flex-end;
          }
          .ai-message {
            display: flex;
            justify-content: flex-start;
          }
          .user-message .message-content {
            border-bottom-right-radius: 0.25rem;
            margin-left: auto;
            background-color: rgba(204, 255, 0, 0.1);
          }
          .ai-message .message-content {
            border-bottom-left-radius: 0.25rem;
            margin-right: auto;
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .typing-dot {
            animation: bounce 1s infinite ease-in-out;
          }
          .typing-dot:nth-child(1) { animation-delay: 0s; }
          .typing-dot:nth-child(2) { animation-delay: 0.2s; }
          .typing-dot:nth-child(3) { animation-delay: 0.4s; }
          
          @media (max-width: 768px) {
            .message-container {
              padding-left: 9px;
              padding-right: 9px;
            }
          }
          
          @media (max-width: 425px) {
            .message-content {
              max-width: 90%;
            }
          }
        `}
      </style>

      {[...history].reverse().map((entry, idx) => {
        const isLatest = idx === history.length - 1;
        return (
          <div key={idx} className="message-container">
            <div className="user-message">
              <div className={`${theme.bubbleUser} message-content`}>
                {entry.user}
              </div>
            </div>

            <div className="ai-message">
              <div className={`${theme.bubbleAI} message-content`}>
                {entry.ai ? parseMarkdown(entry.ai) : (isLatest && loading ? <TypingIndicator /> : null)}
              </div>
            </div>
          </div>
        );
      })}
      {/* Invisible element at the bottom for auto-scroll */}
      <div ref={chatEndRef} />
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex space-x-2 items-center h-6">
    <span className="typing-dot w-2.5 h-2.5 bg-[#CCFF00] rounded-full" />
    <span className="typing-dot w-2.5 h-2.5 bg-[#CCFF00] rounded-full" />
    <span className="typing-dot w-2.5 h-2.5 bg-[#CCFF00] rounded-full" />
  </div>
);

export default ChatBubbles;
