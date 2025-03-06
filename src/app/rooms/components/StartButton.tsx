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
      className="flex-shrink-0 p-2 text-white hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200
      hover:shadow-green-500/30 font-semibold text-sm sm:text-base tranform drop-shadow-[0_0_10px_#22e055] min-w-max"
    >
      {starting ? 
        <span className="flex items-center gap-2">
          <FaPlay className="text-sm" />
          starting!
        </span> :
        <span className="flex items-center tranform">
          <FaPlay 
            className="text-5xl text-green-800 drop-shadow-lg" 
            style={{
              background: 'linear-gradient(135deg, #006400, #90EE90)',
              backgroundClip: 'text',
              filter: 'drop-shadow(2px 4px 2px rgba(0, 50, 0, 0.3))',
              transform: 'perspective(40px) rotateX(5deg)',
            }}
          />
        </span> 
      }
    </button>
  )
}

export default StartButton;
