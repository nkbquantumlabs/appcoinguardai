import React, { useState, useEffect, useRef } from "react";
import { FiMic, FiPlus } from "react-icons/fi";
import { TbSend } from "react-icons/tb";

const ChatInput = ({
  placeholder = "Ask anything",
  onSend,
  onVoice,
  onNewChat,
  isStreaming = false,
  onStopStream,
}) => {
  const [value, setValue] = useState("");
  const [listening, setListening] = useState(false);
  const isEmpty = value.trim().length === 0;
  const [textareaHeight, setTextareaHeight] = useState(24); // Initial height for one line
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const recognitionRef = useRef(null);
  const startValueRef = useRef(""); // Store the value when mic starts
  const accumulatedTranscriptRef = useRef(""); // Store accumulated final transcripts
  const silenceTimerRef = useRef(null); // Timer for silence detection
  const textareaRef = useRef(null); // Reference to textarea element

  const handleSend = () => {
    const text = value.trim();
    if (!text) return;
    onSend?.(text);
    setValue("");
    // Reset textarea height
    setTextareaHeight(24);
  };

  const handleNewChat = () => {
    onNewChat?.();
    setShowMenu(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        // Clear any existing silence timer
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }

        // Build complete transcript from all results (both final and interim)
        let completeTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          completeTranscript += event.results[i][0].transcript;
        }

        // Update textarea with start value + complete transcript
        const newValue = startValueRef.current + completeTranscript;
        setValue(newValue);

        // Auto-adjust textarea height based on content
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            const scrollHeight = textareaRef.current.scrollHeight;
            const minHeight = 24;
            const maxHeight = window.innerWidth < 768 ? 100 : 70;
            const newHeight = Math.min(
              Math.max(minHeight, scrollHeight),
              maxHeight
            );
            textareaRef.current.style.height = newHeight + "px";
            setTextareaHeight(newHeight);
          }
        }, 0);

        // Update accumulated transcript with only final results
        let finalTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          accumulatedTranscriptRef.current = finalTranscript;
        }

        // Start silence timer - stop mic after 5 seconds of no speech
        silenceTimerRef.current = setTimeout(() => {
          if (recognitionRef.current && listening) {
            recognitionRef.current.stop();
            setListening(false);
            accumulatedTranscriptRef.current = "";
          }
        }, 5000);
      };

      recognitionRef.current.onerror = (event) => {
        setListening(false);
      };

      recognitionRef.current.onend = () => {
        // Only stop if user manually stopped, not if it ended automatically
        if (listening) {
          // Auto-restart if it ended unexpectedly while still in listening mode
          try {
            recognitionRef.current.start();
          } catch (error) {
            setListening(false);
          }
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    try {
      if (listening) {
        recognitionRef.current.stop();
        setListening(false);
        // Reset accumulated transcript
        accumulatedTranscriptRef.current = "";
        // Clear silence timer
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }
      } else {
        // Store the current value before starting recognition
        startValueRef.current = value;
        // Reset accumulated transcript
        accumulatedTranscriptRef.current = "";
        recognitionRef.current.start();
        setListening(true);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
    onVoice?.();
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleTextareaChange = (e) => {
    setValue(e.target.value);

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;
    const minHeight = 24; // Minimum height for one line
    const maxHeight = window.innerWidth < 768 ? 100 : 70; // Reduced max height for both screen sizes

    const newHeight = Math.min(Math.max(minHeight, scrollHeight), maxHeight);
    textarea.style.height = newHeight + "px";
    setTextareaHeight(newHeight);
  };

  return (
    <div className="w-full flex items-center justify-center -mt-4">
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
          to { opacity: 0; transform: scale(1.5); }
        }
      `}</style>
      <div className="flex items-center gap-4 w-full max-w-3xl">
        {/* Input with expanding textarea and fixed bottom icons */}
        <div
          className="flex-1 bg-black border border-[#ccff0040] rounded-3xl flex flex-col transition-all duration-200"
          style={{ minHeight: Math.max(64, textareaHeight + 32) + "px" }}
        >
          {/* Textarea that expands upward */}
          <div className="flex-1 px-4 pt-4 pb-2">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleTextareaChange}
              onKeyDown={onKeyDown}
              onClick={() => {
                // Stop mic when user clicks in textarea
                if (listening && recognitionRef.current) {
                  recognitionRef.current.stop();
                  setListening(false);
                  accumulatedTranscriptRef.current = "";
                  // Clear silence timer
                  if (silenceTimerRef.current) {
                    clearTimeout(silenceTimerRef.current);
                    silenceTimerRef.current = null;
                  }
                }
              }}
              placeholder={placeholder}
              className="w-full bg-transparent outline-none text-white placeholder:text-gray-400 resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent leading-6"
              style={{
                height: textareaHeight + "px",
                maxHeight: window.innerWidth < 768 ? "100px" : "70px",
              }}
              rows={1}
            />
          </div>

          {/* Fixed bottom row with icons */}
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="relative" ref={menuRef}>
              {/* Plus Icon with Menu */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#4a4a4a] transition-colors"
                aria-label="Menu"
              >
                <FiPlus className="w-5 h-5 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute bottom-full left-0 mb-2 bg-[#2a2a2a] border border-gray-700 rounded-lg shadow-lg py-1 min-w-[150px] z-50">
                  <button
                    onClick={handleNewChat}
                    className="w-full px-4 py-2 text-left text-white text-sm"
                  >
                    New Chat
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Mic Button */}
              <button
                onClick={handleMicClick}
                aria-pressed={listening}
                className={`mic flex items-center justify-center w-10 h-10 rounded-full transition ${
                  listening ? "listening" : ""
                }`}
                aria-label="Voice input"
              >
                <FiMic
                  className={`w-6 h-6 transition-colors ${
                    listening ? "text-[#ccff00]" : "text-gray-500"
                  }`}
                />
              </button>

              {/* Stop Button / Send Button */}
              {isStreaming ? (
                <button
                  onClick={() => onStopStream?.()}
                  className={`flex items-center justify-center w-10 h-10 rounded-full bg-[#1a1a1a] transition focus:outline-none focus:ring-2 focus:ring-[#ccff00]`}
                  aria-label="Stop"
                  title="Stop"
                >
                  {/* Square icon for stop */}
                  <span
                    className="block"
                    style={{
                      width: "14px",
                      height: "14px",
                      backgroundColor: "#CCFF00be",
                      borderRadius: "2px",
                    }}
                  />
                </button>
              ) : (
                <button
                  onClick={handleSend}
                  disabled={isEmpty}
                  aria-disabled={isEmpty}
                  className={`flex items-center justify-center w-10 h-10 rounded-full bg-[#1a1a1a] transition ${
                    isEmpty ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Send"
                >
                  <TbSend className="w-5 h-5 text-[#ccff00]" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
