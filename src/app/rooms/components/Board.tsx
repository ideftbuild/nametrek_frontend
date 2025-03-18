import React, { useMemo, useState, useEffect} from 'react';
import useGameStore from '../../../store/gameStore';
import Player from './Player';

const Board = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0});
  const allPlayers = useGameStore((state) => state.allPlayers);
  const countdown = useGameStore((state) => state.countdown);
  const message = useGameStore((state) => state.message);
  const question = useGameStore((state) => state.question);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const setError = useGameStore((state) => state.setError);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { positions, radius, circlePath } = useMemo(() => {

    // Adjust radius calculation to account for the full circle
    const minDimension = Math.min(dimensions.width, dimensions.height);

    const radius = Math.max(
      Math.min(
        (minDimension / 2) * 0.6, // Reduced to 80% to ensure circle fits
        200 // Set a maximum radius to prevent the circle from becoming too large
      ),
      0
    );

    const positions = allPlayers.map((_, index) => {
      const angle = (index * 2 * Math.PI) / allPlayers.length - Math.PI / 2;
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle)
      };
    });

    const circlePath = positions.reduce((acc, pos, i) => {
      return `${acc}${i === 0 ? 'M' : 'L'} ${pos.x},${pos.y} `;
    }, '') + 'Z';


    return { positions, radius, circlePath };
  }, [allPlayers, dimensions]);

  if (!allPlayers?.length || !currentPlayer) {
    setError("Couldn't load the board. Please rejoin");
    return null;
  }

  return (
    <div
      className="relative w-full flex justify-center items-center overflow-visible h-[80vh]"
    >
      {/* Game Circle Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-full h-full max-w-[800px] max-h-[800px]"
          preserveAspectRatio="xMidYMid meet"
          viewBox={`-${radius * 1.2} -${radius * 1.2} ${radius * 2.4} ${radius * 2.4}`}
        >
          <defs>
            <radialGradient id="circleGradient">
              <stop offset="0%" stopColor="#c026d3" stopOpacity="0.2" />
              <stop offset="70%" stopColor="#db2777" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c026d3" />
              <stop offset="50%" stopColor="#db2777" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
          </defs>

          <circle
            r={radius * 1.1}
            cx="0"
            cy="0"
            fill="rgba(0, 0, 0, 0.5)" 
          />

          {/* Large circle background */}
          <circle
            r={radius * 1.1}
            cx="0"
            cy="0"
            fill="url(#circleGradient)"
            className="animate-pulse-slow"
          />

          {/* Decorative circles */}
          <circle
            r={radius * 1.05}
            cx="0"
            cy="0"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
            className="animate-spin-slow"
          />

          <circle
            r={radius}
            cx="0"
            cy="0"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />

          <circle
            r={radius * 0.95}
            cx="0"
            cy="0"
            stroke="url(#lineGradient)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.2"
          />

          {/* Player connecting line */}
          <path
            d={circlePath}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            className="opacity-70"
          />
        </svg>
      </div>

      {/* Question Display */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="bg-gradient-to-br from-purple-800 via-indigo-600 to-pink-600 backdrop-blur-md rounded-xl p-6 max-w-md mx-4 border border-pink-500 shadow-lg shadow-pink-700/50 animate-pulse">
          {message ? (
            <h3 className="sm:text-1xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-indigo-500 to-pink-500 bg-clip-text text-transparent mb-2 animate-glow">
              {message}
            </h3>
          ) : (
            <h3 className={"text-white"}>Waiting for host to start game...</h3>
          )}
        </div>
      </div>

      {/* Players */}
      {allPlayers
        .filter((player) => !player.lost)
        .map((player, index) => {
        const isCurrentPlayer = player.id === currentPlayer.id;
        const isCountdown = question?.playerId === player.id;
        return (
          <Player
            key={player.id}
            player={player}
            position={positions[index]}
            isCurrentPlayer={isCurrentPlayer}
            isCountdown={isCountdown}
            countdown={countdown}
          />
        );
      })}
    </div>
  );
};

export default Board;
