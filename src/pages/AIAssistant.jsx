import React from "react";
import ChatInput from "../components/AiChat/ChatInput";

const AIAssistant = () => {
  const handleSend = (text) => {
    // TODO: wire to chat backend
    console.log("send:", text);
  };

  const handleVoice = () => {
    // TODO: voice input handler
    console.log("voice click");
  };

  return (
    <div className="flex-1">
      {/* Mobile Layout (same header as LiquidityScanner) */}
      <div className="block lg:hidden">
        <div className="pt-5 px-[20px] max-[425px]:px-[16px] pb-28 max-w-3xl mx-auto">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-6 text-center text-white">
            Coinguard AI
          </h1>

          {/* Content */}
          <div className="min-h-[55vh] flex flex-col items-center justify-start pt-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/60 text-center leading-snug mb-10">
              How can we help with?
            </h2>
          </div>
        </div>
      </div>

      {/* Desktop Layout (same header as LiquidityScanner) */}
      <div className="hidden lg:block">
        <div className="pt-4 pb-32">
          <div className="max-w-7xl mx-auto px-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center text-white mt-0">
              Coinguard AI
            </h1>
          </div>
          <div className="border-b border-gray-800 mb-6 w-full" />

          <div className="max-w-7xl mx-auto px-1 lg:px-[64px] lg:py-8">
            <div className="w-full grid place-items-center pt-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white/60 text-center leading-snug">
                How can we help with?
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom input bar (mobile + desktop) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/70 backdrop-blur-md border-t border-gray-800 lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 lg:px-16 py-11">
          <div className="flex items-center justify-center">
            <ChatInput
              placeholder="Search anything"
              onSend={handleSend}
              onVoice={handleVoice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
