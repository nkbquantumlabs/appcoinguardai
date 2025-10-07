import React from "react";
import { PiLeafBold } from "react-icons/pi";

const ChatHeader = ({ title = "Coinguard AI" }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center h-12 bg-black px-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-transparent">
            <PiLeafBold className="text-[#ccff00] w-4 h-4" />
          </div>
          <span className="text-white font-medium">{title}</span>
        </div>
      </div>
      <div className="border-b border-gray-800 w-full" />
    </div>
  );
};

export default ChatHeader;
