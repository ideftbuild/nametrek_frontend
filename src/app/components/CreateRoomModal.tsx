import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import RoomService from '../../services/RoomService';
import type { RoomModalProps } from './types';
import { useRouter } from 'next/navigation';
import { useRoom } from '../../contexts/RoomContext';
import useGameStore from '../../store/gameStore';

const roomService = new RoomService();

const CreateRoomModal = ({ isOpen, setIsOpen }: RoomModalProps ) => {
  const [playerName, setPlayerName] = useState("");
  const [rounds, setRounds] = useState(4);
  const router = useRouter();

  function generateInviteLink(roomId: string) {
    if (typeof window !== "undefined") {
      const hostname = window.location.origin;
      return `${hostname}/invite/${roomId}`
    }
  }
  async function handleCreate() {
    try {
      const roomPlayer = await roomService.createRoom({ playerName, rounds });
      const roomId = roomPlayer.roomId;

      // Save room code and link to localStorage
      localStorage.setItem('roomCode', roomPlayer.roomCode);
      localStorage.setItem('roomLink', generateInviteLink(roomId));
      useGameStore.setState({ currentPlayer: roomPlayer.player });

      router.push(`/rooms/${roomId}`);
    } catch (err) {
      alert("Failed to create room");
    }
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <Dialog.Panel className="rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-xl p-6 bg-black bg-opacity-50">
        <h3 className="text-xl font-thin text-white mb-6">Create a new room to start playing</h3>
        <div className="flex flex-col gap-y-8">
          <input 
            type="text"
            className="bg-white text-black font-light px-2"
            placeholder="Player Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <input
            type="text"
            className="bg-white text-black font-light px-2"
            placeholder="rounds"
            onChange={(e) => setRounds(+e.target.value)}
          />
        </div>
        <button onClick={handleCreate} className="mt-6 px-6 py-2 bg-blue-600 text-white w-full rounded-md hover:bg-blue-700 transition-colors">
          Create
        </button>
      </Dialog.Panel>
    </Dialog>
  );
}

export default CreateRoomModal;
