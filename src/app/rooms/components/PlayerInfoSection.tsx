import React from 'react';
import { User, Info, Crown, Clock } from 'lucide-react';
import useGameStore from '../../../store/gameStore.ts';

const PlayerInfoSection = ({ allPlayers, currentPlayer, currentRoom, infoIsClicked, setInfoIsClicked }) => {
  return (
    <div className="relative z-50">
      <div className="flex m-auto w-10/12 items-center justify-between p-3">
        {/* Player Badge */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-pink-400 to-yellow-300 p-0.5 rounded-xl">
            <div className="bg-gradient-to-r from-pink-50 to-yellow-50 px-4 py-2 rounded-lg flex items-center space-x-2">
              <User className="w-5 h-5 text-pink-400" />
              <span className="font-bold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
                {currentPlayer?.name}
              </span>
            </div>
          </div>
          
          {/* Info Button */}
          <button 
            onClick={() => setInfoIsClicked(!infoIsClicked)}
            className="group relative bg-gradient-to-r from-pink-400 to-yellow-300 p-0.5 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12"
          >
            <div className="bg-gradient-to-r from-pink-50 to-yellow-50 p-2 rounded-full">
              <Info className="w-5 h-5 text-pink-400 group-hover:text-yellow-400 transition-colors duration-300" />
            </div>
          </button>
        </div>

        {/* Info Panel */}
        {infoIsClicked && (
          <div className="animate-slide-down absolute w-11/12 top-full left-1/2 transform -translate-x-1/2 mt-2">
            <div className="backdrop-blur-md bg-gradient-to-br from-pink-100/30 to-yellow-100/30 rounded-xl p-4 shadow-lg border border-pink-200/30">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-pink-50/90 to-yellow-50/90 rounded-lg p-3 transform transition-transform hover:scale-105">
                  <div className="text-sm text-pink-400 flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Current Round</span>
                  </div>
                  <div className="text-xl font-bold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
                    {currentRoom?.round}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-50/90 to-yellow-50/90 rounded-lg p-3 transform transition-transform hover:scale-105">
                  <div className="text-sm text-pink-400 flex items-center space-x-2">
                    <Crown className="w-4 h-4" />
                    <span>Total Rounds</span>
                  </div>
                  <div className="text-xl font-bold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
                    {currentRoom?.rounds || 10}
                  </div>
                </div>
                <div className="col-span-2 bg-gradient-to-br from-pink-50/90 to-yellow-50/90 rounded-lg p-3 transform transition-transform hover:scale-105">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-pink-400">Players</div>
                      <div className="text-xl font-bold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
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
                            <span className="text-xs text-pink-400 font-bold">+{(allPlayers?.length || 1) - 3}</span>
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
};

export default PlayerInfoSection;
