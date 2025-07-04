import React, { useState } from 'react';
import { User, Info, Crown, Clock } from 'lucide-react';
import useGameStore from '../../../store/gameStore';
import RulesModal from '../../../components/RulesModal';
import CopyCodeButton from '../components/CopyCodeButton';
import CopyLinkButton from '../components/CopyLinkButton';
import Link from 'next/link';

type PlayerInfoSectionProps = {
  isOwner: boolean;
}

const PlayerInfoSection: React.FC<PlayerInfoSectionProps> = React.memo(function PlayerInfoSection({ isOwner }) {
  const [open, setOpen] = useState(false);
  const roomCode = useGameStore((state) => state.roomCode);
  const roomLink = useGameStore((state) => state.roomLink);
  const inProgress = useGameStore((state) => state.inProgress);
  const allPlayers = useGameStore((state) => state.allPlayers);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const currentRoom = useGameStore((state) => state.currentRoom);
  const [ infoIsClicked, setInfoIsClicked ] = useState(false);

  return (
    <div className="relative z-50">
      <div className="flex m-auto w-10/12 items-center justify-between p-3 text-gray-200">

        {/* Player Badge */}
        <div className="flex items-center gap-4 flex-wrap text-pink-200 bg-sky-800 bg-opacity-20 rounded-lg shadow-lg p-2">
          <div className="bg-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg text-pink-400">
            <User className="w-5 h-5" />
            <span className="font-medium">
              {currentPlayer?.name}
            </span>
          </div>

          {/* Info Button */}
          <button
            onClick={() => setInfoIsClicked(!infoIsClicked)}
            className="group relative bg-sky-500 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg"
          >
            <div className="p-2 rounded-full">
              <Info className="w-5 h-5 group-hover:text-yellow-400 transition-colors duration-300" />
            </div>
          </button>

          <button className="bg-sky-300 bg-opacity-20 hover:text-yellow-300 transition-colors p-1 rounded-lg shadow-lg" onClick={() => setOpen(true)}>Rules</button>
          <RulesModal open={open} setOpen={setOpen} />

          {/* Game controls section */}
          {isOwner && !inProgress && (
            <div className="flex gap-4">
              <CopyCodeButton code={roomCode as string} />
              <CopyLinkButton link={roomLink as string} />
            </div>
          )}
          <Link href="/" className="bg-red-300 text-gray-800 hover:text-yellow-300 transition-colors p-1 rounded-lg shadow-lg">
             Exit
          </Link>
        </div>

        {/* Info Panel */}
        {infoIsClicked && (
          <div className="animate-slide-down absolute w-11/12 top-full left-1/2 transform -translate-x-1/2 mt-2">
            <div className="backdrop-blur-md bg-gradient-to-br from-pink-100/30 to-yellow-100/30 rounded-xl p-4 shadow-lg border border-pink-200/30">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-pink-50/90 to-yellow-50/90 rounded-lg p-3 transform transition-transform hover:scale-105">
                  <div className="text-sm text-pink-400 flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Current Round</span>
                  </div>
                  <div className="text-xl font-medium bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
                    {currentRoom?.round}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-50/90 to-yellow-50/90 rounded-lg p-3 transform transition-transform hover:scale-105">
                  <div className="text-sm text-pink-400 flex items-center space-x-2">
                    <Crown className="w-4 h-4" />
                    <span>Total Rounds</span>
                  </div>
                  <div className="text-xl font-medium bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
                    {currentRoom?.rounds || 10}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-50/90 to-yellow-50/90 rounded-lg p-3 transform transition-transform hover:scale-105 ">
                  <div className="text-sm text-pink-400">Categories</div>
                  <ul className="flex flex-wrap gap-2 items-center text-sm text-pink-400">
                    <li>Animals</li>
                    <li>Countries</li>
                    <li>Cars</li>
                  </ul>
                </div>
                <div className="col-span-3 bg-gradient-to-br from-pink-50/90 to-yellow-50/90 rounded-lg p-3 transform transition-transform hover:scale-105">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-pink-400">Players</div>
                      <div className="text-xl font-medium bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
                        {allPlayers?.length || 1} / {currentRoom?.maxPlayers}
                      </div>
                    </div>
                    <div className="flex -space-x-2">
                      {[...Array(Math.min(allPlayers?.length || 1, 3))].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-yellow-300 p-0.5">
                          <div className="w-full h-full rounded-full bg-pink-50 flex items-center justify-center">
                            <User className="w-4 h-4 text-pink-400" />
                          </div>
                        </div>
                      ))}
                      {(allPlayers?.length || 1) > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-yellow-300 p-0.5">
                          <div className="w-full h-full rounded-full bg-pink-50 flex items-center justify-center">
                            <span className="text-xs text-pink-400 font-medium">+{(allPlayers?.length || 1) - 3}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
});

export default PlayerInfoSection;
