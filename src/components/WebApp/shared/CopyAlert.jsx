import React, { useState } from 'react';

/**
 * UNIVERSAL COPY ALERT SYSTEM
 * 
 * This system automatically shows copy notifications for ANY copy operation in the app.
 * 
 * HOW TO USE:
 * 
 * Method 1 - Use anywhere without imports (RECOMMENDED):
 *   onClick={() => copyToClipboard("text to copy")}
 *   onClick={() => copyToClipboard("text", "Custom message!")}
 * 
 * Method 2 - Native clipboard API (also works automatically):
 *   navigator.clipboard.writeText("text to copy")
 * 
 * Method 3 - Manual import (for TypeScript/explicit imports):
 *   import { copyToClipboard } from '../components/WebApp/shared/CopyAlert';
 * 
 * The CopyAlert component is already added to App.jsx - no setup needed!
 */

let globalNotificationSetter = null;

// Store original clipboard method
const originalWriteText = navigator.clipboard?.writeText?.bind(navigator.clipboard);

// Make copy function available globally on window object
const universalCopyToClipboard = (text, customMessage = "Copied to clipboard") => {
  if (!text) return;
  
  // Use original method to avoid recursion
  if (originalWriteText) {
    originalWriteText(text);
  }
  
  if (globalNotificationSetter) {
    const id = Date.now();
    globalNotificationSetter((prev) => [...prev, { id, message: customMessage }]);
    setTimeout(() => {
      globalNotificationSetter((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  }
};

// Export for manual imports (backward compatibility)
export const copyToClipboard = universalCopyToClipboard;

// Make it globally available
if (typeof window !== 'undefined') {
  window.copyToClipboard = universalCopyToClipboard;
  
  // Override native clipboard API to automatically show notifications
  if (originalWriteText) {
    navigator.clipboard.writeText = function(text) {
      const result = originalWriteText.call(this, text);
      
      // Show notification after successful copy
      result.then(() => {
        if (globalNotificationSetter) {
          const id = Date.now();
          globalNotificationSetter((prev) => [...prev, { id, message: "Copied to clipboard" }]);
          setTimeout(() => {
            globalNotificationSetter((prev) => prev.filter((n) => n.id !== id));
          }, 4000);
        }
      }).catch(() => {
        // Silently fail - no notification on error
      });
      
      return result;
    };
  }
}

// Copy Alert Component - Add this to your main App component
const CopyAlert = () => {
  const [notifications, setNotifications] = useState([]);

  // Set the global setter when component mounts
  React.useEffect(() => {
    globalNotificationSetter = setNotifications;
    return () => {
      globalNotificationSetter = null;
    };
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <>
      <style>{`
        .copy-notification-container {
          position: fixed;
          top: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 9999;
        }
        .copy-notification {
          background: #222;
          padding: 15px 20px;
          border-radius: 8px;
          min-width: 250px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          display: flex;
          justify-content: space-between;
          align-items: center;
          animation: copySlideIn 0.4s ease, copyFadeOut 0.5s ease forwards;
          animation-delay: 0s, 3.5s;
          border-left: 5px solid #22c55e;
        }
        .copy-notification span { 
          flex: 1; 
          margin-right: 10px; 
          color: #fff; 
          font-size: 14px;
          font-weight: 500;
        }
        .copy-notification button { 
          background: transparent; 
          border: none; 
          color: #888; 
          cursor: pointer; 
          font-size: 18px;
          padding: 0;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .copy-notification button:hover {
          color: #fff;
        }
        @keyframes copySlideIn { 
          from { opacity: 0; transform: translateX(100%);} 
          to { opacity: 1; transform: translateX(0);} 
        }
        @keyframes copyFadeOut { 
          to { opacity: 0; transform: translateX(100%);} 
        }
      `}</style>
      <div className="copy-notification-container">
        {notifications.map((notification) => (
          <div key={notification.id} className="copy-notification">
            <span>{notification.message}</span>
            <button onClick={() => removeNotification(notification.id)}>×</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default CopyAlert;
