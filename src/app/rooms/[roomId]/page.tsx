'use client'
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useGameClient  } from '../services/websocketService';
import useGameStore from '../../../store/gameStore';
import PlayerInfoSection from "../components/PlayerInfoSection";
import Board from '../components/Board';
import Loading from '../../../components/Loading';
import AnswerModal from '../components/AnswerModal';
import LeaderboardChart from '../components/LeaderboardChart';
import StartButton from '../components/StartButton';
import { Audiowide } from 'next/font/google';

const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
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
  const gameService = useGameStore((state) => state.gameService);
  // const roomCode = useGameStore((state) => state.roomCode);
  // const roomLink = useGameStore((state) => state.roomLink);
  const hasScores = useGameStore((state) => state.hasScores);

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

  // useEffect(() => {
  //   if (error) {
  //     alert(error);
  //     setError(null);
  //   }
  // }, [error, setError])

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
      <Loading />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col relative ${audiowide.className}`}>

      {/* Optional Overlay for Better Visibility */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/10 z-[-1]"></div>
      <header>
        <div className="absolute w-full">
          {currentPlayer && currentRoom && (
            <PlayerInfoSection
              isOwner={isOwner}
              inProgress={inProgress}
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
        <div className="flex flex-col items-center w-full max-w-4xl relative h-[100vh] pt-20">
          <Board />
          {isOwner && !inProgress && (
            <div className="relative mb-4" aria-label="Play">
              <StartButton handleStartGame={handleStartGame} />
            </div>
          )}
        </div>

        <AnswerModal
          open={isPlayerTurn}
          setOpen={setIsPlayerTurn}
          roomId={roomId as string}
          countdown={countdown}
          currentPlayer={currentPlayer}
        />
        {/* Leaderboard section */}
        <div className="w-full max-w-4xl transition-all mb-12">
          <LeaderboardChart allPlayers={allPlayers} leaderboardRef={leaderboardRef} hasScores={hasScores} />
        </div>
      </main>
    </div>
  );
}

export default Room;
