import React, { useState } from 'react';
import { FaClipboard, FaCheck } from 'react-icons/fa'; // Install with `npm install react-icons`

const CopyCodeButton: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  if (!code) return;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      // Reset the state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="flex-shrink-0 flex items-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r 
      from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 
      transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/30 
      font-medium text-sm sm:text-base"
    >
      {copied ? 
        <span className="flex items-center gap-2">
          <FaCheck className="text-sm" />
          Copied!
        </span> : 
        <span className="flex items-center gap-2">
          <FaClipboard className="text-sm" />
          Copy Code
        </span>
      }
    </button>
  );
};

export default CopyCodeButton;
