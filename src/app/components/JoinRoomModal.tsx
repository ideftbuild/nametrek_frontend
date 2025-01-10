import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { RoomModalProps } from './types';
import RoomService from '../../services/RoomService';
import useGameStore from '../../store/gameStore';

const roomService = new RoomService();

const JoinRoomModal = ( { isOpen, setIsOpen }: RoomModalProps ) => {

  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();

  async function handleJoin() {
    try {
      const roomPlayer = await roomService.joinRoomByCode({ playerName, roomCode });
      useGameStore.setState({ currentPlayer: roomPlayer.player });

      router.push(`/rooms/${roomPlayer.roomId}`);
    } catch (err) {
      alert("Failed to create room");
    }
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <Dialog.Panel className="rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-xl p-6 bg-black bg-opacity-50">
        <h3 className="text-xl font-thin text-white mb-6">Join a new room to start playing</h3>
        <div className="flex flex-col gap-y-8">
          <input 
            type="text"
            className="bg-white text-black font-light px-2"
            value={playerName}
            placeholder="Player Name"
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <input
            type="text"
            className="bg-white text-black font-light px-2"
            value={roomCode}
            placeholder="Room Code"
            onChange={(e) => setRoomCode(e.target.value)}
          />
        </div>
        <button onClick={handleJoin} className="mt-6 px-6 py-2 bg-green-600 text-white w-full rounded-md hover:bg-green-700 transition-colors">
          Join
        </button>
      </Dialog.Panel>
    </Dialog>
  );
}

export default JoinRoomModal;
