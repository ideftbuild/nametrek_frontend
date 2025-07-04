import { User } from 'lucide-react';
import React, { useState } from 'react';
import type { Player } from "@/store/types";
import useGameStore from "@/store/gameStore";


// Memoized Player component to prevent unnecessary re-renders
type PlayerProps = {
  player: Player;
  position: {x: number, y: number};
  isCurrentPlayer: boolean;
  isCountdown: boolean;
}

const Player: React.FC<PlayerProps> = React.memo(function Player({ player, position, isCurrentPlayer, isCountdown }) {
  const [hovered, setHovered] = useState(false);
  const countdown = useGameStore((state) => state.countdown);

  return (
    <div
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      className="absolute transition-all duration-500 ease-in-out scale-110"
    >
      <div className="relative group">
        <div className="relative bg-gradient-to-r from-pink-400 to-yellow-300 rounded-full p-0.5 shadow-lg">
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="bg-gradient-to-br from-pink-50 to-yellow-50 rounded-full p-4 w-16 h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          >
            {isCountdown && (
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/70 rounded-full text-white text-sm">
                {countdown}
              </div>
            )}
            <User
              className={`w-8 h-8 ${isCurrentPlayer ? 'text-pink-500' : 'text-gray-400'}`}
            />
          </div>
          {hovered && (
            <div className="absolute -top-12 -left-5 w-max bg-white shadow-lg p-2 border border-white rounded-md z-10">
              <p className="font-bold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
                {player?.name}
              </p>
              <p className="font-bold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
                Score: {player?.score}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Player;
