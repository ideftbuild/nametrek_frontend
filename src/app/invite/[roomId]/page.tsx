'use client';
import React, { useState, useEffect } from "react";
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useParams, useRouter } from 'next/navigation';
import useGameStore from '../../../store/gameStore';
import RoomService from '../../../services/RoomService';

const Invite = () => {
  const [playerName, setPlayerName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const router = useRouter();
  const params = useParams();
  const roomService = new RoomService();

  useEffect(() => {
    if (params?.roomId) {
      setIsLoading(false);
    }
  }, [params]);

  async function handleJoin() {
    if (!params?.roomId && !playerName.trim()) {
      return;
    }

    try {
      setJoining(true);
      const roomPlayer = await roomService.joinRoomById(params.roomId as string, { playerName });
      useGameStore.setState({ currentPlayer: roomPlayer.player });
      router.push(`/rooms/${roomPlayer.roomId}`);
    } catch (err) {
      alert("Failed to join room: " + err);
      router.push(`/`);
    } finally {
      setJoining(false);
    }
  }

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
    <div className="flex flex-col min-h-screen">
      <Header/>
      <div className="flex-grow flex items-center justify-center py-8">
        <main className="container flex-grow rounded-md max-w-md sm:max-w-lg lg:max-w-xl p-6 bg-black bg-opacity-50 mx-auto">
          <h3 className="text-xl font-semibold text-pink-400 mb-4">Join a new room to start playing</h3>
          <input
            type="text"
            value={playerName}
            placeholder="Player Name"
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full rounded-lg p-3 transition-all duration-300 focus:ring-2 focus:ring-pink-500 outline-none"
           />
          {joining ?
            <button onClick={handleJoin}
                    className="mt-6 px-6 py-2 bg-green-600 text-white w-full rounded-md hover:bg-green-700 transition-colors">
              Joining
            </button>
            :
            <button onClick={handleJoin}
                    className="mt-6 px-6 py-2 bg-green-600 text-white w-full rounded-md hover:bg-green-700 transition-colors">
              Join
            </button>
          }
        </main>
      </div>
      <Footer/>
    </div>
  );
}

export default Invite;
