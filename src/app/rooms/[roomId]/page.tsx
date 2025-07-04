'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGameClient  } from '../services/websocketService';
import useGameStore from '../../../store/gameStore';
// import Loading from '../../../components/Loading';
import StartButton from '../components/StartButton';
import { audiowide } from '../../fonts';
import dynamic from 'next/dynamic';

const Board = dynamic(() => import('../components/Board'), { ssr: false });
const AnswerModal = dynamic(() => import('../components/AnswerModal'), { ssr: false });
const LeaderboardChart = dynamic(() => import('../components/LeaderboardChart'), { ssr: false });
const PlayerInfoSection = dynamic(() => import('../components/PlayerInfoSection'), { ssr: false });

const Room = () => {
  const { roomId } = useParams();
  const [ isOwner, setIsOwner ] = useState(false);
  // const [ isLoading, setIsLoading ] = useState(true);

  // game states
  // const allPlayers = useGameStore((state) => state.allPlayers);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  // const countdown = useGameStore((state) => state.countdown);
  const getOwner = useGameStore((state) => state.getOwner);
  // const setError = useGameStore((state) => state.setError);
  const currentRoom = useGameStore((state) => state.currentRoom);
  // const isPlayerTurn = useGameStore((state) => state.isPlayerTurn);
  // const setIsPlayerTurn = useGameStore((state) => state.setIsPlayerTurn);
  // const setLeaderboardRef = useGameStore((state) => state.setLeaderboardRef);
  // const gameService = useGameStore((state) => state.gameService);
  // const hasScores = useGameStore((state) => state.hasScores);

  // const handleStartGame = async (setStarting: (starting: boolean) => void) => {
  //   try {
  //     setStarting(true);
  //     setTimeout(() => {
  //       setStarting(false);
  //     }, 1000);
  //     await gameService.startGame(roomId as string);
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       console.log("Error:", err);
  //       setError(err.message);
  //     }
  //   }
  // }

  useGameClient(roomId as string);

  useEffect(() => {
    if (currentPlayer && currentRoom) {
      const owner = getOwner();
      if (owner) {
        setIsOwner(owner.id == currentPlayer.id)
      }
      // setIsLoading(false);
    }
  }, [currentRoom, currentPlayer, getOwner])


  // if (isLoading) {
  //   return (
  //     <Loading />
  //   );
  // }
  //
  return (
    <div className={`min-h-screen flex flex-col relative ${audiowide.className}`}>

      {/* Optional Overlay for Better Visibility */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/10 z-[-1]"></div>
      <header>
        <div className="absolute w-full">
            <PlayerInfoSection isOwner={isOwner} />
        </div>
      </header>


      <main className="container flex flex-col items-center flex-grow mx-auto px-4 py-2 relative z-0">

        {/* Players circle with improved container */}
        <div className="flex flex-col items-center w-full max-w-4xl relative h-[100vh] pt-20">
          <Board />
          <div className="relative mb-4" aria-label="Play">
            <StartButton isOwner={isOwner} roomId={roomId as string}/>
          </div>
        </div>

        <AnswerModal roomId={roomId as string} />
        {/* Leaderboard section */}
        <div className="w-full max-w-4xl transition-all mb-12">
          <LeaderboardChart />
        </div>
      </main>
    </div>
  );
}

export default Room;
