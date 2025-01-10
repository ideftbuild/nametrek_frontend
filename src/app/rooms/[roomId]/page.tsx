'use client'
import { useRoom } from '../../../contexts/RoomContext';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGameClient  } from '../services/websocketService';
import { FaPlay } from 'react-icons/fa'; // Install with `npm install react-icons`
import useGameStore from '../../../store/gameStore';
import Header from '../../../components/Header'
import PlayerInfoSection from "../components/PlayerInfoSection";
import Footer from '../../../components/Footer';
import Players from '../components/Players.tsx';
import GameService from '../../../services/GameService';
import AnswerModal from '../components/AnswerModal';
import LeaderboardChart from '../components/LeaderboardChart';
import CopyCodeButton from '../components/CopyCodeButton';
import CopyLinkButton from '../components/CopyLinkButton';

const Room = () => {
  const { roomId } = useParams();
  const [ isOwner, setIsOwner ] = useState(false);
  const [ infoIsClicked, setInfoIsClicked ] = useState(false);
  const leaderboardRef = useRef(null);

  // game states
  const allPlayers = useGameStore((state) => state.allPlayers);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const countdown = useGameStore((state) => state.countdown);
  const getOwner = useGameStore((state) => state.getOwner);
  const setError = useGameStore((state) => state.setError);
  const error = useGameStore((state) => state.error);
  const currentRoom = useGameStore((state) => state.currentRoom);
  const isPlayerTurn = useGameStore((state) => state.isPlayerTurn);
  const inProgress = useGameStore((state) => state.inProgress);
  const setLeaderboardRef = useGameStore((state) => state.setLeaderboardRef);
  const roomCode = useGameStore((state) => state.roomCode);
  const roomLink = useGameStore((state) => state.roomLink);

  const gameService = new GameService();
  const router = useRouter();
  const handleStartGame = () => {
    console.log("starting game...");
    gameService.startGame(roomId);
  }
  
  useGameClient(roomId);

  useEffect(() => {
    if (error) {
      alert(error);
      setError(null);
      router.push('/');
    }
  }, [error])

  useEffect(() => {
    if (currentPlayer && currentRoom) {
      const owner = getOwner();
      if (owner) {
        console.log('curren player is: ' + currentPlayer.id);
        console.log('owner: ' + owner.id);
        setIsOwner(owner.id == currentPlayer.id) 
      }
    }
  }, [currentRoom, currentPlayer])

  useEffect(() => {
    // Store the ref in Zustand when the component mounts
    setLeaderboardRef(leaderboardRef);
  }, [setLeaderboardRef]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="z-10">
        {currentPlayer && currentRoom && (
          <PlayerInfoSection
            allPlayers={allPlayers}
            currentPlayer={currentPlayer}
            currentRoom={currentRoom}
            infoIsClicked={infoIsClicked}
            setInfoIsClicked={setInfoIsClicked}
          />
        )}
      </header>

      <main className="container flex flex-col items-center flex-grow mx-auto px-4 py-2 relative z-0">
        {/* Players circle with improved container */}
        <div className="w-full max-w-4xl mb-4">
          <Players />
        </div>

        <AnswerModal 
          isOpen={isPlayerTurn} 
          roomId={roomId}
          countdown={countdown}
          currentPlayer={currentPlayer}
        />

        {/* Game controls section */}
        {isOwner && !inProgress && (
          <div className="w-full max-w-4xl mb-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center">
              <button 
                onClick={handleStartGame} 
                className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg 
                hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 
                shadow-lg hover:shadow-green-500/30 font-semibold text-sm sm:text-base"
              >
                <span className="flex items-center gap-2">
                  <FaPlay className="text-sm" />
                  Start Game
                </span>
              </button>
              
              <CopyLinkButton link={roomLink} />
              <CopyCodeButton code={roomCode} />
            </div>
          </div>
        )}

        {/* Leaderboard section */}
        <div className="w-full max-w-4xl transition-all">
          <LeaderboardChart allPlayers={allPlayers} leaderboardRef={leaderboardRef} />
        </div>
      </main>

      <Footer className="relative z-10" />
    </div>
  );
}

export default Room;
