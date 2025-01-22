import { FaPlay } from 'react-icons/fa'; // Install with `npm install react-icons`
import React, { useState } from 'react';

type StartButtonProps = {
  handleStartGame: (setStarting: (starting: boolean) => void) => void;
}

const StartButton: React.FC<StartButtonProps> = ({ handleStartGame }) => {

  const [starting, setStarting] = useState(false);

  return (
    <button
      onClick={() => handleStartGame(setStarting)}
      className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg
      hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200
      shadow-lg hover:shadow-green-500/30 font-semibold text-sm sm:text-base"
    >
      {starting ? 
        <span className="flex items-center gap-2">
          <FaPlay className="text-sm" />
          starting!
        </span> :
        <span className="flex items-center gap-2">
          <FaPlay className="text-sm" />
          Start Game
        </span> 
      }
    </button>
  )
}

export default StartButton;
