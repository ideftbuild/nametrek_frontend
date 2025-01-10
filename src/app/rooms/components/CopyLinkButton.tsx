import React, { useState } from 'react';
import { FaClipboard, FaCheck } from 'react-icons/fa'; // Install with `npm install react-icons`

const CopyLinkButton = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
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
      from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 
      transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-500/30 
      font-medium text-sm sm:text-base"
    >
      {copied ? 
        <span className="flex items-center gap-2">
          <FaCheck className="text-sm" />
          Copied!
        </span> : 
        <span className="flex items-center gap-2">
          <FaClipboard className="text-sm" />
          Copy Link
        </span>
      }
    </button>
  );
};

export default CopyLinkButton;
