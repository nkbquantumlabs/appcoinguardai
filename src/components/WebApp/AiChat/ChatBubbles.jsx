import React, { useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const TypingIndicator = () => (
  <div className="flex space-x-2 items-center h-6">
    <span className="typing-dot w-2.5 h-2.5 bg-[#CCFF00] rounded-full" />
    <span className="typing-dot w-2.5 h-2.5 bg-[#CCFF00] rounded-full" />
    <span className="typing-dot w-2.5 h-2.5 bg-[#CCFF00] rounded-full" />
  </div>
);

const ChatBubbles = ({
  history = [],
  loading = false,
  stopped = false,
  onTypingComplete,
}) => {
  const chatEndRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const chatContainerRef = useRef(null);
  const scrollDetectionTimeoutRef = useRef(null);
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const theme = {
    bubbleUser: "bg-[#CCFF00]/10 text-white border border-[#CCFF00]/20",
    bubbleAI: "bg-[#1a1a1a] text-white border border-white/10",
  };

  // Check if user is at bottom of chat
  const isAtBottom = () => {
    if (!chatContainerRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const threshold = 100; // pixels from bottom
    return scrollHeight - scrollTop - clientHeight < threshold;
  };

  // Handle scroll events to detect user scrolling (debounced)
  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    
    // Clear existing timeout
    if (scrollDetectionTimeoutRef.current) {
      clearTimeout(scrollDetectionTimeoutRef.current);
    }
    
    // Debounce scroll detection to avoid excessive state updates
    scrollDetectionTimeoutRef.current = setTimeout(() => {
      const atBottom = isAtBottom();
      setIsUserScrolledUp(!atBottom);
      setShouldAutoScroll(atBottom);
    }, 50);
  };

  // Auto-scroll to bottom when history changes (only if user is at bottom)
  useEffect(() => {
    if (shouldAutoScroll && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, history[0]?.ai, shouldAutoScroll]);

  // Auto-scroll when content height increases during typing (only if should auto-scroll)
  useEffect(() => {
    if (chatEndRef.current && shouldAutoScroll) {
      const observer = new ResizeObserver(() => {
        // Only scroll if user hasn't scrolled up
        if (shouldAutoScroll) {
          chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      });

      // Observe the chat container for size changes
      const chatContainer = chatEndRef.current.parentElement;
      if (chatContainer) {
        observer.observe(chatContainer);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [history.length, shouldAutoScroll]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (scrollDetectionTimeoutRef.current) {
        clearTimeout(scrollDetectionTimeoutRef.current);
      }
    };
  }, []);

  // Function to parse markdown bold (**text**) and italic (*text*) and handle newlines
  const parseMarkdown = (text) => {
    if (!text) return text;

    // First, split by newlines to handle line breaks
    const lines = text.split('\n');
    const processedLines = [];
    
    lines.forEach((line, lineIndex) => {
      if (lineIndex > 0) {
        // Add line break for all lines except the first
        processedLines.push(<br key={`br-${lineIndex}`} />);
      }
      
      // Process markdown in each line
      const parts = [];
      let lastIndex = 0;
      // Match both **bold** and *italic* - use [^*] to avoid matching asterisks inside
      const regex = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
      let match;
      let keyCounter = 0;

      while ((match = regex.exec(line)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }

        // Check if it's bold (**text**) or italic (*text*)
        if (match[1] !== undefined) {
          // Bold text (matched by \*\*([^*]+)\*\*)
          parts.push(
            <strong key={`bold-${lineIndex}-${keyCounter++}`} className="font-bold">
              {match[1]}
            </strong>
          );
        } else if (match[2] !== undefined) {
          // Italic text (matched by \*([^*]+)\*)
          parts.push(
            <em key={`italic-${lineIndex}-${keyCounter++}`} className="font-semibold italic">
              {match[2]}
            </em>
          );
        }

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text from this line
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }
      
      // Add processed parts from this line
      processedLines.push(...parts);
    });

    return processedLines.length > 0 ? processedLines : text;
  };

  return (
    <div 
      ref={chatContainerRef}
      className="chat-container flex-1 overflow-y-auto px-2 py-2 pb-[65px] lg:pb-24 custom-scrollbar flex flex-col"
      onScroll={handleScroll}
    >
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
          .typewriter-caret {
            display: inline-block;
            width: 1px;
            background: rgba(255,255,255,0.8);
            margin-left: 2px;
            animation: caretBlink 1s step-start infinite;
            height: 1em;
            vertical-align: text-bottom;
          }
          @keyframes caretBlink {
            50% { opacity: 0; }
          }
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
        const originalIndex = history.length - 1 - idx;
        const isLatest = originalIndex === 0; // Latest is the first in original array
        // Render message with proper indexing
        return (
          <div key={`message-${originalIndex}-${entry.user?.substring(0, 10)}`} className="message-container">
            <div className="user-message">
              <div className={`${theme.bubbleUser} message-content`}>
                {entry.user}
              </div>
            </div>

            <div className="ai-message">
              <div className={`${theme.bubbleAI} message-content`}>
                {entry.ai ? (
                  <div style={{ whiteSpace: 'pre-wrap' }}>
                    {parseMarkdown(entry.ai)}
                    {isLatest && loading && <span className="typewriter-caret" />}
                  </div>
                ) : isLatest && loading ? (
                  <TypingIndicator />
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Scroll to bottom button - shown when user scrolled up */}
      {isUserScrolledUp && (
        <div className="fixed bottom-20 lg:bottom-32 right-4 z-10">
          <button
            onClick={() => {
              setShouldAutoScroll(true);
              setIsUserScrolledUp(false);
              chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-[#CCFF00]/20 hover:bg-[#CCFF00]/30 border border-[#CCFF00]/50 text-[#CCFF00] p-3 rounded-full shadow-lg transition-all duration-200 backdrop-blur-sm"
            title="Scroll to bottom"
          >
            <IoChevronDown className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {/* Invisible element at the bottom for auto-scroll */}
      <div ref={chatEndRef} />
    </div>
  );
};

// Typewriter component that progressively reveals incoming text (including when it grows due to streaming)
const TypewriterText = ({
  text = "",
  speed = 40,
  parseFn = (t) => t,
  showCaret = false,
  stopped = false,
  onComplete,
  onTextUpdate,
}) => {
  const [displayed, setDisplayed] = useState("");
  const queueRef = useRef("");
  const typingRef = useRef(false);
  const intervalRef = useRef(null);

  // Reset when a completely different text replaces the message (e.g., new message render)
  useEffect(() => {
    if (!text) {
      setDisplayed("");
      queueRef.current = "";
      return;
    }

    // If current displayed isn't a prefix of incoming text (edge case), fast-sync to longest common prefix
    const commonPrefixLen = (() => {
      const a = displayed;
      const b = text;
      const min = Math.min(a.length, b.length);
      let i = 0;
      while (i < min && a[i] === b[i]) i++;
      return i;
    })();

    if (commonPrefixLen < displayed.length) {
      // If displayed overshoots (shouldn't in our flow), trim back
      setDisplayed((prev) => prev.slice(0, commonPrefixLen));
    }

    // Queue only the new part that hasn't been displayed
    const newPart = text.slice(displayed.slice(0, commonPrefixLen).length);
    if (newPart.length > 0) {
      queueRef.current += newPart;
      startTyping();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      typingRef.current = false;
    };
  }, []);

  // Stop typing immediately when stopped prop becomes true
  useEffect(() => {
    if (stopped) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      typingRef.current = false;
      queueRef.current = ""; // Clear any remaining queue
      // Call onComplete to signal that typing is done
      if (onComplete) {
        onComplete();
      }
    }
  }, [stopped, onComplete]);

  const startTyping = () => {
    if (typingRef.current || stopped) return; // Don't start if already stopped
    typingRef.current = true;
    const interval = Math.max(10, speed);
    intervalRef.current = setInterval(() => {
      if (!queueRef.current || queueRef.current.length === 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        typingRef.current = false;

        // Check if we've displayed all the text and call onComplete
        if (onComplete && displayed.length >= text.length) {
          onComplete();
        }
        return;
      }
      const nextChar = queueRef.current[0];
      queueRef.current = queueRef.current.slice(1);
      setDisplayed((prev) => {
        const newDisplayed = prev + nextChar;
        // Check if this is the last character
        if (
          onComplete &&
          newDisplayed.length >= text.length &&
          queueRef.current.length === 0
        ) {
          setTimeout(() => onComplete(), 0); // Call on next tick to ensure state is updated
        }
        // Call onTextUpdate for auto-scrolling
        if (onTextUpdate) {
          onTextUpdate();
        }
        return newDisplayed;
      });
    }, interval);
  };

  const caretVisible =
    showCaret && (typingRef.current || displayed.length < text.length);

  return (
    <span>
      {parseFn(displayed)}
      {caretVisible ? <span className="typewriter-caret" /> : null}
    </span>
  );
};

export default ChatBubbles;
