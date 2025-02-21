'use client'
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGameClient  } from '../services/websocketService';
import useGameStore from '../../../store/gameStore';
import Header from '../../../components/Header';
import PlayerInfoSection from "../components/PlayerInfoSection";
import Footer from '../../../components/Footer';
import Board from '../components/Board';
import GameService from '../../../services/GameService';
import AnswerModal from '../components/AnswerModal';
import LeaderboardChart from '../components/LeaderboardChart';
import CopyCodeButton from '../components/CopyCodeButton';
import CopyLinkButton from '../components/CopyLinkButton';
import StartButton from '../components/StartButton';
import { Audiowide, Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  weight: '400', // Default weight
  subsets: ['latin'], // Only load required subsets
});

const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
});

const Room = () => {
  const { roomId } = useParams();
  const [ isOwner, setIsOwner ] = useState(false);
  const [ infoIsClicked, setInfoIsClicked ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
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
  const setIsPlayerTurn = useGameStore((state) => state.setIsPlayerTurn);
  const inProgress = useGameStore((state) => state.inProgress);
  const setLeaderboardRef = useGameStore((state) => state.setLeaderboardRef);
  const roomCode = useGameStore((state) => state.roomCode);
  const roomLink = useGameStore((state) => state.roomLink);
  const hasScores = useGameStore((state) => state.hasScores);

  const gameService = new GameService();
  const router = useRouter();
  const handleStartGame = async (setStarting: (starting: boolean) => void) => {
    try {
      setStarting(true);
      setTimeout(() => {
        setStarting(false);
      }, 1000);
      await gameService.startGame(roomId as string);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }

  useGameClient(roomId as string);

  useEffect(() => {
    if (error) {
      alert(error);
      setError(null);
    }
  }, [error, router, setError])

  useEffect(() => {
    if (currentPlayer && currentRoom) {
      const owner = getOwner();
      if (owner) {
        setIsOwner(owner.id == currentPlayer.id)
      }
      setIsLoading(false);
    }
  }, [currentRoom, currentPlayer, getOwner])

  useEffect(() => {
    // Store the ref in Zustand when the component mounts
    if (leaderboardRef != null) {
      setLeaderboardRef(leaderboardRef);
    }
  }, [setLeaderboardRef]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col relative ${audiowide.className}`}>

      {/* Optional Overlay for Better Visibility */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-[-1]"></div>
      <header>
        <div className="absolute w-full">
          {currentPlayer && currentRoom && (
            <PlayerInfoSection
              allPlayers={allPlayers}
              currentPlayer={currentPlayer}
              currentRoom={currentRoom}
              infoIsClicked={infoIsClicked}
              setInfoIsClicked={setInfoIsClicked}
            />
          )}
        </div>
      </header>


      <main className="container flex flex-col items-center flex-grow mx-auto px-4 py-2 relative z-0">

        {/* Players circle with improved container */}
        <div className="w-full max-w-4xl mb-4">
          <Board />
        </div>

        <AnswerModal
          open={isPlayerTurn}
          setOpen={setIsPlayerTurn}
          roomId={roomId as string}
          countdown={countdown}
          currentPlayer={currentPlayer}
        />

        {/* Game controls section */}
        {isOwner && !inProgress && (
          <div className="w-full max-w-4xl mb-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center">
              <StartButton handleStartGame={handleStartGame} />
              <CopyCodeButton code={roomCode as string} />
              <CopyLinkButton link={roomLink as string} />
            </div>
          </div>
        )}

        {/* Leaderboard section */}
        <div className="w-full max-w-4xl transition-all mb-12">
          <LeaderboardChart allPlayers={allPlayers} leaderboardRef={leaderboardRef} hasScores={hasScores} />
        </div>
      </main>
    </div>
  );
}

export default Room;
