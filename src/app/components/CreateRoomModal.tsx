import { Dialog } from '@headlessui/react';
import React, { useState } from 'react';
import RoomService from '../../services/RoomService';
import type { RoomModalProps } from './types';
import { useRouter } from 'next/navigation';
import useGameStore from '../../store/gameStore';
import { X } from 'lucide-react';

const roomService = new RoomService();

const CreateRoomModal = ({ open, setOpen, orbitron, audiowide }: RoomModalProps ) => {
  const [playerName, setPlayerName] = useState("");
  const [rounds, setRounds] = useState(4);
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  function generateInviteLink(roomId: string): string | undefined {
    if (typeof window !== "undefined") {
      const hostname = window.location.origin;
      return `${hostname}/invite/${roomId}`;
    }
    return undefined;
  }

  // Fix the type definition to accept string | undefined | null
  const isDefined = (value: string | undefined | null): value is string => {
    return value !== undefined && value !== null;
  };

  const setLocalStorageItem = (key: string, value: string | undefined | null) => {
    if (isDefined(value)) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  };

  async function handleCreate() {
    try {
      setCreating(true);
      const roomPlayer = await roomService.createRoom({ playerName, rounds });
      const roomId = roomPlayer.roomId;
      const roomCode = roomPlayer.roomCode;

      setLocalStorageItem('roomCode', roomCode);
      setLocalStorageItem('roomLink', generateInviteLink(roomId));

      useGameStore.setState({ currentPlayer: roomPlayer.player });
      router.push(`/rooms/${roomId}`);
    } catch (err) {
      alert("Failed to create room: " + err);
    } finally {
      setCreating(false);
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">

      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true"/>

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl transform rounded-xl bg-gray-900 shadow-xl p-6 transition-all">
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-pink-400 transition-colors"
            aria-label="Close rules"
          >
            <X size={20} />
          </button>
          <h3 className={`text-xl text-blue-300 mb-4 ${audiowide.className}`}>Create a new room to start playing</h3>
          <div className={`flex flex-col gap-y-8 ${orbitron.className}`}>
            <input
              type="text"
              placeholder="Player Name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full rounded-lg p-3 transition-all duration-300 focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <input
              type="text"
              placeholder="rounds"
              onChange={(e) => setRounds(+e.target.value)}
              className="w-full rounded-lg p-3 transition-all duration-300 focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>
          {creating ?
            <button onClick={handleCreate}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white w-full rounded-md hover:bg-blue-700 transition-colors">
              Creating
            </button>
            :
            <button onClick={handleCreate}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white w-full rounded-md hover:bg-blue-700 transition-colors">
              Create
            </button>
          }
        </Dialog.Panel>
      </div>
    </Dialog>
);
}

export default CreateRoomModal;
