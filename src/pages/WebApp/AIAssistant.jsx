import React, { useState, useRef, useEffect } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import ChatInput from "../../components/WebApp/AiChat/ChatInput";
import ChatBubbles from "../../components/WebApp/AiChat/ChatBubbles";

const AIAssistant = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // tracks if typewriter is still active
  const [stopped, setStopped] = useState(false); // tracks if user manually stopped the current message
  const abortControllerRef = useRef(null);

  const handleSend = async (text) => {
    if (!text.trim() || loading) return;

    // Add user message to history
    const newEntry = { user: text, ai: "" };
    setHistory((prev) => {
      return [newEntry, ...prev];
    });
    setLoading(true);
    setStopped(false);
    setIsTyping(true);

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/aichat/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = "";
      let lastProcessedLength = 0; // Track the length of processed content

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        // Parse the streaming data format: data: {"type":"text","content":"..."}
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.trim().startsWith('data: ')) {
            try {
              const jsonStr = line.substring(6).trim(); // Remove "data: " prefix and trim
              if (jsonStr === '') continue; // Skip empty data lines
              
              const data = JSON.parse(jsonStr);
              
              if (data.type === "text" && data.content) {
                // Simply append content - the backend should handle deduplication
                aiResponse += data.content;
              } else if (data.type === "done") {
                // Stream is complete
                break;
              }
            } catch (e) {
              // Skip invalid JSON lines
            }
          }
        }

        // Update the AI response in real-time (we always accumulate, pause affects only UI typing)
        setHistory((prev) => {
          const updated = [...prev];
          if (updated[0]) {
            // Update with current response
            updated[0] = { ...updated[0], ai: aiResponse };
          }
          return updated;
        });
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setHistory((prev) => {
          const updated = [...prev];
          if (updated[0]) {
            updated[0] = {
              ...updated[0],
              ai: "Sorry, I encountered an error. Please try again.",
            };
          }
          return updated;
        });
      }
    } finally {
      setLoading(false);
      setIsTyping(false); // Set typing to false when stream is complete
    }
  };

  const handleVoice = () => {
    // TODO: voice input handler
  };

  const handleNewChat = () => {
    // Clear chat history to start a new conversation
    setHistory([]);
    setLoading(false);
    setStopped(false);
    setIsTyping(false);
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleStopStream = () => {
    // Stop the stream permanently - abort the request and stop typing immediately
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setLoading(false);
    setStopped(true); // Signal to TypewriterText to stop immediately
    setIsTyping(false);
  };

  const handleTypingComplete = () => {
    setIsTyping(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-[90vh]">
      {/* Mobile Layout */}
      <div className="block lg:hidden flex-1 flex flex-col pb-32">
        {history.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <div className="flex flex-col items-center justify-center text-center w-full max-w-lg">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <RiRobot2Fill className="text-[#CCFF00] shrink-0" size={28} />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-white whitespace-nowrap">
                  How can I help you today?
                </h3>
              </div>
              <p className="max-w-lg text-white/40 text-sm sm:text-base md:text-lg leading-relaxed">
                Ask me anything about market trends, token insights, or explore the latest trading signals.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            <ChatBubbles history={history} loading={loading} stopped={stopped} onTypingComplete={handleTypingComplete} />
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-col flex-1">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-30 bg-black lg:pl-64">
          <div className="pt-4 pb-4">
            <div className="max-w-7xl mx-auto px-8">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center text-white mt-0">
                Coinguard AI
              </h1>
            </div>
            <div className="border-b border-gray-800 w-full" />
          </div>
        </div>

        {/* Content Area with top padding for fixed header */}
        <div className="flex-1 overflow-hidden pt-24 pb-32">
          {history.length === 0 ? (
            <div className="flex-1 flex items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center text-center px-4 w-full max-w-2xl">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <RiRobot2Fill className="text-[#CCFF00] shrink-0" size={24} />
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white">
                    How can I help you today?
                  </h3>
                </div>
                <p className="max-w-lg text-white/40 text-sm sm:text-base md:text-lg leading-relaxed">
                  Ask me anything about market trends, token insights, or explore the latest trading signals.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full overflow-hidden">
              <ChatBubbles history={history} loading={loading} stopped={stopped} onTypingComplete={handleTypingComplete} />
            </div>
          )}
        </div>
      </div>

      {/* Fixed bottom input bar (mobile + desktop) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md lg:pl-64 pb-2 lg:pb-8">
        <div className="max-w-full mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl">
              <ChatInput
                placeholder="Ask anything"
                onSend={handleSend}
                onVoice={handleVoice}
                onNewChat={handleNewChat}
                isStreaming={loading || isTyping}
                onStopStream={handleStopStream}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
